const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import Task model
const Task = require('./models/Task');

const app = express();
const PORT = 5000; // You can choose any port you prefer

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tasksdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// API Routes

// Create a new task
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single task by ID
app.get('/api/tasks/:id', getTask, (req, res) => {
  res.json(res.task);
});

// Update a task
app.put('/api/tasks/:id', getTask, async (req, res) => {
  Object.assign(res.task, req.body);
  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task
app.delete('/api/tasks/:id', getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get task by ID
async function getTask(req, res, next) {
  let task;
  try {
    task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.task = task;
  next();
}

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
