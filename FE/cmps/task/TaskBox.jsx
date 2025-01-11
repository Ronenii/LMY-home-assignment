import { useState } from "react";

export default function TaskBox({ taskData }) {
  const [taskData, setTaskData] = useState(taskData);
  const [isEditingDetails, setIsEditingDetails] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableTaskData({ ...editableTaskData, [name]: value });
  };

  const toggleEditTaskDetails = () => {
    setIsEditingDetails(!isEditingDetails);
  };

  return (
    <section className="taskbox-container">
      <div className="task-details">
        {isEditingDetails ? (
          <div className="task-edit-form">
            <div className="task-title">
              <input
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleChange}
                placeholder="Task title"
              />
            </div>
            <div className="task-description">
              <textarea
                name="description"
                value={taskData.description}
                onChange={handleChange}
                placeholder="Task Description"
              ></textarea>
            </div>
            <div className="task-due-date">
              <input
                type="text"
                name="dueDate"
                value={taskData.dueDate}
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
              <h3>{taskData.title}</h3>
            </div>
            <div className="task-description"></div>
            <p>{taskData.description}</p>
            <div className="task-due-date">
              <h4>{taskData.dueDate}</h4>
            </div>
            <div>
              <button onClick={toggleEditTaskDetails}>Edit details</button>
            </div>
          </div>
        )}
      </div>
      <div className="Task Status">
        <checkbox />
      </div>
    </section>
  );
}
