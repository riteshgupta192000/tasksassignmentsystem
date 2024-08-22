import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {

  return (
    <div className="task-assignment-container">
      <h1>Welcome to the Task Assignment System</h1>
      <div className="navigation">
        <Link to="/add-task" className="nav-link">Add Task</Link>
        <Link to="/task-list" className="nav-link">Task List</Link>
      </div>
      <p>Manage and track tasks efficiently. Use the navigation links to add new tasks or view and manage existing ones.</p>
    </div>
  );
};

export default Home;
