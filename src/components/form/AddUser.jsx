import { useState } from "react";
import InOutButton from "../buttons/PrimaryButton";
import { toast } from "react-toastify";
import { useAttendance } from "../../hooks/useAttendance";

function AddUser() {
  const { officeIndra, indraTeam, indraShift } = useAttendance();
  // const [newUser, setNewUser] = useState(officeIndra);
  const [fullName, setFullName] = useState("");
  const [indraNo, setIndraNo] = useState("");
  const [role, setRole] = useState("");
  const [office, setOffice] = useState("");
  const [shift, setShift] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    toast.success(
      `User ${fullName} with Indra No. ${indraNo} has been added successfully!`
    );

    const newUser = {
      indra_number: indraNo, // The unique ID for the user (from your input field)
      full_name: fullName, // The user's full name (from your input field)
      office_number: office, // The selected office's ID (foreign key from the offices table)
      team_number: role, // The selected team's ID (foreign key from the teams table)
      shift_id: shift, // The selected shift's ID (foreign key from the shifts table)
    };

    // console.log("Office:", officeIndra);
    // console.log("Shift:", indraShift);
    // console.log("Team:", indraTeam);
    // console.log("Added User:", newUser);

    console.log("Sending newUser:", newUser);

    fetch("http://localhost:5050/add-user", {
      // Ensure the port and URL match your server's settings
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
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
          `User ${data.full_name} with Indra No. ${data.indra_number} has been added successfully!`
        );
      })
      .catch((err) => console.error("Error adding user:", err));

    setFullName("");
    setIndraNo("");
    setOffice("");
    setRole("");
    setShift("");
  }

  function handleReset() {
    setFullName("");
    setIndraNo("");
    setOffice("");
    setRole("");
    setShift("");
  }
  return (
    <form className="max-w-sm mx-auto" onSubmit={() => handleSubmit()}>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Indra. No.
        </label>
        <input
          type="number"
          id="base-input"
          value={indraNo}
          onChange={(e) => setIndraNo(e.target.value)}
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Indra No."
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="base-input"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Firstname, Lastname, MI"
        />
      </div>{" "}
      <div className="mb-3">
        <label
          htmlFor="Role"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Role:
        </label>
        <select
          id="Role"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={role}
          onChange={(e) => setRole(e.target.value)} // Placeholder for handling role selection
          required
        >
          <option value="">Select Role</option>
          {indraTeam?.map((team) => (
            <option key={team.team_number} value={team.team_number}>
              {team.team_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="Assigned Office"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Assigned Office:
        </label>
        <select
          id="Assigned Office"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={office}
          onChange={(e) => setOffice(e.target.value)} // Placeholder for handling office selection
        >
          <option>Select Office:</option>
          {officeIndra?.map((office) => (
            <option key={office.office_number} value={office.office_number}>
              {office.office_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label
          htmlFor="Select Shift"
          className="block mb-2 text-sm font-bold text-[#004254] dark:text-[#004254]"
        >
          Shift
        </label>
        <select
          id="Select Shift"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={shift}
          onChange={(e) => setShift(e.target.value)} // Placeholder for handling shift selection
          required
        >
          <option>Select Shift</option>
          {indraShift?.map((shift) => (
            <option key={shift.shift_id} value={shift.shift_id}>
              {shift.shift_name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row justify-center items-center gap-2">
        <InOutButton onClick={handleSubmit}>Sumbit</InOutButton>
        <InOutButton onClick={handleReset}>Reset</InOutButton>
      </div>
    </form>
  );
}

export default AddUser;
