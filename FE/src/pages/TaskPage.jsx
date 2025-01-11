import { useEffect, useState } from "react";
import TaskBox from "../cmps/task/TaskBox";
import { fetchTasks } from "../services/taskService";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchTasks);
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
    <div className="task-list">
      {tasks.map((task) => (
        <TaskBox key={task.id} taskData={task} />
      ))}
    </div>
  );
}
