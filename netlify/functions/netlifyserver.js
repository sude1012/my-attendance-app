/* eslint-disable no-undef */
import pkg from "pg";
const { Pool } = pkg;

// Set up your pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

export async function handler(event, context) {
  try {
    const result = await pool.query(`
      SELECT
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
        ) AS minutes_late,
        t.status
      FROM
        time_logs t
      JOIN
        indra_table i ON t.indra_number = i.indra_number
      JOIN
        shifts s ON t.shift_id = s.shift_id
      ORDER BY t.date DESC, t.time_in ASC
      LIMIT 12 OFFSET 0;
    `);

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
      headers: { "Content-Type": "application/json" },
    };
  } catch (err) {
    console.error("Error fetching timelogs:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Can't fetch time logs",
        details: err.message,
      }),
      headers: { "Content-Type": "application/json" },
    };
  }
}
