
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String },
  difficulty: { type: String },
  matchScore: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  totalLessons: { type: Number, default: 0 },
  lessons: [{
    title: String,
    duration: String,
    completed: { type: Boolean, default: false },
    type: { type: String, enum: ['video', 'quiz'], default: 'video' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);