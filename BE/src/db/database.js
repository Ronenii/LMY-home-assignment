import pkg from "pg";
import dotenv from "dotenv";
import { getDatabaseUri } from "../__tests__/setupTestEnvironment.js";

const { Pool } = pkg;

// Choose the connection string based on the environment
const connectionString =
  process.env.NODE_ENV === "test" ? getDatabaseUri() : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

export const queryDB = (text, params) => pool.query(text, params);
export const closeDB = () => pool.end();
