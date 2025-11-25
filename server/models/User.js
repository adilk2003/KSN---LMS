
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  avatar: { type: String, default: 'https://picsum.photos/100/100' },
  bio: { type: String, default: 'Passionate learner exploring AI and Design.' },
  
  // SaaS / Subscription Fields
  plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'free' },
  subscriptionStatus: { type: String, enum: ['active', 'inactive', 'canceled', 'past_due'], default: 'active' },
  billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
  subscriptionStartDate: { type: Date, default: Date.now },
  stripeCustomerId: { type: String }, // For future payment integration

  preferences: {
    language: { type: String, default: 'English' },
    darkMode: { type: Boolean, default: true },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      weeklyDigest: { type: Boolean, default: false },
      newCourses: { type: Boolean, default: true }
    }
  },
  achievements: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);