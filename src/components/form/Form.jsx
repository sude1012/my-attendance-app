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
import SuccesMessage from "../alerts/SuccesMessgitage";
import Input from "../input/Input";
import Spinner from "../ui/spinner";
import { toast } from "react-toastify";
import { useAttendance } from "../../hooks/useAttendance";

function Form({ indraPersons = [] }) {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
  const [fullName, setFullName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [loading, setLoading] = useState({
    timeIn: false,
    timeOut: false,
  });
  // const [currentDate, setCurrentDate] = useState(new Date());
  const { currentDate } = useAttendance();

  // function buttons that handle time in and time out
  function handleTimeIn(e) {
    if (e) e.preventDefault();

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const dateString = currentDate.toLocaleDateString("en-CA"); // "2025-06-16"
    // console.log(`The ${fullName} Time In is ${currentTime}`);
    // console.log(`The ${fullName} Date ${currentDate}`);
    // Check if fullName is empty
    if (!fullName) {
      // Show error message if fullName is empty
      // console.log("No full name selected");
      // Set error state to show the error message
      setShowError(true);
      setErrorMessage("Hey! Please select a name.");
      setErrorCode(null);
      setTimeout(() => setShowError(false), 2000);
      return;
    } else {
      setLoading(true); // Set loading state to true when starting the operation
      const indra_number = indraPersons.find(
        (item) => item.full_name === fullName
      )?.indra_number;
      const addTimekeep = {
        indra_number,
        shift_id: 1,
        time_in: currentTime,
        time_out: null,
        date: dateString, // Use the formatted date string
        status: "On-Site",
      };
      console.log("Adding timekeeping data:", addTimekeep); //Debugging log
      // Here you would typically send the timekeeping data to your backend
      // Send the timekeeping data to the backend
      setLoading((prev) => ({ ...prev, timeIn: true })); // Set loading state to true when starting the operation
      fetch(`${API_BASE}/add-timekeeping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addTimekeep),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw data; // throw the actual object, not new Error
          }
          return data;
        })
        .then((data) => {
          console.log("Timekeeping data added successfully:", data);
          setShowSuccess(true);
          setSuccessMessage(
            `Hey! ${fullName}, you have successfully timed in at ${currentTime}.`
          );

          toast.success(
            `User ${fullName} with Indra No. ${indra_number} successfully timed in at ${currentTime}`
          );
          setFullName(""); // Clear the fullName after successful time in
          setTimeout(() => setShowSuccess(false), 1000);
        })
        .catch((err) => {
          // err is now the object sent from backend
          console.log("Error object in catch:", err);
          let msg =
            err.error ||
            err.message ||
            "An error occurred while adding timekeeping data.";
          let code = err.code || null;
          setErrorMessage(msg);
          setErrorCode(code);
          setShowError(true);
          setTimeout(() => setShowError(false), 2000);
        })
        .finally(() => {
          setLoading((prev) => ({ ...prev, timeIn: false })); // Reset loading state after the operation
          // setTimeout(() => setLoading(false), 1000); // for Demo purposes, reset loading state after 1 second
          console.log("Loading state reset after timekeeping operation.");
        });
    }
  }
  async function handleTimeOut(e) {
    if (e) e.preventDefault();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const dateString = currentDate.toLocaleDateString("en-CA"); // <-- Add this line;
    console.log(`The ${fullName}! today is ${dateString}`);

    if (!fullName) {
      setShowError(true);
      setErrorMessage("Hey! Please select a name.");
      setTimeout(() => setShowError(false), 2000);
      return;
    }

    const indra_number = indraPersons.find(
      (item) => item.full_name === fullName
    )?.indra_number;

    try {
      // Fetch latest time log for this user and date
      const res = await fetch(
        `${API_BASE}/latest-timein?indra_number=${indra_number}&date=${dateString}`
      );
      const { time_in, time_out } = await res.json();
      if (!dateString) {
        console.log("No current date selected");
        setShowError(true);
        setErrorMessage("Please select a valid date.");
        setTimeout(() => setShowError(false), 2000);
        return;
      }

      // Validation: Check if user has not timed in yet
      if (!time_in) {
        setShowError(true);
        setErrorMessage("Alright! Let's go to work! Please timein!");
        setTimeout(() => setShowError(false), 2000);
        return;
      }
      // Validation: Check if user has already timed out
      if (time_out) {
        setShowError(true);
        setErrorMessage("Let's go home! You have already timed out!");
        setTimeout(() => setShowError(false), 2000);
        return;
      }
      setLoading((prev) => ({ ...prev, timeOut: true }));
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
      const updateData = await updateRes.text();
      if (!updateRes.ok) throw updateData;

      setShowSuccess(true);
      setSuccessMessage(`Hey! ${fullName}, you have successfully timed out.`);
      toast.success(
        `User ${fullName} with Indra No. ${indra_number} successfully timed out at ${currentTime}`
      );
      setFullName("");

      setTimeout(() => setShowSuccess(false), 2000);
    } catch (err) {
      console.log("Error object in catch:", err);
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
      setLoading((prev) => ({ ...prev, timeOut: false })); // Reset loading state after the operation
      // setTimeout(() => setLoading(false), 1000); // for Demo purposes, reset loading state after 1 second
      console.log("Loading state reset after timekeeping operation.");
    }
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <form className="flex flex-col justify-center items-center">
        {showSuccess && (
          <SuccesMessage message={showSuccess}>
            {successMessage || "Successfully Timed In/Out"}
          </SuccesMessage>
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
            onClick={handleTimeIn}
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

          <PrimaryButton onClick={handleTimeOut}>
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
