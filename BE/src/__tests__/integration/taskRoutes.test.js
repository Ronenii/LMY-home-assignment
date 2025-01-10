import request from "supertest";
import app from "../../app.js";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

let postgresClient;
let server;

describe("/api/task integration tests", () => {
  beforeAll(async () => {
    const databaseUri = process.env.TEST_DATABASE_URL; // Use static connection string
    console.log(`Connecting to database at: ${databaseUri}`);

    postgresClient = new Client({ connectionString: databaseUri });
    await postgresClient.connect();

    await postgresClient.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'open',
        due_date TIMESTAMP
      );
    `);
    console.log("Database initialized for testing.");

    server = app.listen(0, () => {
      console.log("Test server started...");
    });
  });

  afterEach(async () => {
    if (postgresClient) {
      try {
        await postgresClient.query("TRUNCATE TABLE tasks RESTART IDENTITY;");
      } catch (error) {
        console.error("Error during afterEach cleanup:", error);
      }
    }
  });

  afterAll(async () => {
    if (postgresClient) {
      try {
        console.log("Dropping tasks table...");
        await postgresClient.query("DROP TABLE IF EXISTS tasks;");
        console.log("Closing database connection...");
        await postgresClient.end();
      } catch (error) {
        console.error("Error during afterAll cleanup:", error);
      }
    }

    if (server) {
      server.close();
    }
  });

  test("GET /api/task should return an empty array", async () => {
    const res = await request(server).get("/api/task");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "Tasks fetched successfully.",
      status: 200,
    });
  });

  test("GET /api/task/:id should return an empty array", async () => {
    const res = await request(server).get("/api/task");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      data: [],
      message: "Tasks fetched successfully.",
      status: 200,
    });
  });

  test;
});
