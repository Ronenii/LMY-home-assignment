import { useEffect, useState } from "react";
import TaskBox from "../cmps/task/TaskBox";
import { fetchAllTasks } from "../services/taskService";
import TaskPageBar from "../cmps/task/TaskPageBar";
import TaskCreateForm from "../cmps/task/TaskCreateForm";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllTasks = async () => {
    setLoading(true);
    const fetchedTasks = await fetchAllTasks();
    setTasks(fetchedTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const onTaskCreated = () => {
    fetchAllTasks();
  };

  if (loading) {
    return <p>Fetching tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <div className="task-page-container">
      <TaskPageBar /> {/* Directly include the TaskPageBar component */}
      <TaskCreateForm onTaskCreated={onTaskCreated} />
      <div className="task-list">
        {tasks.map((task) => (
          <TaskBox key={task.id} taskData={task} />
        ))}
      </div>
    </div>
  );
}
