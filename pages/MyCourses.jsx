
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, BookOpen, CheckCircle, Video, PlayCircle } from 'lucide-react';
import { MOCK_COURSES, MOCK_ACHIEVEMENTS, MOCK_LEADERBOARD } from '../constants.js';
import { CourseCard } from '../components/CourseCard.jsx';
import { AchievementBadge, Leaderboard } from '../components/Gamification.jsx';
import { api } from '../services/api.js';

export const MyCourses = () => {
  const [activeTab, setActiveTab] = useState('enrolled');
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
     api.liveClasses.getRecordings().then(setRecordings);
  }, []);

  const enrolledCourses = MOCK_COURSES.filter(c => c.progress < 100 && c.progress > 0);
  const completedCourses = MOCK_COURSES.filter(c => c.progress === 100);
  const recommendedCourses = MOCK_COURSES.filter(c => (c.matchScore || 0) > 85 && c.progress === 0).slice(0, 3);

  return (
    <div className="p-6 md:p-10 space-y-10 pb-20">
      {/* Header with Achievements Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <h1 className="text-3xl font-bold text-white mb-2">My Learning</h1>
           <p className="text-slate-400 mb-8">Track your progress and celebrate your achievements.</p>
           
           {/* Achievement Showcase */}
           <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                 <Award className="text-yellow-400" />
                 <h2 className="text-lg font-bold text-white">Recent Achievements</h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                 {MOCK_ACHIEVEMENTS.map(achievement => (
                    <div key={achievement.id} className="min-w-[120px]">
                       <AchievementBadge achievement={achievement} />
                    </div>
                 ))}
              </div>
           </div>
        </div>
        
        {/* Leaderboard Mini */}
        <div className="lg:col-span-1">
           <Leaderboard users={MOCK_LEADERBOARD.slice(0, 3)} />
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex space-x-6 border-b border-slate-700 mb-8 overflow-x-auto">
          <button 
             onClick={() => setActiveTab('enrolled')}
             className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'enrolled' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
             <div className="flex items-center gap-2">
                <BookOpen size={18} />
                Enrolled ({enrolledCourses.length})
             </div>
             {activeTab === 'enrolled' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
             )}
          </button>
          <button 
             onClick={() => setActiveTab('completed')}
             className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'completed' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
             <div className="flex items-center gap-2">
                <CheckCircle size={18} />
                Completed ({completedCourses.length})
             </div>
             {activeTab === 'completed' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
             )}
          </button>
          <button 
             onClick={() => setActiveTab('recordings')}
             className={`pb-4 px-2 text-sm font-medium transition-colors relative whitespace-nowrap ${activeTab === 'recordings' ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`}
          >
             <div className="flex items-center gap-2">
                <Video size={18} />
                Class Recordings
             </div>
             {activeTab === 'recordings' && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
             )}
          </button>
        </div>

        {/* Course Grid */}
        <motion.div 
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.3 }}
           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
           {activeTab === 'enrolled' && (
              enrolledCourses.map(course => (
                 <div key={course.id} className="h-[380px]">
                    <CourseCard course={course} />
                 </div>
              ))
           )}
           
           {activeTab === 'completed' && (
               completedCourses.length > 0 ? completedCourses.map(course => (
                 <div key={course.id} className="h-[380px]">
                    <CourseCard course={course} />
                 </div>
              )) : <p className="text-slate-500 col-span-full">No completed courses yet.</p>
           )}

           {activeTab === 'recordings' && (
               recordings.length > 0 ? recordings.map(rec => (
                   <div key={rec.id} className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all">
                       <div className="relative h-40">
                           <img src={rec.thumbnail} alt={rec.topic} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                               <PlayCircle size={48} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                           </div>
                           <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">{rec.duration}</div>
                       </div>
                       <div className="p-4">
                           <h3 className="font-bold text-white mb-1 line-clamp-1">{rec.topic}</h3>
                           <p className="text-sm text-slate-400">{rec.date} • {rec.instructor}</p>
                       </div>
                   </div>
               )) : <p className="text-slate-500 col-span-full">No recordings available.</p>
           )}
        </motion.div>
      </div>
    </div>
  );
};