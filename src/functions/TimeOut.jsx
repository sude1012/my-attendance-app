function handleTimeOut(e) {
  if (e) e.preventDefault();
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const currentDate = new Date().toISOString().slice(0, 10); // "2025-05-30"
  console.log(`The ${fullName} Time Out is ${currentDate}, ${currentTime}`);
  if (!fullName || !timeIn || !currentDate) {
    // console.log(`The ${fullName} Time Out is ${currentDate}, ${currentTime}`);
    setShowError(true);
    setInterval(() => setShowError(false), 1000);
    return;
  }
  const indra_number = indraPersons.find(
    (item) => item.full_name === fullName
  )?.indra_number;
  // Update time_out in the backend
  fetch("http://localhost:5050/update-timeout", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      indra_number,
      date: currentDate,
      time_out: currentTime,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }
      return res.json();
    })
    .then(() => {
      setTimeOut(currentTime);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      toast.success(
        `User ${fullName} with Indra No. ${indra_number} successfully timed out at ${currentTime}`
      );
    })
    .catch((err) => {
      setShowError(true);
      setInterval(() => setShowError(false), 6000);
      console.error("Error updating time-out:", err);
    });
}
