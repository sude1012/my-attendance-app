import IndraLogo from "../components/logo and images/IndraLogo";
import IndraOffice from "../tables/IndraOffice";
import Footer from "./Footer";
import { useAttendance } from "../hooks/useAttendance";
import useDocument from "../hooks/useDocument";

function IndraOfficeMain() {
  const { officeIndra } = useAttendance();

  useDocument("Indra Persons Monitoring | Indra Business Analyst");
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-8">
      <div className="">
        <a href="/">
          {" "}
          <IndraLogo />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <IndraOffice officeIndra={officeIndra} />
        {console.log("Indra persons:", officeIndra)}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IndraOfficeMain;
