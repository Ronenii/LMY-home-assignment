import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskDetailsService,
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

const validateIsIdProvided = (id) => {
  if (!id) {
    return handleResponse(res, 400, "Task ID is required.");
  }
};

const validateDueDate = (dueDate) => {
  if (dueDate) {
    const now = new Date();
    const dueDateData = new Date(dueDate);
    if (dueDateData <= now) {
      return handleResponse(
        res,
        400,
        "If a due date is provided it needs to be in the future."
      );
    }
  }
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
  const { id } = req.params.id;

  validateIsIdProvided(id);

  try {
    const task = await getTaskById(id);
    if (!user) {
      return handleResponse(res, 404, `Task with id ${id} not found.`);
    }
    handleResponse(res, 200, `Retrived task ${id}`, task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  const { title, description, due_date: dueDate } = req.body;

  if (!title) {
    return handleResponse(res, 400, "Task title is required.");
  }

  validateDueDate(dueDate);

  try {
    const newTask = await createTaskService(title, description, dueDate);
    handleResponse(res, 201, "Task created successfully.", newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;

  validateIsIdProvided(id);

  try {
    const task = await updateTaskStatusService(id, status);
    handleResponse(res, 200, `Task ${id} status updated to ${status}.`, task);
  } catch (err) {
    next(err);
  }
};

export const updateTaskDetails = async (req, res, next) => {
  const { title, details, dueDate } = req.body;
  const { id } = req.params;

  validateIsIdProvided(id);
  validateDueDate(dueDate);

  if (!title) {
    return handleResponse(res, 400, "Title must not be empty.");
  }

  try {
    const task = await updateTaskDetailsService(id, title, details, dueDate);
    handleResponse(res, 200, `Task ${id} details updated successfully.`, task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;

  validateIsIdProvided(id);

  try {
    const deletedTask = await deleteTaskService(id);

    if (!deletedTask) {
      return handleResponse(res, 404, `Task with id ${id} not found.`);
    }
    handleResponse(res, 200, `Deleted task ${id} successfully.`, deletedTask);
  } catch (err) {
    next(err);
  }
};
