
export const MOCK_COURSES = [
  {
    id: '1',
    title: 'Advanced AI Architectures',
    instructor: 'Dr. Sarah KSN',
    price: 49.99,
    thumbnail: 'https://picsum.photos/400/250?random=1',
    progress: 75,
    rating: 4.9,
    totalLessons: 24,
    category: 'Technology',
    difficulty: 'Advanced',
    matchScore: 98,
    description: 'Master the architecture of modern Artificial Intelligence systems. This course covers Transformers, GANs, and Reinforcement Learning strategies used in top tech companies.',
    syllabus: [
        'Introduction to Neural Architecture',
        'Transformer Models Deep Dive',
        'Generative Adversarial Networks',
        'Reinforcement Learning Basics',
        'Deploying AI Models'
    ]
  },
  {
    id: '2',
    title: 'Futuristic UI Design Principles',
    instructor: 'Alex Rivera',
    price: 39.99,
    thumbnail: 'https://picsum.photos/400/250?random=2',
    progress: 30,
    rating: 4.8,
    totalLessons: 18,
    category: 'Design',
    difficulty: 'Intermediate',
    matchScore: 85,
    description: 'Learn to design user interfaces for the next generation of web and AR/VR applications. Focus on glassmorphism, neon aesthetics, and spatial UI.',
    syllabus: [
        'Design Theory 2025',
        'Glassmorphism & Blur Effects',
        'Neon & Glow Aesthetics',
        'Micro-interactions with Framer',
        '3D Elements in UI'
    ]
  },
  {
    id: '3',
    title: 'Quantum Computing Basics',
    instructor: 'Prof. Chen',
    price: 0,
    thumbnail: 'https://picsum.photos/400/250?random=3',
    progress: 0,
    rating: 5.0,
    totalLessons: 40,
    category: 'Science',
    difficulty: 'Beginner',
    matchScore: 65,
    description: 'An introductory course to the world of Quantum Mechanics and Computing. Understand Qubits, Superposition, and Entanglement.',
    syllabus: [
        'Quantum Physics 101',
        'Qubits vs Bits',
        'Superposition Explained',
        'Quantum Gates',
        'Your First Quantum Algorithm'
    ]
  },
  {
    id: '4',
    title: 'Neural Networks 101',
    instructor: 'Jane Doe',
    price: 19.99,
    thumbnail: 'https://picsum.photos/400/250?random=4',
    progress: 10,
    rating: 4.5,
    totalLessons: 12,
    category: 'Technology',
    difficulty: 'Beginner',
    matchScore: 92,
    description: 'Start your journey into Deep Learning. Build your first Neural Network from scratch using Python.',
    syllabus: [
        'History of Neural Networks',
        'Perceptrons',
        'Backpropagation',
        'Activation Functions',
        'Building a Simple Net'
    ]
  },
  {
    id: '5',
    title: 'Cybersecurity Essentials',
    instructor: 'Mike Ross',
    price: 59.99,
    thumbnail: 'https://picsum.photos/400/250?random=5',
    progress: 100,
    rating: 4.7,
    totalLessons: 15,
    category: 'Security',
    difficulty: 'Intermediate',
    matchScore: 78,
    description: 'Protect systems from modern threats. Learn about ethical hacking, network security, and cryptography.',
    syllabus: [
        'Threat Landscape',
        'Network Protocols',
        'Cryptography Basics',
        'Web Application Security',
        'Incident Response'
    ]
  }
];

export const MOCK_ACHIEVEMENTS = [
  { id: '1', title: 'Fast Learner', description: 'Completed first course', icon: '⚡', dateEarned: '2023-10-15', rarity: 'Common' },
  { id: '2', title: 'Top 1% Quiz', description: 'Scored 100% on a hard quiz', icon: '🏆', dateEarned: '2023-11-02', rarity: 'Legendary' },
  { id: '3', title: 'Week Streak', description: 'Learned for 7 days in a row', icon: '🔥', dateEarned: '2023-11-20', rarity: 'Rare' },
  { id: '4', title: 'Code Warrior', description: 'Submitted 10 assignments', icon: '💻', dateEarned: '2023-12-05', rarity: 'Rare' },
  { id: '5', title: 'Early Bird', description: 'Completed a lesson before 6AM', icon: '🌅', dateEarned: '2023-12-10', rarity: 'Common' },
];

export const MOCK_LESSONS = [
  { id: '1', title: 'Introduction to the Course', duration: '05:20', completed: true, type: 'video' },
  { id: '2', title: 'Setting up the Environment', duration: '12:45', completed: true, type: 'video' },
  { id: '3', title: 'Understanding the Core Concepts', duration: '18:30', completed: false, type: 'video' },
  { id: '4', title: 'First Quiz: Basics', duration: '10:00', completed: false, type: 'quiz' },
  { id: '5', title: 'Advanced Topics', duration: '25:00', completed: false, type: 'video' },
];

export const CHART_DATA = [
  { name: 'Mon', hours: 2, score: 85 },
  { name: 'Tue', hours: 4.5, score: 90 },
  { name: 'Wed', hours: 3, score: 78 },
  { name: 'Thu', hours: 5, score: 95 },
  { name: 'Fri', hours: 4, score: 88 },
  { name: 'Sat', hours: 6, score: 98 },
  { name: 'Sun', hours: 2, score: 80 },
];

export const MOCK_LEADERBOARD = [
  { id: '1', name: 'Sarah Connor', avatar: 'https://picsum.photos/100/100?random=101', points: 15420, rank: 1, trend: 'up' },
  { id: '2', name: 'Alex K.', avatar: 'https://picsum.photos/100/100?random=100', points: 14200, rank: 2, trend: 'same' },
  { id: '3', name: 'John Wick', avatar: 'https://picsum.photos/100/100?random=102', points: 13850, rank: 3, trend: 'down' },
  { id: '4', name: 'Ellen Ripley', avatar: 'https://picsum.photos/100/100?random=103', points: 12100, rank: 4, trend: 'up' },
  { id: '5', name: 'Neo', avatar: 'https://picsum.photos/100/100?random=104', points: 11500, rank: 5, trend: 'same' },
];

export const MOCK_LIVE_CLASSES = [
  { id: '1', topic: 'AI Architecture Q&A', instructor: 'Dr. Sarah KSN', date: '2023-11-15', time: '10:00 AM', status: 'upcoming', link: '#' },
  { id: '2', topic: 'Live Coding: React Animations', instructor: 'Lisa Wang', date: '2023-11-16', time: '02:00 PM', status: 'upcoming', link: '#' },
];

export const MOCK_RECORDINGS = [
  { id: '101', topic: 'Intro to Quantum Physics', instructor: 'Prof. Chen', date: '2023-10-01', duration: '1h 15m', thumbnail: 'https://picsum.photos/400/220?random=20' },
  { id: '102', topic: 'Cybersecurity Trends 2024', instructor: 'Mike Ross', date: '2023-10-05', duration: '55m', thumbnail: 'https://picsum.photos/400/220?random=21' },
];