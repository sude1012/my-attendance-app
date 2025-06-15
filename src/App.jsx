import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { AttendanceProvider } from "./hooks/AttendanceProvider";

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
