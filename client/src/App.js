import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/Home';
import AddTask from './components/addtask/AddTask';
import TaskList from './components/tasklist/TaskList';
import TaskDetails from './components/taskdetails/TaskDetails';
import UpdateTask from './components/updatetask/UpdateTask';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
  }, []);

  const addNewTask = (task) => {
    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(newTask => setTasks([...tasks, newTask]));
  };

  const updateTask = (updatedTask, id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(response => response.json())
      .then(updated => {
        setTasks(tasks.map(task => (task._id === id ? updated : task)));
      });
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-task" element={<AddTask addTask={addNewTask} />} />
          <Route path="/task-list" element={<TaskList tasks={tasks} />} />
          <Route path="/task-details/:id" element={<TaskDetails tasks={tasks} />} />
          <Route path="/update-task/:id" element={<UpdateTask tasks={tasks} updateTask={updateTask} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
