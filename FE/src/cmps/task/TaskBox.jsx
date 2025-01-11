import { useState } from "react";

export default function TaskBox({ taskData: initialTaskData }) {
  const [taskData, setTaskData] = useState(initialTaskData);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTaskData({ ...taskData, [name]: value });
  };

  const toggleEditTaskDetails = () => {
    setIsEditingDetails(!isEditingDetails);
  };

  const handleSubmit = () => {
    // TODO: submit details to task service

    // await res, if successful the set editing details
    setIsEditingDetails(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked ? "done" : "open";
    setTaskData({ ...initialTaskData, status: newStatus });
    // TODO: use task service to submit changes.
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
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={toggleEditTaskDetails}>Cancel</button>
            </div>
          </div>
        ) : (
          <div clasName="task-presentation">
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
        <input
          type="checkbox"
          checked={taskData.status === "done"}
          onChange={handleStatusChange}
        />
      </div>
    </section>
  );
}
