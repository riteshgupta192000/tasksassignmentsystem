import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://tasksassignmentsystem-api.onrender.com/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  return (
    <div className="task-list-container">
      <h2>Task List</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task._id} className="task-item">
            <div className="task-info">
              <h3 className="task-title">{task.title}</h3>
              <p><strong>Assignee:</strong> <span className="assignee-name">{task.assignee}</span></p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
            </div>
            <Link to={`/task-details/${task._id}`} className="view-details-button">View Details</Link>
          </div>
        ))
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
};

export default TaskList;
