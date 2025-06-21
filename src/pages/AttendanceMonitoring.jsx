import IndraLogo from "../components/logo and images/IndraLogo";
import TimekeepingMonitoring from "../components/headers/TimekeepingMonitoring";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";

function AttendanceMonitoring() {
  useDocument("Attendance Monitoring | Indra Business Analyst");

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-8">
      <div className="">
        <a href="/">
          <IndraLogo />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <TimekeepingMonitoring />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AttendanceMonitoring;
