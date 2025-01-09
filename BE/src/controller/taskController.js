import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskStatusService,
} from "../model/taskModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasksService();
    handleResponse(res, 200, "Tasks fetched successfully.", tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await getTaskById(req.params.id);
    if (!user) {
      return handleResponse(res, 404, `Task with id ${id} not found.`);
    }
    handleResponse(res, 200, `Retrived task ${id}`, task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  const { title, due_date } = req.body;
  try {
    const newTask = await createTaskService(title, due_date);
    handleResponse(res, 201, "Task created successfully.", newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;
  try {
    const task = await updateTaskStatusService(req.params.id, status);
    handleResponse(res, 204, `Task ${id} status updated to ${status}.`, task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const deletedTask = await deleteTaskService(req.params.id);
    if (!user) {
      return handleResponse(res, 404, `Task with id ${id} not found.`);
    }
    handleResponse(res, 200, `Deleted task ${id} successfully.`, deletedTask);
  } catch (err) {
    next(err);
  }
};
