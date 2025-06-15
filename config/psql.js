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

dotenv.config();

const { Pool } = pkg;
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "*****" : "NOT SET");
console.log("DB_PORT:", process.env.DB_PORT);
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false },
});

export default pool;
