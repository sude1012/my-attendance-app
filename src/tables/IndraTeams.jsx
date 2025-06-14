// import { sampleIndraData } from "../utils/sampleIndraData";
import Pagination from "../components/pagination/Pagination";
//                   </a>
function IndraTeam({ indraTeam }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-10">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Team No.
              </th>
              <th scope="col" className="px-6 py-3">
                Team Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>

              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody>
            {indraTeam.map((log) => (
              <tr className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-[#004254] whitespace-nowrap dark:text-[#004254] dark:hover:text-[#E3E2DA]"
                >
                  {log.team_number}
                </td>
                <td className="px-6 py-4">{log.team_name}</td>
                <td className="px-6 py-4">{log.description}</td>

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

export default IndraTeam;
