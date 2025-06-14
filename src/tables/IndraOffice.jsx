import Pagination from "../components/pagination/Pagination";
import SideBar from "../components/sidebar/Sidebar";
//                   </a>
function IndraOffice({ officeIndra }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full p-4 gap-10">
      <SideBar />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#E3E2DA] uppercase bg-[#004254] dark:bg-[#004254] dark:text-[#E3E2DA]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Office No.
              </th>
              <th scope="col" className="px-6 py-3">
                Office Name
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>

              {console.log("Indra office data:", officeIndra)}
            </tr>
          </thead>
          <tbody>
            {officeIndra.map((log) => (
              <tr className="bg-[#E3E2DA] border-1 dark:bg-[#E3E2DA] text-[#004254] dark:border-gray-700 border-gray-200 dark:hover:text-[#E3E2DA] hover:bg-gray-50 dark:hover:bg-[#004254]/75">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-[#004254] whitespace-nowrap dark:text-[#004254] dark:hover:text-[#E3E2DA]"
                >
                  {log.office_number}
                </td>
                <td className="px-6 py-4">{log.office_name}</td>
                <td className="px-6 py-4">{log.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
}

export default IndraOffice;
