
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Routes
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const uploadRoutes = require('./routes/upload');
const socketHandler = require('./socketHandler');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create HTTP server

// Middleware
// Allow any origin for Vercel deployment
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for production
    methods: ["GET", "POST"]
  }
});

// Initialize Socket Logic
socketHandler(io);

const PORT = process.env.PORT || 5000;

// DB Connection with Error Handling
const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/ksn_academy';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️  Server running without DB connection (Some features may fail)');
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', dataRoutes);
app.use('/api/upload', uploadRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('KSN Academy API is Running...');
});

server.listen(PORT, () => {
  console.log(`🚀 Server & Socket running on port ${PORT}`);
});
