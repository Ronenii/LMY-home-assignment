import { queryDB } from "../db/database.js";

export const getAllTasksService = async (userId, status, orderBy, order) => {
  try {
    let query = "SELECT * FROM tasks WHERE user_id = $1";
    const params = [userId];
    let idx = 2;

    if (status) {
      query += ` WHERE status = $${idx}`;
      params.push(status);
      idx++;
    }

    if (orderBy) {
      const direction = order ? order.toUpperCase() : "ASC";
      query += ` ORDER BY ${orderBy} ${direction}`;
    }

    const result = await queryDB(query, params);
    return result.rows;
  } catch (err) {
    throw new Error(`Error fetching tasks: ${err.message}`);
  }
};

export const getTaskByIdService = async (userId, id) => {
  const result = await queryDB("SELECT * FROM tasks WHERE id = $1 AND user_id = $2", [id, userId]);
  return result.rows[0];
};

export const createTaskService = async (userId, title, description = "", due_date = null) => {
  const result = await queryDB(
    "INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, description, due_date, userId]
  );

  return result.rows[0];
};

export const updateTaskStatusService = async (userId, id, status) => {
  const result = await queryDB(
    "UPDATE tasks SET status=$1 WHERE id = $2 AND user_id = $3 RETURNING *",
    [status, id, userId]
  );

  return result.rows[0];
};

export const updateTaskDetailsService = async (
  userId,
  id,
  title,
  description = "",
  dueDate = null
) => {
  let query = "UPDATE tasks SET title=$1, description=$2";
  const params = [title, description];

  // Conditionally add due_date to the query
  if (dueDate !== null) {
    query += `, due_date=$3`;
    params.push(dueDate);
  }

  // Finalize the query with WHERE clause
  query += ` WHERE user_id=$${params.length + 1} AND id=$${params.length + 2} RETURNING *`;
  params.push(userId, id);

  const result = await queryDB(query, params);
  return result.rows[0];
};

export const deleteTaskService = async (userId, id) => {
  const result = await queryDB("DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *", [
    id,
    userId
  ]);
  return result.rows[0];
};
