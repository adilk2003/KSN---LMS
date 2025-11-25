
import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, Book, Award, Activity, Sparkles } from 'lucide-react';
import { CHART_DATA, MOCK_COURSES, MOCK_LEADERBOARD } from '../constants.js';
import { CourseCard } from '../components/CourseCard.jsx';
import { Leaderboard } from '../components/Gamification.jsx';

const StatCard = ({ title, value, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 relative overflow-hidden group"
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
      <Icon size={64} />
    </div>
    <div className="relative z-10">
      <div className={`p-3 rounded-2xl w-fit mb-4 ${color.replace('text-', 'bg-').replace('500', '500/20')}`}>
        <Icon size={24} className={color} />
      </div>
      <h3 className="text-slate-400 font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  </motion.div>
);

export const Dashboard = () => {
  // Filter courses for recommendations (simulating AI engine: score > 80 and not completed)
  const recommendedCourses = MOCK_COURSES.filter(c => (c.matchScore || 0) > 80 && c.progress < 100).slice(0, 3);

  return (
    <div className="p-6 md:p-10 space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome back, User! Here's your learning progress.</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-slate-800 rounded-full text-sm text-slate-300 border border-slate-700">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Courses in Progress" value="4" icon={Book} color="text-cyan-400" delay={0.1} />
        <StatCard title="Total Hours" value="126h" icon={Clock} color="text-purple-400" delay={0.2} />
        <StatCard title="Certificates" value="7" icon={Award} color="text-yellow-400" delay={0.3} />
        <StatCard title="Avg Score" value="92%" icon={Activity} color="text-green-400" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="xl:col-span-2 space-y-8">
           {/* AI Recommendations Section */}
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
           >
             <div className="flex items-center gap-2 mb-6">
               <Sparkles className="text-cyan-400" />
               <h2 className="text-xl font-bold text-white">Recommended For You</h2>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {recommendedCourses.map((course) => (
                 <div key={course.id} className="h-[350px]">
                   <CourseCard course={course} showMatch={true} />
                 </div>
               ))}
             </div>
           </motion.div>

           {/* Activity Chart */}
           <motion.div 
             className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 }}
           >
             <h2 className="text-xl font-bold text-white mb-6">Learning Activity</h2>
             <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={CHART_DATA}>
                   <defs>
                     <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                   <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }} 
                     itemStyle={{ color: '#22d3ee' }}
                   />
                   <Area type="monotone" dataKey="score" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
           </motion.div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-8">
           {/* Leaderboard Widget */}
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.6 }}
           >
             <Leaderboard users={MOCK_LEADERBOARD} />
           </motion.div>

           {/* Weekly Progress Bar Chart */}
           <motion.div 
             className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.7 }}
           >
             <h2 className="text-xl font-bold text-white mb-6">Study Hours</h2>
             <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={CHART_DATA}>
                   <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                   <XAxis dataKey="name" stroke="#64748b" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} />
                   <Tooltip 
                     cursor={{fill: '#334155', opacity: 0.2}}
                     contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }} 
                   />
                   <Bar dataKey="hours" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={30} />
                 </BarChart>
               </ResponsiveContainer>
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
};