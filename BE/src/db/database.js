import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;

dotenv.config();

const connectionString =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "No database connection string provided. Please set DATABASE_URL or TEST_DATABASE_URL in your .env file."
  );
}

const pool = new Pool({ connectionString });

export const queryDB = (text, params) => pool.query(text, params);

export const closeDB = async () => {
  await pool.end();
  console.log("Database connection pool has been closed.");
};
