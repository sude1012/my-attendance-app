import { useContext } from "react";
import { AttendanceContext } from "./AttendanceContext";

export function useAttendance() {
  return useContext(AttendanceContext);
}
