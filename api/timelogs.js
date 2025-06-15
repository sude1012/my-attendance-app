/* eslint-disable no-undef */
import pkg from "pg";
import dotenv from "dotenv";

// Load the correct .env file based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.prod" });
  console.log("Using PRODUCTION environment variables");
} else if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
  console.log("Using TEST environment variables");
  console.log(
    "Connecting to DB:",
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_NAME
  );
} else {
  dotenv.config(); // defaults to .env
}

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
});


export default async function hanlder(req, res) {
  try {
    const result = await pool.query(`SELECT
  t.time_keeping_id,
  t.date,
  i.indra_number,
  i.full_name,
  s.shift_name,
  s.start_time,
  t.time_in,
  t.time_out,
  ROUND(
  CASE
        WHEN t.time_in > (s.start_time::TIME + INTERVAL '15 minutes') THEN
            EXTRACT(EPOCH FROM (t.time_in - s.start_time::TIME)) / 60
        ELSE 0
    END,2
  )  AS minutes_late,
  t.status
FROM
  time_logs t
JOIN
  indra_table i ON t.indra_number = i.indra_number
JOIN
  shifts s ON t.shift_id = s.shift_id
ORDER BY t.date DESC, t.time_in ASC
limit 12 OFFSET 0;`);
    res.json(result.rows); // Send the data as JSON
  } catch (err) {
    console.error("Error fetching timelogs:", err);
    res
      .status(500)
      .json({ error: "Can't fetch time logs", details: err.message });
  }
}
  