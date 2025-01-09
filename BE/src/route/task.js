import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskStatus,
} from "../controller/taskController.js";
import express from "express";

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Create task
router.post("/", createTask);

// Update task status
router.put("/:id", updateTaskStatus);

// Delete task
router.delete("/:id", deleteTask);

export default router;
