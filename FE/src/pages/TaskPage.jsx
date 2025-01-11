import { useEffect, useState } from "react";
import TaskBox from "../cmps/task/TaskBox";
import { fetchTasks } from "../services/taskService";
import TaskPageBar from "../cmps/task/TaskPageBar";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
      setLoading(false);
    };
    getTasks();
  }, []);

  if (loading) {
    return <p>Fetching tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  return (
    <div className="task-page-container">
      <TaskPageBar /> {/* Directly include the TaskPageBar component */}
      <div className="task-list">
        {tasks.map((task) => (
          <TaskBox key={task.id} taskData={task} />
        ))}
      </div>
    </div>
  );
}
