// import { sampleIndraData } from "../utils/sampleIndraData";
import Pagination from "../components/pagination/pagination";
//                   </a>
function IndraPersons({ indraPersons = [] }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Indra No.
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Office
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Shift
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {indraPersons.map((log) => (
              <tr className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-[#004254] whitespace-nowrap dark:text-[#004254] dark:hover:text-[#E3E2DA]"
                >
                  {log.indra_number}
                </td>
                <td className="px-6 py-4">{log.full_name}</td>
                <td className="px-6 py-4">{log.office_name}</td>
                <td className="px-6 py-4">{log.team_name}</td>
                <td className="px-6 py-4">{log.shift_name}</td>

                {/* <td className="px-6 py-4 text-right hover:text-[#E3E2DA]">
                  <a
                    href="#"
                    className="font-medium text-[#004254] dark:text-[#004254] hover:text-[#E3E2DA] hover:underline"
                  >
                    Edit
                  </a>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}

export default IndraPersons;
