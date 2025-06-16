import { useAttendance } from "../../hooks/useAttendance";

function CurrentDate() {
  // Format the date to "Month Day, Year"
  const { currentDate } = useAttendance();
  if (!currentDate) {
    return <div>Error: Current date is not available</div>;
  }
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-center items-center m-2">
      <h1
        className="text-2xl font-medium text-[#004254]
      sm:text-5xl"
      >
        {formattedDate}
      </h1>
    </div>
  );
}

export default CurrentDate;
