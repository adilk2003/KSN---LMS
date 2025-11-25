import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar.jsx';
import { Home } from './pages/Home.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Auth } from './pages/Auth.jsx';
import { CoursePlayer } from './pages/CoursePlayer.jsx';
import { Courses } from './pages/Courses.jsx';
import { MyCourses } from './pages/MyCourses.jsx';
import { Assignments } from './pages/Assignments.jsx';
import { Grades } from './pages/Grades.jsx';
import { Attendance } from './pages/Attendance.jsx';
import { Settings } from './pages/Settings.jsx';
import { Pricing } from './pages/Pricing.jsx';
import { AdminDashboard } from './pages/AdminDashboard.jsx';
import { LiveClasses } from './pages/LiveClasses.jsx';
import { LiveClassRoom } from './pages/LiveClassRoom.jsx';
import { Chat } from './pages/Chat.jsx';
import { NotificationToast } from './components/NotificationToast.jsx';
import { api } from './services/api.js';
import { Menu, X, Bell, Search, LogOut, Crown } from 'lucide-react';

// --- Protected Layout Component ---
// Handles Sidebar, Header, and checks authentication
const ProtectedLayout = ({ requireAdmin }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const user = api.auth.getCurrentUser();

  const handleLogout = () => {
    api.auth.logout();
    navigate('/');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); 
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 1. Auth Check
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 2. Admin Check
  if (requireAdmin && user.role !== 'admin') {
     return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Header */}
      <header 
        className={`fixed top-0 right-0 z-30 h-20 transition-all duration-300 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-6 ${
          sidebarOpen ? 'left-64' : 'left-20'
        }`}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="hidden md:flex items-center relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
             <input 
               type="text" 
               placeholder="Jump to..."
               className="bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-cyan-500/50 w-64"
             />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/pricing')} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-orange-500/50 rounded-full text-orange-400 text-sm font-medium hover:bg-orange-500/20 transition-colors">
             <Crown size={14} /> <span>{user.plan === 'free' ? 'Upgrade Plan' : 'Pro Plan'}</span>
          </button>

          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-6 border-l border-slate-700">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role || 'Student'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[2px] cursor-pointer hover:scale-105 transition-transform group relative">
               <img 
                 src={user?.avatar || "https://picsum.photos/100/100"} 
                 alt="Profile" 
                 className="rounded-full w-full h-full border-2 border-slate-900 object-cover"
               />
               <div className="absolute right-0 top-full mt-2 w-32 bg-slate-800 rounded-lg shadow-xl py-2 hidden group-hover:block border border-slate-700">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 flex items-center gap-2">
                     <LogOut size={14} /> Logout
                  </button>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main 
        className={`pt-20 transition-all duration-300 min-h-screen ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Outlet /> {/* This renders the nested route component (Dashboard, Courses, etc) */}
      </main>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <HashRouter>
      <NotificationToast />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/pricing" element={<Pricing />} />

        {/* Protected Student Routes */}
        <Route element={<ProtectedLayout />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/courses" element={<Courses />} />
           <Route path="/course/:id" element={<CoursePlayer />} />
           <Route path="/my-courses" element={<MyCourses />} />
           <Route path="/tests" element={<Assignments />} />
           <Route path="/grades" element={<Grades />} />
           <Route path="/attendance" element={<Attendance />} />
           <Route path="/chat" element={<Chat />} />
           <Route path="/settings" element={<Settings />} />
           <Route path="/live-classes" element={<LiveClasses />} />
           <Route path="/live-room/:id" element={<LiveClassRoom />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedLayout requireAdmin={true} />}>
           <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
};

export default App;