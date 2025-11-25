
import React from 'react';
import { motion } from 'framer-motion';
import { Star, User, BookOpen, Sparkles } from 'lucide-react';

export const CourseCard = ({ course, onClick, showMatch = false }) => {
  return (
    <motion.div
      className="group relative w-full h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-75 blur transition duration-500 group-hover:duration-200 ${showMatch && course.matchScore && course.matchScore > 85 ? 'bg-gradient-to-r from-green-400 to-cyan-500' : 'bg-gradient-to-r from-cyan-500 to-purple-600'}`}></div>
      <div className="relative h-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col">
        {/* Thumbnail with Parallax/Zoom effect */}
        <div className="relative h-48 overflow-hidden">
          <motion.img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
          
          <div className="absolute top-4 right-4 bg-slate-900/60 backdrop-blur-md px-3 py-1 rounded-full border border-slate-700">
            <span className="text-xs font-semibold text-cyan-400">{course.difficulty}</span>
          </div>

          {/* AI Match Badge */}
          {showMatch && course.matchScore && (
            <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-green-500/50 flex items-center gap-1 shadow-[0_0_10px_rgba(34,197,94,0.3)]">
              <Sparkles size={12} className="text-green-400" />
              <span className="text-xs font-bold text-green-400">{course.matchScore}% Match</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">{course.category}</span>
              <div className="flex items-center space-x-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-slate-300">{course.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {course.title}
            </h3>

            <div className="flex items-center text-slate-400 text-sm mb-4">
              <User size={14} className="mr-2" />
              <span>{course.instructor}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            {/* Glassmorphic Progress Bar */}
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <motion.div 
                className={`h-full bg-gradient-to-r ${showMatch && course.matchScore && course.matchScore > 85 ? 'from-green-400 to-cyan-500' : 'from-cyan-500 to-purple-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center mt-4 text-slate-500 text-xs">
              <BookOpen size={12} className="mr-1" />
              <span>{course.totalLessons} Lessons</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};