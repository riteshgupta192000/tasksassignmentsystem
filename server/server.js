const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT=5000;

require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
   console.log("db connected");
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignee: String,
  dueDate: String,
  priority: String
});

const Task = mongoose.model('Task', taskSchema);

// CRUD Routes
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
});

app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});


app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.json(task);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// app.delete('/tasks/:id', async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id);
//   res.status(204).end();
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
