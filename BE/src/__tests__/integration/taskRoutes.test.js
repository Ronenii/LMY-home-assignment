import request from "supertest";
import app from "../../app.js";
import * as database from "../../db/database.js";
import { Client } from "pg";
import { getDatabaseUri } from "../setupTestEnvironment.js"; // Import getDatabaseUri to fetch the test container URI

let postgresClient;

describe("/api/task integration tests", () => {
  beforeAll(async () => {
    // Get the database URI after the test container is fully started
    const databaseUri = getDatabaseUri();
    console.log(`Connecting to database at: ${databaseUri}`);

    postgresClient = new Client({ connectionString: databaseUri });
    await postgresClient.connect(); // Ensure the connection is established after container startup

    // Create the tasks table before any tests run
    await postgresClient.query(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'open',
        due_date TIMESTAMP
      );
    `);
  });

  afterEach(async () => {
    // Clean up the tasks table after each test
    await postgresClient.query("TRUNCATE TABLE tasks RESTART IDENTITY;");
  });

  afterAll(async () => {
    // Drop the tasks table after all tests are done
    await postgresClient.query("DROP TABLE tasks;");
    await postgresClient.end(); // Close the connection
  });

  test("GET /api/task should return an empty array", async () => {
    const res = await request(app).get("/api/task");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]); // Expect an empty array since no tasks are added
  });
});
