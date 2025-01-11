// Please run the docker-Compose.yml file in /BE before running the tests

import request from "supertest";
import app from "../../app.js";
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

let postgresClient;
let server;

const newTask = {
  title: "Test",
  description: "Test",
  due_date: "2080-01-01",
};

const normalizeDate = (date) => new Date(date).toISOString().split("T")[0];

// Connect to test container and create tasks tabler.
describe("/api/task integration tests", () => {
  beforeAll(async () => {
    const databaseUri = process.env.TEST_DATABASE_URL;
    console.log(`Connecting to database at: ${databaseUri}`);

    postgresClient = new Client({ connectionString: databaseUri });
    await postgresClient.connect();

    await postgresClient.query(`
      CREATE TABLE tasks (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          due_date DATE,
          status VARCHAR(50) DEFAULT 'open',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Database initialized for testing.");

    server = app.listen(0, () => {
      console.log("Test server started...");
    });
  });

  // Delete table contents after each test.
  afterEach(async () => {
    if (postgresClient) {
      try {
        await postgresClient.query("TRUNCATE TABLE tasks RESTART IDENTITY;");
      } catch (error) {
        console.error("Error during afterEach cleanup:", error);
      }
    }
  });

  // Delete table from test container
  afterAll(async () => {
    try {
      if (postgresClient) {
        console.log("Dropping tasks table...");
        await postgresClient.query("DROP TABLE IF EXISTS tasks;");
        console.log("Closing database connection...");
        await postgresClient.end();
      }
    } catch (error) {
      console.error("Error during afterAll cleanup:", error);
    } finally {
      if (server) {
        await server.close();
      }
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

  test("POST /api/task should create a new task", async () => {
    const newTask = {
      title: "Test",
      description: "Test",
      due_date: "2080-01-01",
    };

    const res = await request(server).post("/api/task").send(newTask);
    expect(res.statusCode).toBe(201);

    expect(res.body).toEqual({
      status: 201,
      message: "Task created successfully.",
      data: expect.objectContaining({
        id: 1,
        title: newTask.title,
        description: newTask.description,
        status: "open",
      }),
    });
  });

  test("GET /api/task/:id should task 1", async () => {
    const res = await request(server).post("/api/task").send(newTask);
    expect(res.statusCode).toBe(201);

    const id = res.body.data.id;
    const fetchRes = await request(server).get(`/api/task/${id}`);
    expect(fetchRes.statusCode).toBe(200);
    expect(fetchRes.body).toEqual({
      status: 200,
      message: `Retrived task ${id}`,
      data: expect.objectContaining({
        id: id,
        title: newTask.title,
        description: newTask.description,
        status: "open",
      }),
    });
  });

  test("PUT /api/task/status/:id should update task status", async () => {
    const newStatus = "done";
    const res = await request(server).post("/api/task").send(newTask);
    expect(res.statusCode).toBe(201);

    const id = res.body.data.id;
    const updateRes = await request(server)
      .put(`/api/task/status/${id}`)
      .send({ status: newStatus });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body).toEqual({
      status: 200,
      message: `Task ${id} status updated to done.`,
      data: expect.objectContaining({
        id: id,
        title: newTask.title,
        description: newTask.description,
        status: newStatus,
      }),
    });
  });
});
