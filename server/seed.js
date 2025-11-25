
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const Assignment = require('./models/Assignment');

dotenv.config();

const coursesData = [
  {
    title: 'Advanced AI Architectures',
    instructor: 'Dr. Sarah KSN',
    thumbnail: 'https://picsum.photos/400/250?random=1',
    progress: 75,
    rating: 4.9,
    totalLessons: 24,
    category: 'Technology',
    difficulty: 'Advanced',
    matchScore: 98
  },
  {
    title: 'Futuristic UI Design Principles',
    instructor: 'Alex Rivera',
    thumbnail: 'https://picsum.photos/400/250?random=2',
    progress: 30,
    rating: 4.8,
    totalLessons: 18,
    category: 'Design',
    difficulty: 'Intermediate',
    matchScore: 85
  },
  {
    title: 'Quantum Computing Basics',
    instructor: 'Prof. Chen',
    thumbnail: 'https://picsum.photos/400/250?random=3',
    progress: 0,
    rating: 5.0,
    totalLessons: 40,
    category: 'Science',
    difficulty: 'Beginner',
    matchScore: 65
  }
];

const assignmentsData = [
  { title: 'AI Ethics Essay', course: 'Advanced AI Architectures', dueDate: '2023-12-25', status: 'Pending', type: 'Essay' },
  { title: 'UI Component Library', course: 'Futuristic UI Design', dueDate: '2023-12-28', status: 'In Progress', type: 'Project' },
  { title: 'Neural Net Quiz', course: 'Neural Networks 101', dueDate: '2023-12-20', status: 'Overdue', type: 'Quiz' }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ksn_academy', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    await Course.deleteMany({});
    await Assignment.deleteMany({});

    await Course.insertMany(coursesData);
    await Assignment.insertMany(assignmentsData);

    console.log('✅ Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error Seeding Data:', err);
    process.exit(1);
  }
};

seedDB();