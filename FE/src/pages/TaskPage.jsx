import { useEffect, useState } from "react";
import TaskBox from "../cmps/task/TaskBox";
import TaskPageBar from "../cmps/task/TaskPageBar";
import TaskCreateForm from "../cmps/task/TaskCreateForm";
import { deleteTask, fetchTasks, updateTaskDetails, createTask } from "../services/taskService";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]); // Initialize as an array
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const loadTasks = async (appliedFilters = {}) => {
    setLoading(true);
    try {
      const fetchedTasks = await fetchTasks(appliedFilters);
      setTasks(Array.isArray(fetchedTasks) ? fetchedTasks : []); // Ensure tasks is an array
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskCreated = async (taskData) => {
    try {
      await createTask(taskData);
      loadTasks();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleTaskDeleted = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleTaskUpdated = async (id, updatedData) => {
    try {
      await updateTaskDetails(id, updatedData);
      loadTasks();
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleFilterSubmit = (submittedFilters) => {
    setFilters(submittedFilters);
    loadTasks(submittedFilters);
  };

  if (loading) {
    return <p>Fetching tasks...</p>;
  }

  return (
    <div className="task-page-container">
      <TaskPageBar onFilterSubmit={handleFilterSubmit} />
      <TaskCreateForm onTaskCreated={handleTaskCreated} />
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskBox
              key={task.id}
              taskData={task}
              onDelete={handleTaskDeleted}
              onUpdate={handleTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
}
