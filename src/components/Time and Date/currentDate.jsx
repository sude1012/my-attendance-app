import { useEffect, useState } from "react";

function CurrentDate() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const newDate = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(newDate);
  }, []);
  // Format the date to "Month Day, Year"
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
