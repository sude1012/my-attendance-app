import IndraLogo from "../components/logo and images/IndraLogo";
import IndraPersons from "../tables/IndraPersons";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";
import { useAttendance } from "../hooks/useAttendance";
function IndraMain() {
  useDocument("Indra Persons Monitoring | Indra Business Analyst");
  const { indraPersons } = useAttendance();
  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-8">
      <div className="">
        <a href="/">
          {" "}
          <IndraLogo />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <IndraPersons indraPersons={indraPersons} />
        {console.log("Indra persons:", indraPersons)}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default IndraMain;
