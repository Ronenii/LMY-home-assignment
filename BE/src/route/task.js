import {
  createTask,
  deleteTask,
  getTasks,
  updateTaskDetails,
  updateTaskStatus,
} from "../controller/taskController.js";
import express from "express";

const router = express.Router();

// Get all tasks
router.get("/", getTasks);

// Create task
router.post("/", createTask);

// Update task status
router.put("/status/:id", updateTaskStatus);

// Update task details
router.put("/details/:id", updateTaskDetails);

// Delete task
router.delete("/:id", deleteTask);

export default router;
