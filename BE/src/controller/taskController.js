import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
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

const validateIsIdProvided = (res, id) => {
  if (!id) {
    handleResponse(res, 400, "Task ID is required.");
    return false;
  }
  return true;
};

const validateDueDate = (res, dueDate) => {
  if (dueDate) {
    const now = new Date();
    const dueDateData = new Date(dueDate);
    if (dueDateData <= now) {
      handleResponse(res, 400, "Due date must be null or in the future.");
      return false;
    }
  }
  return true;
};

const validateTaskFound = (res, task) => {
  if (!task) {
    handleResponse(res, 404, "Task ID was not found.");
    return false;
  }
  return true;
};

const validateCorrectStatus = (res, status) => {
  const validStatuses = ["open", "done"];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    handleResponse(res, 400, "Status must be 'open' or 'done'");
    return false;
  }
  return true;
};

const validateOrderBy = (res, orderBy) => {
  const validOrderBy = ["created_at", "due_date"];
  if (orderBy && !validOrderBy.includes(orderBy.toLowerCase())) {
    handleResponse(res, 400, "OrderBy must be by 'created_ad' or 'due_date'");
    return false;
  }
  return true;
};

const validateOrder = (res, order) => {
  const validOrder = ["asc", "desc"];
  if (order && !validOrder.includes(order.toLowerCase())) {
    handleResponse(res, 400, "Order must be by 'asc' or 'desc'");
    return false;
  }
  return true;
};

export const getAllTasks = async (req, res, next) => {
  const { status, orderBy, order } = req.query;

  if (!validateCorrectStatus(status)) return;
  if (!validateOrderBy(orderBy)) return;
  if (!validateOrder(order)) return;

  try {
    const tasks = await getAllTasksService(status, orderBy, order);
    handleResponse(res, 200, "Tasks fetched successfully.", tasks);
  } catch (err) {
    next(err);
  }
};

export const getTaskById = async (req, res, next) => {
  const id = req.params.id;

  if (!validateIsIdProvided(res, id)) return;

  try {
    const task = await getTaskByIdService(id);
    if (!validateTaskFound(res, task)) return;
    handleResponse(res, 200, `Retrived task ${id}`, task);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  const { title, description, due_date } = req.body;

  if (!title) {
    return handleResponse(res, 400, "Task title is required.");
  }
  if (!validateDueDate(res, due_date)) return;
  try {
    const newTask = await createTaskService(title, description, due_date);

    handleResponse(res, 201, "Task created successfully.", newTask);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  const { status } = req.body;
  const id = req.params.id;

  if (!validateIsIdProvided(res, id)) return;
  if (!validateCorrectStatus(res, status)) return;

  try {
    const task = await updateTaskStatusService(id, status);
    if (!validateTaskFound(res, task)) return;
    handleResponse(res, 200, `Task ${id} status updated to ${status}.`, task);
  } catch (err) {
    next(err);
  }
};

export const updateTaskDetails = async (req, res, next) => {
  const { title, description, due_date } = req.body;
  const id = req.params.id;

  if (!validateIsIdProvided(res, id)) return;
  if (!validateDueDate(res, due_date)) return;

  if (!title) {
    return handleResponse(res, 400, "Title must not be empty.");
  }

  try {
    const task = await updateTaskDetailsService(id, title, description, due_date);
    if (!validateTaskFound(res, task)) return;
    handleResponse(res, 200, `Task ${id} details updated successfully.`, task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  if (!validateIsIdProvided(res, id)) return;

  try {
    const deletedTask = await deleteTaskService(id);
    if (!validateTaskFound(res, deleteTask)) return;
    handleResponse(res, 200, `Deleted task ${id} successfully.`, deletedTask);
  } catch (err) {
    next(err);
  }
};
