import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  Settings, 
  Award, 
  FileText, 
  LogOut,
  TrendingUp,
  ShieldAlert,
  Video,
  MessageSquare
} from 'lucide-react';
import { Logo } from './Logo.jsx';
import { api } from '../services/api.js';

export const Sidebar = ({ isOpen, toggle }) => {
  const user = api.auth.getCurrentUser();
  const isAdmin = user?.role === 'admin';

  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Courses', icon: BookOpen, path: '/courses' },
    { name: 'Live Classes', icon: Video, path: '/live-classes' },
    { name: 'My Learning', icon: TrendingUp, path: '/my-courses' },
    { name: 'Assignments', icon: FileText, path: '/tests' },
    { name: 'Grades', icon: Award, path: '/grades' },
    { name: 'Attendance', icon: Calendar, path: '/attendance' },
    { name: 'Chat', icon: MessageSquare, path: '/chat' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/50 bg-slate-900/90 backdrop-blur-xl ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center h-20 border-b border-slate-800/50">
        <Logo size={isOpen ? 'md' : 'sm'} showText={isOpen} />
      </div>

      <div className="py-4 overflow-y-auto h-[calc(100vh-5rem)]">
        <ul className="space-y-2 px-3">
          {isAdmin && (
             <li key="Admin">
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-all duration-200 mb-4 border border-red-500/20 ${
                    isActive 
                      ? 'bg-red-500/10 text-red-400' 
                      : 'text-red-400/80 hover:bg-red-500/10 hover:text-red-400'
                  }`
                }
              >
                <ShieldAlert size={22} className={`min-w-[22px] ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && <span className="font-medium whitespace-nowrap">Admin Panel</span>}
              </NavLink>
             </li>
          )}

          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <link.icon size={22} className={`min-w-[22px] ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && (
                  <span className="font-medium whitespace-nowrap">{link.name}</span>
                )}
              </NavLink>
            </li>
          ))}
          <li className="pt-4 mt-4 border-t border-slate-800">
             <NavLink
                to="/"
                className="flex items-center p-3 text-slate-400 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
              >
                <LogOut size={22} className={`min-w-[22px] ${isOpen ? 'mr-3' : 'mx-auto'}`} />
                {isOpen && <span className="font-medium">Logout</span>}
              </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};