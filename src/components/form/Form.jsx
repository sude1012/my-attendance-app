import { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import Error from "../alerts/ErrorMessage";
import SuccesMessage from "../alerts/SuccesMessage";
import Input from "../input/Input";
import { toast } from "react-toastify";

function Form({ indraPersons = [] }) {
  const [fullName, setFullName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorCode, setErrorCode] = useState(null);

  function handleTimeIn(e) {
    if (e) e.preventDefault();

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const currentDate = new Date().toISOString().slice(0, 10);
    console.log(`The ${fullName} Time In is ${currentTime} on ${currentDate}`);
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
      const indra_number = indraPersons.find(
        (item) => item.full_name === fullName
      )?.indra_number;
      const addTimekeep = {
        indra_number,
        shift_id: 1,
        time_in: currentTime,
        time_out: null,
        date: currentDate,
        status: "On-Site",
      };
      console.log("Adding timekeeping data:", addTimekeep); //Debugging log
      // Here you would typically send the timekeeping data to your backend
      // Send the timekeeping data to the backend
      fetch("http://localhost:5050/add-timekeeping", {
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
          setTimeout(() => setShowSuccess(false), 2000);
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
    const currentDate = new Date().toISOString().slice(0, 10);

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
        `http://localhost:5050/latest-timein?indra_number=${indra_number}&date=${currentDate}`
      );
      const { time_in, time_out } = await res.json();

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

      // Update time_out in the backend
      const updateRes = await fetch("http://localhost:5050/update-timeout", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          indra_number,
          date: currentDate,
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
    }
  }

  return (
    <div className="flex flex-row justify-center items-center">
      <form className="flex flex-col justify-center items-center">
        {showSuccess && (
          <Success message={showSuccess}>
            {successMessage || "Successfully Timed In/Out"}
          </Success>
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
          <PrimaryButton onClick={handleTimeIn}>Time-In</PrimaryButton>
          <PrimaryButton onClick={handleTimeOut}>Time-Out</PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default Form;
