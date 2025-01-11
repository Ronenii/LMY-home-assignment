import { useState } from "react";
import { updateTaskStatus } from "../../services/taskService";

export default function TaskBox({ taskData: initialTaskData, onDelete, onUpdate }) {
  const [taskData, setTaskData] = useState(initialTaskData); // Current task state
  const [draftData, setDraftData] = useState(initialTaskData); // Editable draft state
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftData((prevState) => ({ ...prevState, [name]: value })); // Update only the draft
  };

  const toggleEditTaskDetails = () => {
    setDraftData(taskData); // Reset the draft to match the original task data
    setIsEditingDetails(!isEditingDetails);
  };

  const handleSubmit = async () => {
    try {
      const updatedTask = await onUpdate(taskData.id, {
        title: draftData.title,
        description: draftData.description,
        due_date: draftData.due_date
      });

      if (updatedTask) {
        setTaskData(updatedTask); // Update the current state with backend response
        setIsEditingDetails(false);
      } else {
        console.error("Task update failed: No updated task returned from the backend.");
      }
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
          <h5>Created at: {taskData.created_at}</h5>
        </div>
        {isEditingDetails ? (
          <div className="task-edit-form">
            <div className="task-title">
              <input
                type="text"
                name="title"
                value={draftData.title} // Use draft state for editing
                onChange={handleChange}
                placeholder="Task title"
              />
            </div>
            <div className="task-description">
              <textarea
                name="description"
                value={draftData.description} // Use draft state for editing
                onChange={handleChange}
                placeholder="Task Description"
              ></textarea>
            </div>
            <div className="task-due-date">
              <input
                type="date"
                name="due_date"
                value={draftData.due_date} // Use draft state for editing
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
              <h3>{taskData.title}</h3>
            </div>
            <div className="task-description"></div>
            <p>{taskData.description}</p>
            <div className="task-due-date">
              <h4>Due by: {taskData.due_date}</h4>
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
