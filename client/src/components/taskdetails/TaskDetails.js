import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './TaskDetails.css';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTask(data))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="task-details-container">
      <h2>Task Details</h2>
      <h3>{task.title}</h3>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Assignee:</strong> {task.assignee}</p>
      <p><strong>Due Date:</strong> {task.dueDate}</p>
      <p><strong>Priority:</strong> {task.priority}</p>
      <div className="task-details-actions">
        <Link to={`/update-task/${task._id}`} className="link-button">Update Task</Link>
        <Link to="/task-list" className="link-button">Back to Task List</Link>
      </div>
    </div>
  );
};

export default TaskDetails;
