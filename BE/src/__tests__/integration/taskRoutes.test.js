import request from "supertest";
import app from "../../app.js";
import * as database from "../../db/database.js";

describe("/api/task integration tests", () => {
  beforeAll(async () => {
    await database.queryDB(`
      CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'open',
        due_date TIMESTAMP
      );
    `);
  });

  afterAll(async () => {
    await database.queryDB("TRUNCATE TABLE tasks RESTART IDENTITY");
  });

  afterAll(async () => {
    await database.queryDB("DROP TABLE tasks;");
    await database.closeDB();
  });

  test("GET /api/task should return an empty array", async () => {
    const res = await request(app).get("/api/task");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
});
