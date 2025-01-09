import pool from "../config/db";

export const getAllTasksService = async () => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

export const getTaskByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
};

export const createTaskService = async (title, due_date) => {
  const result = await pool.query(
    "INSET INTO tasks (title, due_date) VALUES ($1, $2) RETURNING *",
    [title, due_date]
  );

  return result.rows[0];
};

export const updateTaskStatusService = async (id, status) => {
  const result = await pool.query(
    "UPDATE tasks SET status=$1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  return result.rows[0];
};

export const deleteTaskService = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
