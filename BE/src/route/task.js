import {
  createTask,
  deleteTask,
  getTaskById,
  getAllTasks,
  updateTaskDetails,
  updateTaskStatus,
} from "../controller/taskController.js";
import express from "express";

const router = express.Router();

// Get all tasks
router.get("/", getAllTasks);

// Get task by ID
router.get("/:id", getTaskById);

// Create task
router.post("/", createTask);

// Update task status
router.put("/status/:id", updateTaskStatus);

// Update task details
router.put("/details/:id", updateTaskDetails);

// Delete task
router.delete("/:id", deleteTask);

export default router;
