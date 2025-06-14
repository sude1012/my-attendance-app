import { Route, Routes, BrowserRouter } from "react-router-dom";
import { AttendanceContext } from "./hooks/AttendanceContext";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  const indra = [
    {
      inNumber: 587174,
      fullName: "Jude S. Faustino",
      position: "Business Analyst",
      team: "DMA",
    },
    {
      inNumber: 587175,
      fullName: "Kobe Bryant",
      position: "Business Analyst",
      team: "DMA",
    },
    {
      inNumber: 587176,
      fullName: "Kevin Durant",
      position: "Business Analyst",
      team: "DMA",
    },
    {
      inNumber: 587177,
      fullName: "LeBron James",
      position: "Business Analyst",
      team: "DMA",
    },
    {
      inNumber: 587178,
      fullName: "Luka Doncic",
      position: "Business Analyst",
      team: "DMA",
    },
  ];

  return (
    <BrowserRouter>
      <AttendanceContext.Provider value={indra}>
        <Routes>
          <Route path="/*" element={<AppRoutes indra={indra} />} />
        </Routes>
      </AttendanceContext.Provider>
      {/* Render the main application routes */}
    </BrowserRouter>
  );
}

export default App;
