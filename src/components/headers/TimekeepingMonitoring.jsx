import Pagination from "../pagination/Pagination";
import { useAttendance } from "../../hooks/useAttendance";
import { useEffect, useState } from "react";
import deleteIcon from "../logo and images/delete-2-svgrepo-com.svg";
import editIcon from "../logo and images/edit-3-svgrepo-com.svg"; // Import edit icon if needed
function TimekeepingMonitoring() {
  const { indraTimelogs } = useAttendance();
  const [timeLogs, setTimeLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Sync local state with context when context changes
  useEffect(() => {
    setTimeLogs(indraTimelogs);
  }, [indraTimelogs]); // Update timeLogs whenever indraTimelogs changes

  //  Always use the full array for totalPages!
  const totalPages = Math.ceil(timeLogs.length / itemsPerPage);

  //  Slice the full array for the current page
  const paginatedLogs = timeLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      const res = await fetch(
        `http://localhost:5050/api/timelogs?time_keeping_id=${id}`,
        { method: "DELETE" }
      );
      if (!res.ok) {
        // Try to parse error from server
        let errorMsg = "Failed to delete record.";
        try {
          const errorData = await res.json();
          errorMsg = errorData.error || errorMsg;
        } catch {
          // If response is not JSON, keep default errorMsg
        }
        throw new Error(errorMsg);
      }
      // Remove the deleted log from local state
      setTimeLogs((prevLogs) =>
        prevLogs.filter((log) => log.time_keeping_id !== id)
      );
    } catch (err) {
      alert(`Error deleting record: ${err.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-3 gap-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Indra No.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Shift
              </th>
              <th scope="col" className="px-6 py-3">
                Time-In
              </th>
              <th scope="col" className="px-6 py-3">
                Time-Out
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <tr
                  key={log.time_keeping_id}
                  className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75"
                >
                  <td className="h-12 flex items-center justify-center px-10">
                    <label className="flex items-center justify-center w-full h-full">
                      <input
                        type="checkbox"
                        name="myCheckbox"
                        className=" form-checkbox h-4 w-4 text-[#004254] focus:ring-[#004254] border-gray-300 rounded"
                        value={log.time_keeping_id}
                      />
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    {log.date
                      ? new Date(log.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </td>
                  <td key={log.itm} className="px-6 py-4">
                    {log.indra_number}
                  </td>
                  <td className="px-6 py-4">{log.full_name}</td>
                  <td className="px-6 py-4">{log.shift_name}</td>
                  <td className="px-6 py-4">{log.time_in}</td>
                  <td className="px-6 py-4">{log.time_out}</td>
                  <td className="px-6 py-4">{log.status}</td>

                  <td className="">
                    {" "}
                    <button
                      onClick={() => handleDelete(log.time_keeping_id)}
                      className="px-2 py-2 cursor-pointer m-2 hover:bg-[#1976D2] hover:text-[#E3E2DA] transition duration-300"
                    >
                      <img
                        src={editIcon}
                        alt="Edit"
                        className="w-5 h-5 inline"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(log.time_keeping_id)}
                      className="px-2 py-2 cursor-pointer m-2 hover:bg-red-600 hover:text-[#E3E2DA] transition duration-300"
                    >
                      <img
                        src={deleteIcon}
                        alt="Delete"
                        className="w-5 h-5 inline"
                      />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75">
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <a href="http://localhost:5050/api/timelogs/excel">
        {" "}
        <button className="cursor-pointer border-2 p-2 rounded-sm  bg-[#004254] border-[#004254] text-[#E3E2DA]">
          Generate the Attendance
        </button>
      </a>
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default TimekeepingMonitoring;
