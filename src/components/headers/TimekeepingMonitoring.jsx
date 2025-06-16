// import { sampleTimeLogs } from "../../utils/sampleIndraData";
import Pagination from "../pagination/Pagination";
import { useState } from "react";
function TimekeepingMonitoring({ indraTimelogs }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ✅ Always use the full array for totalPages!
  const totalPages = Math.ceil(indraTimelogs.length / itemsPerPage);

  // ✅ Slice the full array for the current page
  const paginatedLogs = indraTimelogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-3 gap-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
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
              {/* <th scope="col" className="px-6 py-3">
                Late
              </th> */}
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedLogs.length > 0 ? (
              paginatedLogs.map((log) => (
                <tr className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75">
                  <td className="px-6 py-4">
                    {log.date
                      ? new Date(log.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </td>
                  <td className="px-6 py-4">{log.indra_number}</td>
                  <td className="px-6 py-4">{log.full_name}</td>
                  <td className="px-6 py-4">{log.shift_name}</td>
                  <td className="px-6 py-4">{log.time_in}</td>
                  <td className="px-6 py-4">{log.time_out}</td>
                  <td className="px-6 py-4">{log.status}</td>
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
