import { createTask, deleteTask, getTasks } from "../controllers/taskController.js";
import express from 'express'

const router = express.Router();

// Get all tasks
router.get('/', getTasks);

// Create task
router.post('/', createTask);

// Delete task
router.delete('/:id', deleteTask);

export default router;