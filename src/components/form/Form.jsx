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

import { useState, useCallback } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Error from "../alerts/ErrorMessage";
import Confirmation from "../alerts/Confirmation";
import SuccessMessage from "../alerts/SuccessMessage";
import Input from "../input/Input";
import Spinner from "../ui/spinner";
import { useAttendance } from "../../hooks/useAttendance"; // Assuming this hook provides indraPersons

function Form({ indraPersons = [] }) {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
  const { currentDate } = useAttendance(); // Assuming this hook provides currentDate
  const [fullName, setFullName] = useState("");
  const [indraNumber, setIndraNumber] = useState("");
  const [currentTime, setCurrentTime] = useState("");
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

  const showSuccessMsg = useCallback((msg, timeout = 2000) => {
    setShowSuccess(true);
    setSuccessMessage(msg);
    setTimeout(() => setShowSuccess(false), timeout);
  }, []);

  // Function to show error messages with optional code and timeout
  const showErrorMsg = useCallback((msg, code = null, timeout = 2000) => {
    setShowError(true);
    setErrorMessage(msg);
    setErrorCode(code);
    setTimeout(() => setShowError(false), timeout);
  }, []);

  function handleTimeInClick() {
    if (!fullName) {
      showErrorMsg("Hey! Please select a name.", 404);
      return;
    }

    const timeNow = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const indra_number = indraPersons.find(
      (item) => item.full_name === fullName
    )?.indra_number;
    setIndraNumber(indra_number);
    setCurrentTime(timeNow);

    setShowConfirm(true);

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

  const handleTimeIn = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const dateString = currentDate.toLocaleDateString("en-CA");
      if (!fullName) {
        let msg = "Hey! Please select a name.";
        showErrorMsg(msg, 404);
        return;
      }
      setLoading((prev) => ({ ...prev, timeIn: true }));

      const indra_number = indraPersons.find(
        (item) => item.full_name === fullName
      )?.indra_number;

      try {
        const res = await fetch(
          `http://localhost:5050/latest-timein?indra_number=${indra_number}&date=${dateString}`
        );
        const { time_in } = await res.json(); // Read once!

        if (time_in) {
          let msg = `Hey! ${fullName}, you have already timed in at ${time_in}.`;
          showErrorMsg(msg, 400);
          return;
        }
        const addTimekeepingData = {
          indra_number,
          date: dateString,
          shift_id: 1,
          time_in: currentTime,
          time_out: null,
          status: "Half Day", // Assuming default status is Half-Day
        };
        console.log("Sending to backend:", addTimekeepingData);
        // If the user has not timed
        const updateRes = await fetch("http://localhost:5050/add-timekeeping", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(addTimekeepingData),
        });

        const updateData = await updateRes.json(); // Always parse as JSON
        console.log("Update response:", updateData);
        if (!updateRes.ok) {
          throw { message: updateData.error, code: updateData.code };
        }
        showSuccessMsg(
          `Hey! ${fullName}, you have successfully timed In at ${currentTime}.`
        );
        setFullName("");
      } catch (err) {
        console.log("Error occurred:", err);
        let msg =
          err.error ||
          err.message ||
          "An error occurred while adding timekeeping data.";
        let code = err.code || null;
        showErrorMsg(msg, code, 1000);
      } finally {
        setLoading((prev) => ({ ...prev, timeIn: false }));
      }
    },
    [
      fullName,
      indraPersons,
      showErrorMsg,
      showSuccessMsg,
      setLoading,
      setFullName,
      currentDate,
    ]
  );

  const handleTimeOut = useCallback(
    async (e) => {
      if (e) e.preventDefault();
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const dateString = currentDate.toLocaleDateString("en-CA"); // <-- Add this line;
      console.log(`The ${fullName}! today is ${dateString}`);

      if (!fullName) {
        let msg = "Hey! Please select a name.";
        showErrorMsg(msg, 404);
        return;
      }
      setLoading((prev) => ({ ...prev, timeOut: true }));
      const indra_number = indraPersons.find(
        (item) => item.full_name === fullName
      )?.indra_number;

      try {
        // Fetch latest time log for this user and date
        const res = await fetch(
          `http://localhost:5050/latest-timein?indra_number=${indra_number}&date=${dateString}`
        );
        const { time_in, time_out } = await res.json();
        if (!dateString) {
          let msg = "Please select a valid date.";
          showErrorMsg(msg);
          return;
        }
        // Validation: Check if user has not timed in yet
        if (!time_in) {
          let msg = "Alright! Please time In and let's go to work!";
          showErrorMsg(msg);
          return;
        }
        // Validation: Check if user has already timed out
        if (time_out) {
          let msg = "Let's go home! You have already timed out!";
          showErrorMsg(msg);
          return;
        }
        // Update time_out in the backend
        const updateRes = await fetch("http://localhost:5050/update-timeout", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            indra_number,
            date: dateString,
            time_in,
            time_out: currentTime,
            status: "On-Site",
          }),
        });
        console.log("Update response:", updateRes);

        const updateData = await updateRes.json();
        if (!updateRes.ok) {
          throw { message: updateData.error, code: updateData.code };
        }

        showSuccessMsg(
          `Hey! ${fullName}, you have successfully timed out at ${currentTime}.`
        );
        setFullName("");

        // setTimeout(() => setShowSuccess(false), 2000);
      } catch (err) {
        let msg =
          err.error ||
          err.message ||
          "An error occurred while adding timekeeping data.";
        let code = err.code || null;
        showErrorMsg(msg, code, 1000);
      } finally {
        setLoading((prev) => ({ ...prev, timeOut: false }));
      }
    },
    [
      fullName,
      indraPersons,
      currentDate,
      showErrorMsg,
      showSuccessMsg,
      setLoading,
      setFullName,
    ]
  );

  return (
    <div className=" flex flex-row justify-center items-center">
      {(loading.timeIn || loading.timeOut) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E3E2DA]/75">
          <Spinner />
        </div>
      )}

      {showConfirm && (
        <Confirmation
          fullName={fullName}
          onConfirm={handleConfirmTimeIn}
          onCancel={handleCanceltimeIn}
          indraNumber={indraNumber}
          currentDate={currentDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
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
        <div className=" flex flex-row gap-2 ml-2">
          <PrimaryButton
            type="button" // <-- Add this line!
            onClick={handleTimeInClick}
            className="flex flex-col items-center gap-2"
            disabled={loading.timeIn || loading.timeOut}
          >
            {" "}
            <span>Time-In</span>{" "}
          </PrimaryButton>

          <PrimaryButton
            onClick={handleTimeOut}
            type="button"
            disabled={loading.timeIn || loading.timeOut}
          >
            <span>Time-Out</span>{" "}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default Form;
