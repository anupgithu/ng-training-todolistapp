const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  assignedTo: { type: String, required: true },
  status: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  comments: { type: String },
});

module.exports = mongoose.model('Task', TaskSchema);
