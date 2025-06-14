import IndraLogo from "../components/logo and images/IndraLogo";
// import InOutButton from "../components/buttons/InOutButton";
import CurrentTime from "../components/Time and Date/CurrentTime";
import CurrentDate from "../components/Time and Date/currentDate";
import useDocument from "../hooks/useDocument";
import Header from "../components/headers/Header";
import Form from "../components/form/Form";
import Footer from "./Footer";
import ViewAttendance from "../components/buttons/ViewAttendance";
import { useAttendance } from "../hooks/useAttendance";

function AttedancePage({ indra }) {
  useDocument("Indra Timekeeping From");
  const { officeIndra, indraPersons } = useAttendance();
  return (
    <div className="min-h-screen flex flex-col justify-between items-centers">
      <div className="flex flex-col justify-between items-center">
        hello
        <IndraLogo />
        <Header />
      </div>
      <div className="">
        <div className="flex flex-col justify-center items-center py-2 m-2">
          <CurrentDate />
          <CurrentTime />
        </div>
        <div className="">
          <Form
            indra={indra}
            officeIndra={officeIndra}
            indraPersons={indraPersons}
          />
        </div>
        <div className="flex flex-row justify-center">
          <a href="Attendance-Monitoring">
            <ViewAttendance>View Attendance</ViewAttendance>
          </a>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default AttedancePage;
