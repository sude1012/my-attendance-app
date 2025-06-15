import IndraLogo from "../components/logo and images/IndraLogo";
import TimekeepingMonitoring from "../components/headers/TimekeepingMonitoring";
import Footer from "./Footer";
import useDocument from "../hooks/useDocument";
import { useAttendance } from "../hooks/useAttendance";
function AttendanceMonitoring() {
  useDocument("Attendance Monitoring | Indra Business Analyst");
  const { indraTimelogs } = useAttendance();

  return (
    <div className="w-screen h-screen flex flex-col justify-between items-center gap-8">
      <div className="flex flex-col justify-center items-center">
        <TimekeepingMonitoring indraTimelogs={indraTimelogs} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AttendanceMonitoring;
