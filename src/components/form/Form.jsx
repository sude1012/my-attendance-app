/**
 * Form.jsx
 * -----------
 * This component handles the main timekeeping form for users to log their time in and time out.
 * It manages form state, handles API requests for timekeeping actions, and provides user feedback (loading, errors, etc.).
 *
 * Features:
 * - Time In and Time Out functionality
 * - Loading spinner during API calls
 * - Error and success message handling
 * - Can be reused or extended for other timekeeping-related forms
 *
 * Usage:
 * Import and render <Form /> where you want to display the timekeeping form.
 */

import { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Error from "../alerts/ErrorMessage";
import Confirmation from "../alerts/Confirmation";
import SuccessMessage from "../alerts/SuccessMessage";
import Input from "../input/Input";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";

function Form({ indraPersons = [] }) {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
  const [fullName, setFullName] = useState("");
  const [indraNumber, setIndraNumber] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState({
    currentDate: "",
    currentTime: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState({
    timeIn: false,
    timeOut: false,
  });

  function handleTimeInClick() {
    if (!fullName) {
      setShowError(true);
      setErrorMessage("Hey! Please select a name.");
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const dateNow = (currentDateTime.currentTime = new Date());

    setCurrentDateTime((prev) => ({
      ...prev,
      currentDate: dateNow.toLocaleDateString("en-CA"),
    }));

    const indra_number = indraPersons.find(
      (item) => item.full_name === fullName
    )?.indra_number;
    setIndraNumber(indra_number);
    setCurrentTime(timeNow);
    setShowConfirm(true);
    return;
    // This function is called when the Time-In button is clicked
  }
  function handleConfirmTimeIn() {
    setShowConfirm(false);
    handleTimeIn(); // Your actual time-in logic
  }

  function handleCanceltimeIn() {
    setShowConfirm(false);
  }

  // function buttons that handle time in and time out
  function handleTimeIn(e) {
    if (e) e.preventDefault();

    if (!fullName) {
      setShowError(true);
      setErrorMessage("Hey! Please select a name.");
      setErrorCode(null);
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    setLoading((prev) => ({ ...prev, timeIn: true }));

    const addTimekeep = {
      indra_number: indraNumber,
      shift_id: 1,
      time_in: currentTime,
      time_out: null,
      date: currentDateTime.currentDate,
      status: "On-Site",
    };

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/add-timekeeping`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addTimekeep),
        });
        const data = await res.json();
        if (!res.ok) throw data;

        setShowSuccess(true);
        setSuccessMessage(
          `Hey! ${fullName}, you have successfully timed in at ${currentTime}.`
        );
        toast.success(
          `User ${fullName} with Indra No. ${indraNumber} successfully timed in at ${currentTime}`
        );
        setFullName("");
        setTimeout(() => setShowSuccess(false), 1000);
      } catch (err) {
        let msg =
          err.error ||
          err.message ||
          "An error occurred while adding timekeeping data.";
        let code = err.code || null;
        setErrorMessage(msg);
        setErrorCode(code);
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      } finally {
        setLoading((prev) => ({ ...prev, timeIn: false }));
        console.log("Loading state reset after timekeeping operation.");
      }
    })();
  }
  async function handleTimeOut(e) {
    if (e) e.preventDefault();

    console.log(`Hi! ${fullName}! today is ${currentDateTime.currentDate}`);

    const indra_number = indraPersons.find(
      (item) => item.full_name === fullName
    )?.indra_number;

    try {
      // Fetch latest time log for this user and date
      const res = await fetch(
        `${API_BASE}/latest-timein?indra_number=${indra_number}`
      );
      const { time_in, time_out, date } = await res.json();
      if (!currentDateTime.currentDate) {
        setShowError(true);
        setErrorMessage("Please select a valid date.");
        setTimeout(() => setShowError(false), 2000);
        return;
      }
      if (!time_in) {
        setShowError(true);
        setErrorMessage("Alright! Let's go to work! Please timein!");
        setTimeout(() => setShowError(false), 2000);
        return;
      }
      if (time_out) {
        setShowError(true);
        setErrorMessage("Let's go home! You have already timed out!");
        setTimeout(() => setShowError(false), 2000);
        return;
      }
      setLoading((prev) => ({ ...prev, timeOut: true }));

      // Get current time for time_out
      const timeNow = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // Update time_out in the backend
      const updateRes = await fetch(`${API_BASE}/update-timeout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          indra_number,
          date,
          time_in,
          time_out: timeNow,
          status: "On-Site",
        }),
      });
      const updateData = await updateRes.text();
      if (!updateRes.ok) throw updateData;

      setShowSuccess(true);
      setSuccessMessage(`Hey! ${fullName}, you have successfully timed out.`);
      toast.success(
        `User ${fullName} with Indra No. ${indra_number} successfully timed out at ${timeNow}`
      );
      setFullName("");
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      let msg =
        err.error ||
        err.message ||
        "An error occurred while adding timekeeping data.";
      let code = err.code || null;
      setErrorMessage(msg);
      setErrorCode(code);
      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    } finally {
      setLoading((prev) => ({ ...prev, timeOut: false }));
      console.log("Loading state reset after timekeeping operation.");
    }
  }

  return (
    <div className="flex flex-row justify-center items-center">
      {" "}
      {showConfirm && (
        <Confirmation
          fullName={fullName}
          onConfirm={handleConfirmTimeIn}
          onCancel={handleCanceltimeIn}
          indraNumber={indraNumber}
          currentDate={currentDateTime.currentDate}
          currentTime={currentTime}
        />
      )}
      <form className="relative flex flex-col justify-center items-center">
        {showSuccess && (
          <SuccessMessage message={showSuccess}>
            {successMessage || "Successfully Timed In/Out"}
          </SuccessMessage>
        )}
        {showError && (
          <Error>
            {errorCode && (
              <span>
                Error Code: {errorCode} <br />
              </span>
            )}
            {errorMessage || "Already Time In"}
          </Error>
        )}
        <div className="flex flex-row justify-center items-center">
          <Input
            fullName={fullName}
            setFullName={setFullName}
            indraPersons={indraPersons}
          />
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <PrimaryButton
            type="button" // <-- Add this line!
            onClick={handleTimeInClick}
            className="flex flex-col items-center gap-2"
          >
            {" "}
            <span>Time-In</span>{" "}
            {loading.timeIn && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/60 rounded-[0.75rem]">
                <Spinner />
              </div>
            )}
          </PrimaryButton>

          <PrimaryButton onClick={handleTimeOut} type="button">
            <span>Time-Out</span>{" "}
            {loading.timeOut && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/60 rounded-[0.75rem]">
                <Spinner />
              </div>
            )}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default Form;
