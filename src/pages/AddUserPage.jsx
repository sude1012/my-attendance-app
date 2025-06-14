import IndraLogo from "../components/logo and images/IndraLogo";
import AddUser from "../components/form/AddUser";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";
import Header from "../components/headers/Header";
import { useAttendance } from "../hooks/useAttendance";
function AddUserPage() {
  useDocument("Add User | Indra Business Analyst");
  const { officeIndra, indraTeam, indraShift } = useAttendance();
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center">
      {/* <Sidebar /> */}
      <div className="">
        <a href="/">
          {" "}
          <IndraLogo />
        </a>
      </div>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <AddUser
          officeIndra={officeIndra}
          indraTeam={indraTeam}
          indraShift={indraShift}
        />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AddUserPage;
