import { useState, useEffect } from "react";
import { AttendanceContext } from "./AttendanceContext";

export function AttendanceProvider({ children }) {
  const [officeIndra, setOfficeIndra] = useState([]);
  const [indraTeam, setIndraTeam] = useState([]);
  const [indraShift, setIndraShift] = useState([]);
  const [indraPersons, setIndraPersons] = useState([]);
  const [indraTimelogs, setIndraTimelogs] = useState([]);
  useEffect(() => {
    // Fetch the Office
    fetch("http://localhost:5050/api/indra-office")
      .then((res) => res.json())
      .then((data) => {
        setOfficeIndra(data);
        // console.log("Indra office data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching Indra office:", error);
      });
    // Fetch the Position
    fetch("http://localhost:5050/api/indra-team")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIndraTeam(data);
        console.log("Indra persons data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching Indra persons:", error);
      });
    // Fetch the shift
    fetch("http://localhost:5050/api/indra-shift")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIndraShift(data);
        console.log("Indra persons data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching Indra persons:", error);
      });
    fetch("http://localhost:5050/api/indra")
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .then((data) => {
        setIndraPersons(data);
        console.log("Indra persons data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching Indra persons:", error);
      });
    // Fetch the Timelogs
    fetch("http://localhost:5050/api/timelogs")
      .then((res) => res.json())
      .then((data) => {
        setIndraTimelogs(data);
        // console.log("Indra office data fetched:", data);
      })
      .catch((error) => {
        console.error("Error fetching timelogs:", error);
      });
  }, []);
  return (
    <AttendanceContext.Provider
      value={{
        officeIndra,
        indraTeam,
        indraShift,
        indraPersons,
        indraTimelogs,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
}
