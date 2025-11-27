
import { MOCK_COURSES, MOCK_LIVE_CLASSES, MOCK_RECORDINGS } from '../constants.js';

// If VITE_API_URL is set (Production), use it. Otherwise use localhost (Development).
// Note: We append '/api' because the backend routes start with /api
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${BASE_URL}/api`;

// ENABLE MOCK MODE BY DEFAULT
// This ensures the app works immediately in preview or if backend is down.
const MOCK_MODE = true; 

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getAuthHeader = () => {
  const session = JSON.parse(localStorage.getItem('ksn_session'));
  return session ? { 'Authorization': `Bearer ${session.token || 'mock-token'}` } : {};
};

// Initialize Local Storage for dynamic data if empty
if (!localStorage.getItem('ksn_courses')) {
    localStorage.setItem('ksn_courses', JSON.stringify(MOCK_COURSES));
}
if (!localStorage.getItem('ksn_live_classes')) {
    localStorage.setItem('ksn_live_classes', JSON.stringify(MOCK_LIVE_CLASSES));
}
if (!localStorage.getItem('ksn_recordings')) {
    localStorage.setItem('ksn_recordings', JSON.stringify(MOCK_RECORDINGS));
}

// Helper to fetch from backend with fallback to mock
const fetchAPI = async (endpoint, options = {}) => {
    try {
        const headers = { 
            'Content-Type': 'application/json', 
            ...getAuthHeader(),
            ...options.headers 
        };
        
        const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
        if (!res.ok) throw new Error(`API Error: ${res.statusText}`);
        return await res.json();
    } catch (error) {
        console.warn(`Backend connection failed (${endpoint}), falling back to mock/local data.`, error);
        throw error; // Let the caller handle fallback or error
    }
};

export const api = {
  auth: {
    login: async (email, password) => {
      if (!MOCK_MODE) {
          try {
              const res = await fetch(`${API_URL}/auth/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
              });
              const data = await res.json();
              if(res.ok) {
                  localStorage.setItem('ksn_session', JSON.stringify(data.user));
                  return data;
              }
              throw new Error(data.message);
          } catch(e) {
              // Fallthrough to mock if server is down
              console.log("Server unreachable, trying mock login...");
          }
      }

      // --- MOCK FALLBACK ---
      await delay(800);
      const users = JSON.parse(localStorage.getItem('ksn_users') || '[]');
      
      // --- ADMIN CREDENTIALS ---
      if (email === 'admin@ksn.com' && password === 'admin') {
         const adminUser = {
           id: 'admin-1',
           name: 'System Admin',
           email: 'admin@ksn.com',
           role: 'admin',
           plan: 'enterprise',
           avatar: 'https://picsum.photos/100/100?random=admin'
         };
         localStorage.setItem('ksn_session', JSON.stringify(adminUser));
         return { user: adminUser, token: 'mock-admin-token' };
      }

      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        localStorage.setItem('ksn_session', JSON.stringify(user));
        return { user, token: 'mock-jwt-token' };
      }
      
      // Default mock student
      if (email === 'student@ksn.com' && password === 'password') {
        const mockUser = { 
          id: 'default', 
          name: 'Alex K.', 
          email, 
          role: 'student',
          plan: 'free',
          bio: 'Passionate learner exploring AI and Design.',
          preferences: {
            language: 'English',
            darkMode: true
          }
        };
        localStorage.setItem('ksn_session', JSON.stringify(mockUser));
        return { user: mockUser, token: 'mock-jwt-token' };
      }

      throw new Error('Invalid credentials');
    },
    
    register: async (userData) => {
        if (!MOCK_MODE) {
            try {
                const res = await fetch(`${API_URL}/auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const data = await res.json();
                if(res.ok) {
                    localStorage.setItem('ksn_session', JSON.stringify(data.user));
                    return data;
                }
            } catch(e) {}
        }
        
        // Mock Register
        await delay(800);
        const users = JSON.parse(localStorage.getItem('ksn_users') || '[]');
        if (users.find(u => u.email === userData.email)) {
            throw new Error('User already exists');
        }
        const newUser = { ...userData, id: Date.now().toString(), role: 'student', plan: 'free', bio: 'New Student' };
        users.push(newUser);
        localStorage.setItem('ksn_users', JSON.stringify(users));
        localStorage.setItem('ksn_session', JSON.stringify(newUser));
        return { user: newUser, token: 'mock-jwt-token' };
    },

    getCurrentUser: () => {
      return JSON.parse(localStorage.getItem('ksn_session'));
    },

    logout: () => {
      localStorage.removeItem('ksn_session');
    }
  },

  data: {
    getCourses: async () => {
        if(!MOCK_MODE) {
            try { return await fetchAPI('/courses'); } catch(e) {}
        }
        await delay(400);
        return JSON.parse(localStorage.getItem('ksn_courses'));
    },
    getAssignments: async () => {
        if(!MOCK_MODE) {
             try { return await fetchAPI('/assignments'); } catch(e) {}
        }
        await delay(600);
        return [
            { id: 1, title: 'AI Ethics Essay', course: 'Advanced AI Architectures', dueDate: '2023-12-25', status: 'Pending', type: 'Essay', link: 'https://docs.google.com/forms/u/0/' },
            { id: 2, title: 'UI Component Library', course: 'Futuristic UI Design', dueDate: '2023-12-28', status: 'In Progress', type: 'Project', link: 'https://docs.google.com/forms/u/0/' },
            { id: 3, title: 'Neural Net Quiz', course: 'Neural Networks 101', dueDate: '2023-12-20', status: 'Overdue', type: 'Quiz', link: 'https://docs.google.com/forms/u/0/' },
            { id: 4, title: 'Weekly Assessment 4', course: 'React Native', dueDate: '2023-12-30', status: 'Pending', type: 'Quiz', link: 'https://docs.google.com/forms/u/0/' }
        ];
    },
    getGrades: async () => {
        if(!MOCK_MODE) {
             try { return await fetchAPI('/grades'); } catch(e) {}
        }
        await delay(500);
        return [
            { id: 1, course: 'Quantum Computing', assessment: 'Mid-Term', score: 88, maxScore: 100, date: '2023-10-15' },
            { id: 2, course: 'Cybersecurity', assessment: 'Lab 1', score: 95, maxScore: 100, date: '2023-10-20' },
        ];
    },
    getAttendance: async () => {
        if(!MOCK_MODE) {
             try { return await fetchAPI('/attendance'); } catch(e) {}
        }
        await delay(400);
        const days = [];
        const today = new Date();
        for(let i=1; i<=30; i++) {
            const status = Math.random() > 0.8 ? (Math.random() > 0.5 ? 'absent' : 'late') : 'present';
            days.push({ date: new Date(today.getFullYear(), today.getMonth(), i), status });
        }
        return days;
    },
    getMessages: async () => {
        if(!MOCK_MODE) {
             try { return await fetchAPI('/messages'); } catch(e) {}
        }
        return [];
    },
    sendMessage: async (text, chatId) => {
        if(!MOCK_MODE) {
             try { return await fetchAPI('/messages', { method: 'POST', body: JSON.stringify({text, chatId}) }); } catch(e) {}
        }
        return {};
    }
  },

  liveClasses: {
      getUpcoming: async () => {
          await delay(500);
          return JSON.parse(localStorage.getItem('ksn_live_classes'));
      },
      getClassById: async (id) => {
          await delay(300);
          const classes = JSON.parse(localStorage.getItem('ksn_live_classes') || '[]');
          return classes.find(c => c.id === id);
      },
      scheduleClass: async (classData) => {
          await delay(600);
          const classes = JSON.parse(localStorage.getItem('ksn_live_classes') || '[]');
          const newClass = { ...classData, id: Date.now().toString(), status: 'upcoming' };
          classes.push(newClass);
          localStorage.setItem('ksn_live_classes', JSON.stringify(classes));
          return newClass;
      },
      getRecordings: async () => {
          await delay(500);
          return JSON.parse(localStorage.getItem('ksn_recordings'));
      },
      markLiveAttendance: async (classId, durationMinutes) => {
          console.log(`📡 Marking attendance: Class ${classId}, Duration: ${durationMinutes.toFixed(2)} mins`);
          if (durationMinutes >= 30) { 
              console.log("✅ Attendance Marked: PRESENT (User stayed > 30 mins)");
              return { status: 'marked', message: 'Attendance recorded successfully' };
          } else {
              console.log("⚠️ Attendance Not Marked: Duration too short");
              return { status: 'skipped', message: 'Duration too short for attendance' };
          }
      }
  },

  subscription: {
    upgradePlan: async (planId, cycle) => {
        await delay(1000);
        const user = JSON.parse(localStorage.getItem('ksn_session'));
        user.plan = planId;
        user.billingCycle = cycle;
        localStorage.setItem('ksn_session', JSON.stringify(user));
        return user;
    },
    getAdminStats: async () => {
        await delay(800);
        return {
            totalRevenue: 125000,
            activeSubs: 1240,
            newUsers: 156,
            churnRate: 2.4,
            users: [
                { id: 1, name: 'Jane Cooper', email: 'jane@example.com', plan: 'pro', role: 'student' },
                { id: 2, name: 'Wade Warren', email: 'wade@example.com', plan: 'enterprise', role: 'student' },
                { id: 3, name: 'Esther Howard', email: 'esther@example.com', plan: 'free', role: 'student' },
            ]
        };
    }
  },

  admin: {
    getBatches: async () => {
        await delay(400);
        return [
            { id: 1, name: 'Batch A - AI Foundations', students: 45, status: 'Active' },
            { id: 2, name: 'Batch B - UI/UX Design', students: 32, status: 'Active' },
        ];
    },
    getStudents: async () => {
        await delay(500);
        return [
            { id: 's1', name: 'John Doe', email: 'john@ksn.com', batch: 'Batch A', status: 'Active' },
            { id: 's2', name: 'Jane Smith', email: 'jane@ksn.com', batch: 'Batch A', status: 'Active' },
        ];
    },
    createTest: async (testData) => {
        await delay(800);
        return { success: true };
    },
    markAttendance: async (batchId, date, records) => {
        await delay(800);
        return { success: true };
    },
    addCourse: async (courseData) => {
        await delay(600);
        const courses = JSON.parse(localStorage.getItem('ksn_courses') || '[]');
        const newCourse = { 
            ...courseData, 
            id: Date.now().toString(), 
            progress: 0, 
            rating: 4.5, 
            matchScore: 80 
        };
        courses.push(newCourse);
        localStorage.setItem('ksn_courses', JSON.stringify(courses));
        return newCourse;
    },
    updateCourse: async (id, courseData) => {
        await delay(600);
        let courses = JSON.parse(localStorage.getItem('ksn_courses') || '[]');
        courses = courses.map(c => c.id === id ? { ...c, ...courseData } : c);
        localStorage.setItem('ksn_courses', JSON.stringify(courses));
        return courseData;
    },
    deleteCourse: async (id) => {
        await delay(600);
        let courses = JSON.parse(localStorage.getItem('ksn_courses') || '[]');
        courses = courses.filter(c => c.id !== id);
        localStorage.setItem('ksn_courses', JSON.stringify(courses));
        return { success: true };
    }
  }
};
