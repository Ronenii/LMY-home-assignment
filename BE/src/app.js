import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import taskRoutes from "./route/task.js";
import authRoutes from "./route/auth.js"
import healthRoutes from "./route/health.js";
import errorHandling from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

const TASK_ROUTE = process.env.TASK_API_ROUTE || "/api/task";
const AUTH_ROUTE = process.env.AUTH_API_ROUTE || "/api/auth";
const HEALTH_ROUTE = process.env.HEALTH_ROUTE || "/health";

// Middleware

// JSON Parser
app.use(express.json());

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Routes

app.use(TASK_ROUTE, taskRoutes);
app.use(AUTH_ROUTE, authRoutes);
app.use(HEALTH_ROUTE, healthRoutes);

// Handle unmatched routes
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use(errorHandling);

export default app;
