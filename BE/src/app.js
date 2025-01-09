import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import taskRoutes from "./route/task.js";
import pool from "./config/db.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
const TASK_ROUTE = process.env.TASK_API_ROUTE || "/api/task";

// Middleware

// JSON Parser
app.use(express.json());

// CORS
app.use(cors());

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

// DB Health Check
app.get("/db_health", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.status(200).json({
      message: `Connected to: ${result.rows[0].current_database}`,
    });
  } catch (err) {
    console.error("Error during query execution:", err);
  }
});

// Routes

app.use(TASK_ROUTE, taskRoutes);

// Handle unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Server running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
