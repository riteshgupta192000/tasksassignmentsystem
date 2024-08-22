import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './UpdateTask.css';

const UpdateTask = ({ updateTask }) => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://tasksassignmentsystem-api.onrender.com/tasks/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch task data');
        }
        return response.json();
      })
      .then(data => {
        setTask(data);
        setTaskTitle(data.title);
        setDescription(data.description);
        setAssignee(data.assignee);
        setDueDate(data.dueDate);
        setPriority(data.priority);
      })
      .catch(error => setError(error.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      title: taskTitle,
      description,
      assignee,
      dueDate,
      priority,
    };

    fetch(`https://tasksassignmentsystem-api.onrender.com/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update task');
        }
        return response.json();
      })
      .then(() => {
        updateTask(updatedTask, id);
        navigate('/task-list');
      })
      .catch(error => setError(error.message));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="update-task-container">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Task Title:</label>
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Assignee:</label>
          <input
            type="text"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit" className="update-task-button">Update Task</button>
      </form>
    </div>
  );
};

export default UpdateTask;
