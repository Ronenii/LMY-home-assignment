import pkg from "pg";
import dotenv from "dotenv";

const { Pool, types } = pkg;

dotenv.config();

const dbHost = process.env.DB_HOST || "localhost"; // Default to localhost
const dbPort = process.env.DB_PORT || 5432; // Default to 5432
const dbUser = process.env.DB_USER || "postgres";
const dbPassword = process.env.DB_PASSWORD || "1";
const dbName = process.env.DB_NAME || "task_manager";

const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;


if (!connectionString) {
  throw new Error(
    "No database connection string provided. Please set DATABASE_URL or TEST_DATABASE_URL in your .env file."
  );
}

// Dates were being saved as timestamps. This seems to fix it
const DATE_OID = 1082;
types.setTypeParser(DATE_OID, (value) => value);


const pool = new Pool({ connectionString });

export const queryDB = (text, params) => pool.query(text, params);

export const closeDB = async () => {
  await pool.end();
  console.log("Database connection pool has been closed.");
};
