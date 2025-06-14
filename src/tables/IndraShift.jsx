// import { sampleIndraData } from "../utils/sampleIndraData";
import Pagination from "../components/pagination/Pagination";
//                   </a>
function IndraShift({ indraShift }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Shift Id
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Shift Name
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                Start Time
              </th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">
                End Time
              </th>
            </tr>
          </thead>
          <tbody>
            {indraShift.map((log) => (
              <tr
                key={log.shift_id}
                className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75"
              >
                <td className="px-4 py-4 font-medium text-[#004254] whitespace-nowrap dark:text-[#004254] dark:hover:text-[#E3E2DA]">
                  {log.shift_id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {log.shift_name}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {log.start_time}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">{log.end_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}

export default IndraShift;
