import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AttendanceContext } from "./hooks/AttendanceContext";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
