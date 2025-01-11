import { queryDB } from "../../db/database.js";
import * as taskModel from "../../model/taskModel.js";

import * as database from "../../db/database.js";

const mockTask = {
  id: 1,
  title: "Do homework",
  description: "pages 1-20",
  status: "open",
  due_date: "2080-01-01",
  user_id: 123
};

jest.mock("../../db/database.js", () => ({
  queryDB: jest.fn()
}));

describe("Task Model Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    database.queryDB.mockResolvedValue({ rows: [mockTask] });
  });

  test("getAllTasksService should query all tasks", async () => {
    const tasks = await taskModel.getAllTasksService(mockTask.user_id);
    expect(tasks).toEqual([mockTask]);
  });

  test("getTaskByIdService should query task by ID", async () => {
    const task = await taskModel.getTaskByIdService(mockTask.user_id, 1);
    expect(task).toEqual(mockTask);
    expect(database.queryDB).toHaveBeenCalledWith(
      "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
      [mockTask.id, mockTask.user_id]
    );
  });

  test("createTaskService should insert a new task", async () => {
    const task = await taskModel.createTaskService(
      mockTask.user_id,
      mockTask.title,
      mockTask.description,
      mockTask.due_date
    );
    expect(task).toEqual(mockTask);
    expect(database.queryDB).toHaveBeenCalledWith(
      "INSERT INTO tasks (title, description, due_date, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [mockTask.title, mockTask.description, mockTask.due_date, mockTask.user_id]
    );
  });

  test("UpdateTaskStatusService should change task status", async () => {
    const task = await taskModel.updateTaskStatusService(mockTask.user_id, 1, "closed");
    expect(task).toEqual(mockTask);
    expect(database.queryDB).toHaveBeenCalledWith(
      "UPDATE tasks SET status=$1 WHERE id = $2 AND user_id = $3 RETURNING *",
      ["closed", mockTask.id, mockTask.user_id]
    );
  });
});
