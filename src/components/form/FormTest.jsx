import { useState, useEffect } from "react";
import InOutButton from "../buttons/PrimaryButton";
import Success from "../alerts/success";
import Error from "../alerts/ErrorMessage";
import { toast } from "react-toastify";

function FormTest({ officeIndra = [], indraPersons = [] }) {
  const [fullName, setFullName] = useState("");
  const [timeIn, setTimeIn] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );
  const [timeOut, setTimeOut] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tempUser, setTempUser] = useState(indraPersons);
  const [isLeave, setIsLeave] = useState(false);
  const [status, setStatus] = useState("");

  function handleChange() {
    setIsLeave(event.target.value === "Leave");
  }
  useEffect(() => {
    console.log("Updated TempUser logs:", tempUser);
  }, [tempUser]);

  function handleTimeIn(e) {
    console.log(officeIndra);
    if (e) e.preventDefault();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (!fullName) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    } else {
      const tempTimeLog = {
        indra_number: indraPersons.find((item) => item.full_name === fullName)
          .indra_number,
        shift_id: 1,
        time_in: currentTime,
        time_out: null,
        date: currentDate, // "2025-05-30"
        status: "On-Site",
      };
      fetch("http://localhost:5050/add-timekeeping", {
        // Ensure the port and URL match your server's settings
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tempTimeLog),
      })
        .then(async (res) => {
          if (!res.ok) {
            // If response is not ok, it may help to read the text response
            const text = await res.text();
            throw new Error(text);
          }
          return res.json();
        })
        .then((data) => {
          console.log("User added:", data);
          toast.success(
            `User ${data.full_name} with Indra No. ${data.indra_number} successfully time In ${data.time_in}`
          );
        })
        .catch((err) => console.error("Error adding user:", err));
      console.log("THIS IS THE LOGS: ", tempTimeLog);
      setTempUser((prevLogs) => [...prevLogs, tempTimeLog]);
      setTimeIn(currentTime);
      setTimeOut(null);
      console.log("Time In Log:", tempTimeLog);
      console.log(tempUser);

      console.log(
        `The ${fullName} Current Date and Time is ${currentDate}, ${currentTime}`
      );
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1000);
  }

  function handleTimeOut(e) {
    if (e) e.preventDefault();
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    console.log(`The ${fullName} Time Out is ${currentDate}, ${currentTime}`);
    if (!fullName || !timeIn || !currentDate) {
      // console.log(`The ${fullName} Time Out is ${currentDate}, ${currentTime}`);
      setShowError(true);
      setInterval(() => setShowError(false), 1000);
      return;
    }
    const indra_number = indraPersons.find(
      (item) => item.full_name === fullName
    )?.indra_number;
    // Update time_out in the backend
    fetch("http://localhost:5050/update-timeout", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        indra_number,
        date: currentDate,
        time_out: currentTime,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then(() => {
        setTimeOut(currentTime);
        setTempUser((prevLogs) =>
          prevLogs.map((log) =>
            log.indra_number === indra_number && log.time_out === null
              ? { ...log, time_out: currentTime }
              : log
          )
        );
        toast.success(
          `User ${fullName} with Indra No. ${indra_number} successfully timed out at ${currentTime}`
        );
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
      })
      .catch((err) => {
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
        console.error("Error updating time-out:", err);
      });
  }
  function handleStatus(e) {
    if (e) e.preventDefault();
    console.log("you've selected", status);
  }

  return (
    <div className="flex flex-row justify-center items-center m-2 2xl:m-10">
      <form className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center md:mb-2">
          <label className="text-3xl font-medium text-[#004254]">
            Business Analyst Name:
          </label>
          <select
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border-2 border-[#004254] ring-[#004254] rounded-lg m-1 px-5 py-2 flex flex-row justify-center items-center text-lg font-medium text-[#004254] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004254] transition duration-200 ease-in-out"
          >
            <option value="">Select Name</option>
            {indraPersons.map((item) => (
              <option key={item.indra_number} value={item.full_name}>
                {item.full_name}
              </option>
            ))}
          </select>
        </div>
        <form className="flex flex-row gap-2 items-center">
          <label className="text-3xl font-medium text-[#004254]">Shift</label>
          <select
            onChange={handleChange}
            className="border-2 border-[#004254] ring-[#004254] rounded-lg m-1 px-5 py-2 flex flex-row justify-center items-center text-lg font-medium text-[#004254] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004254] transition duration-200 ease-in-out"
          >
            <option value="On-Site">On-Site</option>
            <option value="Leave">Leave</option>
          </select>

          {isLeave && (
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border-2 border-[#004254] ring-[#004254] rounded-lg m-1 px-5 py-2 flex flex-row justify-center items-center text-lg font-medium text-[#004254] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004254] transition duration-200 ease-in-out"
            >
              <option value="">Select Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Personal Leave">Personal Leave</option>
            </select>
          )}
          <button onClick={handleStatus} className="border-2 p-2">
            SELECT
          </button>
        </form>
        <div className="flex flex-row gap-2 ml-2">
          <InOutButton onClick={handleTimeIn}>Time-In</InOutButton>
          <InOutButton onClick={handleTimeOut}>Time-Out</InOutButton>
        </div>
        <div className="flex flex-row gap-2 ml-2">
          <span className="text-lg text-[#E3E2DA]">Time-In: {timeIn}</span>
          <span className="text-lg text-[#E3E2DA]">Time-Out: {timeOut}</span>
        </div>
        {showSuccess && (
          <Success
            message={showSuccess}
          >{`You have successfully time in ${fullName}`}</Success>
        )}
        {showError && <Error message="Please Time-In." />}
      </form>
    </div>
  );
}

export default FormTest;
