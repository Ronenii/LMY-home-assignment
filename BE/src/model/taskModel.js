import { queryDB } from "../db/database.js";

export const getAllTasksService = async (status, orderBy, order) => {
  try {
    let query = "SELECT * FROM tasks";
    const params = [];
    let idx = 1;

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

export const getTaskByIdService = async (id) => {
  const result = await queryDB("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0];
};

export const createTaskService = async (
  title,
  description = "",
  due_date = null
) => {
  console.log("Inserting task:", { title, description, due_date }); // Debug log

  const result = await queryDB(
    "INSERT INTO tasks (title, description, due_date) VALUES ($1, $2, $3) RETURNING *",
    [title, description, due_date]
  );

  return result.rows[0];
};

export const updateTaskStatusService = async (id, status) => {
  const result = await queryDB(
    "UPDATE tasks SET status=$1 WHERE id = $2 RETURNING *",
    [status, id]
  );

  return result.rows[0];
};

export const updateTaskDetailsService = async (
  id,
  title,
  description = "",
  dueDate = null
) => {
  let query = "UPDATE tasks SET title=$1, description=$2";
  const params = [title, description];

  // Conditionally add due_date to the query
  if (dueDate !== null) {
    query += ", due_date=$3";
    params.push(dueDate);
  }

  // Finalize query with WHERE clause
  query += ` WHERE id=$${params.length + 1} RETURNING *`;
  params.push(id);

  const result = await queryDB(query, params);
  return result.rows[0];
};

export const deleteTaskService = async (id) => {
  const result = await queryDB("DELETE FROM tasks WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result.rows[0];
};
