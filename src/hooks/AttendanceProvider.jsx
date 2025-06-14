
import { useState, useEffect } from "react";
import { AttendanceContext } from "./AttendanceContext";

export function AttendanceProvider({ children }) {
  const [attendanceData, setAttendanceData] = useState({
    officeIndra: [],
    indraTeam: [],
    indraShift: [],
    indraPersons: [],
    indraTimelogs: [],
  });

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [office, team, shift, persons, timelogs] = await Promise.all([
          fetch(`${API_BASE}/api/indra-office`).then((res) => res.json()),
          fetch(`${API_BASE}/api/indra-team`).then((res) => res.json()),
          fetch(`${API_BASE}/api/indra-shift`).then((res) => res.json()),
          fetch(`${API_BASE}/api/indra`).then((res) => res.json()),
          fetch(`${API_BASE}/api/timelogs`).then((res) => res.json()),
        ]);
        debugger;
        setAttendanceData({
          officeIndra: office,
          indraTeam: team,
          indraShift: shift,
          indraPersons: persons,
          indraTimelogs: timelogs,
        });

        console.log("fetchData [ATTENDANCE] LOADED");
      } catch (error) {
        console.error("Error fetchData [ATTENDANCE]:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <AttendanceContext.Provider value={attendanceData}>
      {children}
    </AttendanceContext.Provider>
  );
}
