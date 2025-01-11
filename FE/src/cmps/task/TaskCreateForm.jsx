import { useState } from "react";

export default function TaskCreateForm({ onTaskCreated }) {
  const [showForm, setShowForm] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await createTask(taskData);
      setShowForm(false); // Close the form
      setTaskData({ title: "", description: "", dueDate: "" }); // Reset form data
      onTaskCreated(); // Notify parent to refresh tasks
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Close the form
    setTaskData({ title: "", description: "", dueDate: "" }); // Reset form data
  };

  return (
    <div className="task-create-form-container">
      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="create-task-button">
          Create Task
        </button>
      ) : (
        <div className="task-create-form">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={taskData.title}
              onChange={handleChange}
              placeholder="Task title"
            />
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              placeholder="Task description"
            />
          </div>
          <div>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={taskData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="task-create-buttons">
            <button onClick={handleSubmit} className="submit-button">
              Submit
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
