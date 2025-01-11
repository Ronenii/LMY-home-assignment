import { useState } from "react";
import { updateTaskStatus } from "../../services/taskService";

export default function TaskBox({ taskData: initialTaskData, onDelete, onUpdate }) {
  const [taskData, setTaskData] = useState(initialTaskData);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTaskData({ ...taskData, [name]: value });
  };

  const toggleEditTaskDetails = () => {
    setIsEditingDetails(!isEditingDetails);
  };

  const handleSubmit = async () => {
    try {
      await onUpdate(taskData.id, {
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.due_date
      });
      setIsEditingDetails(false);
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(taskData.id);
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.checked ? "done" : "open";
    try {
      await updateTaskStatus(taskData.id, newStatus);
      setTaskData({ ...taskData, status: newStatus });
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  return (
    <section className="taskbox-container">
      <div className="task-details">
        <div className="task-creation-date">
          <h5>Created at: {initialTaskData.created_at}</h5>
        </div>
        {isEditingDetails ? (
          <div className="task-edit-form">
            <div className="task-title">
              <input
                type="text"
                name="title"
                value={initialTaskData.title}
                onChange={handleChange}
                placeholder="Task title"
              />
            </div>
            <div className="task-description">
              <textarea
                name="description"
                value={initialTaskData.description}
                onChange={handleChange}
                placeholder="Task Description"
              ></textarea>
            </div>
            <div className="task-due-date">
              <input
                type="text"
                name="dueDate"
                value={initialTaskData.due_date}
                onChange={handleChange}
              />
            </div>
            <div>
              <button onClick={toggleEditTaskDetails}>Cancel</button>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="task-presentation">
            <div className="task-title">
              <h3>{initialTaskData.title}</h3>
            </div>
            <div className="task-description"></div>
            <p>{initialTaskData.description}</p>
            <div className="task-due-date">
              <h4>Due by: {initialTaskData.due_date}</h4>
            </div>
            <div>
              <button onClick={toggleEditTaskDetails}>Edit details</button>
            </div>
          </div>
        )}
      </div>
      <div className="Task Status">
        <input type="checkbox" checked={taskData.status === "done"} onChange={handleStatusChange} />
      </div>
    </section>
  );
}
