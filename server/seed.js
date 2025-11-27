
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
  // If no URI is provided in production, skip seeding to avoid build failure
  if (!process.env.MONGO_URI && process.env.NODE_ENV === 'production') {
    console.log('⚠️  Skipping Seed: No MONGO_URI provided in production.');
    process.exit(0);
  }

  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ksn_academy';

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of hanging
    });
    console.log('✅ Connected to MongoDB');

    await Course.deleteMany({});
    await Assignment.deleteMany({});

    await Course.insertMany(coursesData);
    await Assignment.insertMany(assignmentsData);

    console.log('✅ Data Seeded Successfully');
    process.exit();
  } catch (err) {
    console.warn('⚠️  Warning: Could not connect to MongoDB for seeding.');
    console.warn(`   Error: ${err.message}`);
    // Exit with success code (0) so deployment build processes don't fail
    process.exit(0);
  }
};

seedDB();
