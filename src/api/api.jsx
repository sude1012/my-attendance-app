const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5050";

export async function fetchLatestTimeIn(indra_number, date) {
  const res = await fetch(
    `${API_BASE}/latest-timein?indra_number=${indra_number}&date=${date}`
  );
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function updateTimeOut({
  indra_number,
  date,
  time_in,
  time_out,
  status,
}) {
  const res = await fetch(`${API_BASE}/update-timeout`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ indra_number, date, time_in, time_out, status }),
  });
  if (!res.ok) throw await res.text();
  return res.text();
}
