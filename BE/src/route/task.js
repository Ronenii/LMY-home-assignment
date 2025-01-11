import {
  createTask,
  deleteTask,
  getTaskById,
  getAllTasks,
  updateTaskDetails,
  updateTaskStatus
} from "../controller/taskController.js";
import express from "express";
import { authenticateToken } from "../middleware/authHandler.js";

const router = express.Router();

// Get all tasks
router.get("/", authenticateToken, getAllTasks);

// Get task by ID
router.get("/:id", authenticateToken, getTaskById);

// Create task
router.post("/", authenticateToken, createTask);

// Update task status
router.put("/status/:id", authenticateToken, updateTaskStatus);

// Update task details
router.put("/details/:id", authenticateToken, updateTaskDetails);

// Delete task
router.delete("/:id", authenticateToken, deleteTask);

export default router;
