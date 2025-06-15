import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { AttendanceProvider } from "./hooks/AttendanceProvider";

function App() {
  return (
    <BrowserRouter>
      {/* relocate provider because you have redundant context provider*/}
      <AttendanceProvider>
        <Routes>
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </AttendanceProvider>
    </BrowserRouter>
  );
}

export default App;
