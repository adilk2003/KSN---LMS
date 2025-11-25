
const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: String, required: true },
  assessment: { type: String, required: true },
  score: { type: Number, required: true },
  maxScore: { type: Number, default: 100 },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);