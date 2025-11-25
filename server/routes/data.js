
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Assignment = require('../models/Assignment');
const Grade = require('../models/Grade');
const Attendance = require('../models/Attendance');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Private
router.get('/courses', protect, async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/assignments
// @desc    Get all assignments
// @access  Private
router.get('/assignments', protect, async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/grades
// @desc    Get user grades
// @access  Private
router.get('/grades', protect, async (req, res) => {
  try {
    const grades = await Grade.find({ user: req.user.id });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/attendance
// @desc    Get user attendance
// @access  Private
router.get('/attendance', protect, async (req, res) => {
  try {
    const attendance = await Attendance.find({ user: req.user.id }).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/messages
// @desc    Get chat messages
// @access  Private
router.get('/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find({ chatId: 'general' })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/messages
// @desc    Send a message
// @access  Private
router.post('/messages', protect, async (req, res) => {
  try {
    const { text, chatId } = req.body;
    const message = await Message.create({
      sender: req.user.id,
      text,
      chatId: chatId || 'general'
    });
    const fullMessage = await Message.findById(message._id).populate('sender', 'name avatar');
    res.status(201).json(fullMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;