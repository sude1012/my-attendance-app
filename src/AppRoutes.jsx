import { Routes, Route } from "react-router-dom";
import AttedancePage from "./pages/AttedancePage";
import AttendanceMonitoring from "./pages/AttendanceMonitoring";
import IndraMain from "./pages/IndraMain";
import IndraOfficeMain from "./pages/IndraOfficeMain";
import IndraTeamMain from "./pages/IndraTeamMain";
import IndraShiftMain from "./pages/IndraShiftMain";
import AddUserPage from "./pages/AddUserPage";
import { AttendanceProvider } from "./hooks/AttendanceProvider";
function AppRoutes() {
  return (
    <div>
      {" "}
      <Routes>
        <Route path="/*" element={<AttedancePage />} />
        <Route
          path="Attendance-Monitoring"
          element={<AttendanceMonitoring />}
        />{" "}
        <Route path="/Indra-Main" element={<IndraMain />} />
        <Route path="/Indra-Office" element={<IndraOfficeMain />} />
        <Route path="/Indra-Team" element={<IndraTeamMain />} />
        <Route path="/Indra-Shift" element={<IndraShiftMain />} />
        <Route path="/Add-User" element={<AddUserPage />} />
        <Route path="/Add-Timelogs" element={<AddUserPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default AppRoutes;
