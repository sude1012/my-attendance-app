import { useState, useEffect } from "react";

function CurrentTime() {
  const [currentTime, setCurrentTime] = useState(new Date());

  function clock() {
    let h = currentTime.getHours();
    const m = currentTime.getMinutes().toString().padStart(2, "0");
    const s = currentTime.getSeconds().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    const timeNow = `${h.toString().padStart(2, "0")}:${m}:${s} ${ampm}`;
    return timeNow;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-2 mb-3">
      <h1
        className="text-4xl font-medium text-[#004254]
      sm:text-6xl"
      >
        {clock()}
      </h1>
    </div>
  );
}

export default CurrentTime;
