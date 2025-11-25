
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true }, 
  dueDate: { type: String },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'Overdue'], default: 'Pending' },
  type: { type: String, enum: ['Essay', 'Quiz', 'Project', 'Lab'], default: 'Project' },
  score: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);