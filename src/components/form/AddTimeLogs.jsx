import { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { toast } from "react-toastify";
import { useAttendance } from "../../hooks/useAttendance";

function AddTimelogs() {
  const { indraPersons } = useAttendance();
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";
  const [additionTimelogs, setAdditionTimelogs] = useState({
    indra_number: "",
    timeIn: "",
    timeOut: "",
    date: "",
    status: 1,
  });

  const selectedIndraNumber = indraPersons?.find(
    (person) => person.indra_number === additionTimelogs.indra_number
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setAdditionTimelogs((prev) => ({
      ...prev,
      [name]: name === "indra_number" ? Number(value) : value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    function addSeconds(time) {
      if (!time) return "";
      // If already has seconds, return as is
      if (time.length === 8) return time;
      return `${time}:00`;
    }

    // Usage:
    const officialTimeIn = addSeconds(additionTimelogs.timeIn);
    console.log(officialTimeIn); // "06:12:00"
    const officialTimeOut = addSeconds(additionTimelogs.timeOut);
    console.log(officialTimeOut); // "06:12:00"

    const newTimelog = {
      indra_number: additionTimelogs.indra_number,
      shift_id: 1,
      time_in: officialTimeIn,
      time_out: officialTimeOut,
      date: new Date().toLocaleDateString("en-CA"), // Current date in YYYY-MM-DD format
      status: additionTimelogs.status, // Assuming a default status, you
    };

    fetch(`${API_BASE}/api/manual-timelogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTimelog),
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Timelog added:", data);
        toast.success(
          `Timelog for ${data.full_name} with Indra No. ${data.indra_number} has been added successfully!`
        );
      })
      .catch((err) => console.error("Error adding timelog:", err));
    setAdditionTimelogs("");
  }

  return (
    <form className="max-w-sm mx-auto" onSubmit={() => handleSubmit()}>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Date
        </label>
        <input
          name="date"
          id="date"
          value={additionTimelogs.date || ""}
          type="date"
          onChange={handleChange}
          placeholder="Time In"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Indra. No.
        </label>
        <select
          name="indra_number"
          id="indra_number"
          value={additionTimelogs.indra_number}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="Select your Indra Number">
            Select your Indra Number
          </option>
          {indraPersons?.map((person) => (
            <option key={person.indra_number} value={person.indra_number}>
              {person.indra_number}
            </option>
          ))}
        </select>
      </div>{" "}
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Full Name
        </label>
        <input
          name="full_name"
          id="full_name"
          value={
            selectedIndraNumber ? selectedIndraNumber.full_name : "Full Name"
          }
          readOnly
          placeholder="Full Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>{" "}
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Shift Name
        </label>
        <input
          name="shift_name"
          id="shift_name"
          value={
            selectedIndraNumber ? selectedIndraNumber.shift_name : "Shift Name"
          }
          readOnly
          placeholder="Full Name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Time In
        </label>
        <input
          name="timeIn"
          id="timeIn"
          value={additionTimelogs.timeIn || ""}
          type="time"
          onChange={handleChange}
          placeholder="Time In"
          required // Make sure to add the required attribute if you want to enforce this field
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Time Out
        </label>
        <input
          name="timeOut"
          id="timeOut"
          value={additionTimelogs.timeOut || ""} // ✅ Valid! (should be "09:30" or similar)
          type="time"
          onChange={handleChange}
          placeholder="Time Out"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>{" "}
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Status
        </label>
        <select
          name="status"
          id="status"
          value={additionTimelogs.status}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Status"
        >
          <option value="Select">Select Status</option>
          <option value="On-Site">On-Site</option>
          <option value="Leave">Leave</option>
          <option value="Halfday - AM">Halfday - AM</option>
          <option value="Halfday - PM">Halfday - PM</option>
        </select>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <PrimaryButton onClick={handleSubmit}>Sumbit</PrimaryButton>
        {/* <PrimaryButton onClick={handleReset}>Reset</PrimaryButton> */}
      </div>
    </form>
  );
}

export default AddTimelogs;
