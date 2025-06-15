/* eslint-disable no-undef */
// Great to hear that it's working after restarting the server and React app! 🎉

// This is a common step when you:

// Change backend code (like fixing table names or SQL queries)
// Update your database schema
// Make changes to environment variables
// Tip:
// Always restart your Node.js server after backend changes, and refresh your React app if you update API endpoints or data structures.

// If you have more questions or need help with features, just ask!

import express from "express";
import pool from "./psql.js"; // Ensure this points to your psql.js file
import cors from "cors"; // Import the cors middleware
import ExcelJS from "exceljs"; // Add this at the top if using ES modules

const app = express();
const PORT = process.env.PORT || 1000;

// Enable CORS for all routes

app.use(cors());
app.use(express.json()); // Enables JSON body parsing
app.use(express.urlencoded({ extended: true })); // Handles form data
import { body, validationResult } from "express-validator";

// API endpoint to fetch users
app.get("/api/indra", async (req, res) => {
  try {
    const result = await pool.query(`SELECT 
    i.indra_number, 
    i.full_name, 
    o.office_name, 
    t.team_name, 
    s.shift_name
FROM indra_table i
LEFT JOIN offices o ON i.office_number = o.office_number
LEFT JOIN teams t ON i.team_number = t.team_number
LEFT JOIN shifts s ON i.shift_id = s.shift_id;`);
    res.json(result.rows); // Send the data as JSON
  } catch (err) {
    console.error("Error fetching Indra:", err);
    res.status(500).send("Server Error");
  }
});

// API endpoint to fetch time_logs
app.get("/api/timelogs", async (req, res) => {
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
});

app.post(
  "/add-timekeeping",
  [
    body("indra_number").isInt().withMessage("Indra number must be an integer"),
    body("shift_id").isInt().withMessage("Shift ID must be an integer"),
    body("time_in").notEmpty().withMessage("Time in is required"),
    body("date").isISO8601().withMessage("Date must be in ISO8601 format"),
    body("status").isString().withMessage("Status must be a string"),
    // Add more checks as needed
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ error: "Validation failed", details: errors.array() });
    }
    const { indra_number, shift_id, time_in, time_out, date, status } =
      req.body;
    try {
      // Check for existing time-in for this user and date
      const exists = await pool.query(
        "SELECT 1 FROM time_logs WHERE indra_number = $1 AND date = $2",
        [indra_number, date]
      );
      if (exists.rowCount > 0) {
        return res
          .status(400)
          .json({ error: "Already timed in today.", code: 400 });
      }
      // Insert new timekeeping log
      const result = await pool.query(
        `INSERT INTO time_logs (indra_number, shift_id, time_in, time_out, date, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [indra_number, shift_id, time_in, time_out, date, status]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error timekeeping :", err);
      res.status(500).json({ error: "Server Error", details: err.message });
    }
  }
);
// Endpoint to update to get latest time In for a timekeeping log
// Endpoint to get the latest time_in and time_out for a user on a specific date
app.get("/latest-timein", async (req, res) => {
  const { indra_number, date } = req.query;

  if (!indra_number || !date) {
    return res
      .status(400)
      .json({ error: "Indra number and date are required." });
  }

  try {
    const result = await pool.query(
      `SELECT time_in, time_out
       FROM time_logs
       WHERE indra_number = $1 AND date = $2
       ORDER BY time_keeping_id DESC
       LIMIT 1`,
      [indra_number, date]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No time-in found for this user on this date." });
    }

    // Return both time_in and time_out for frontend use
    return res.json({
      time_in: result.rows[0].time_in,
      time_out: result.rows[0].time_out,
    });
  } catch (err) {
    console.error("Error fetching latest time_in:", err);
    return res
      .status(500)
      .json({ error: "Server Error", details: err.message });
  }
});

// Endpoint to update time_out for a timekeeping log
app.put("/update-timeout", async (req, res) => {
  // console.log("Received Request Body for Time-Out:", req.body); // Debug log

  const { indra_number, date, time_out } = req.body;

  try {
    const result = await pool.query(
      `UPDATE time_logs
       SET time_out = $1
       WHERE indra_number = $2 AND date = $3
       RETURNING *`,
      [time_out, indra_number, date]
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No matching time log found.", code: 404 });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating time_out:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

// API endpoint to fetch Indra Office
app.get("/api/indra-office", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM offices;");
    console.log("Offices data:", result.rows); // Debug
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching Indra Office Data:", err);
    res.status(500).send("Server Error");
  }
});

// API endpoint to fetch Indra team

app.get("/api/indra-team", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teams;");
    console.log("Teams data:", result.rows); // Debug
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching Indra Team Data:", err);
    res.status(500).send("Server Error");
  }
});

// API endpoint to fetch Indra Shift
app.get("/api/indra-shift", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM shifts;");
    console.log("Shift data:", result.rows); // Debug
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching Indra Team Data:", err);
    res.status(500).send("Server Error");
  }
});

// Endpoint to add a new user
app.post("/add-user", async (req, res) => {
  console.log("Received Request Body:", req.body); // Debug log

  // If req.body is empty, then something is wrong with the request or middleware
  const { indra_number, full_name, office_number, team_number, shift_id } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO indra_table (indra_number, full_name, office_number, team_number, shift_id)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [indra_number, full_name, office_number, team_number, shift_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

app.get("/api/timelogs/excel", async (req, res) => {
  try {
    const result = await pool.query(`SELECT
  t.time_keeping_id,
  (t.date::timestamp AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Manila' AS date_manila,
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
ORDER BY t.date DESC, t.time_in ASC;`);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Time Logs");

    worksheet.columns = [
      // { header: "Timekeeping ID", key: "time_keeping_id", width: 15 },
      { header: "Date", key: "date_manila", width: 15 },
      { header: "Indra No.", key: "indra_number", width: 12 },
      { header: "Name", key: "full_name", width: 25 },
      { header: "Shift", key: "shift_name", width: 22 },
      { header: "Time-In", key: "time_in", width: 12 },
      { header: "Time-Out", key: "time_out", width: 12 },
      { header: "Late", key: "minutes_late", width: 12 },
      { header: "Status", key: "status", width: 12 },
    ];
    // Style header row (row 1)
    worksheet.getRow(1).eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF004254" }, // Dark blue (your brand color)
      };
      cell.font = {
        color: { argb: "FFFFFFFF" }, // White text
        bold: true,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    worksheet.addRows(result.rows);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=timelogs.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Error generating Excel:", err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
