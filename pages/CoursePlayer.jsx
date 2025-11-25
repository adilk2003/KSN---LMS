
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Lock, ChevronDown, MessageSquare, Eye } from 'lucide-react';
import { MOCK_LESSONS } from '../constants.js';
import { socketService } from '../services/socketService.js';

export const CoursePlayer = () => {
  const [activeLesson, setActiveLesson] = useState(MOCK_LESSONS[0]);
  const [openSections, setOpenSections] = useState([0]);
  const [viewers, setViewers] = useState(1);

  // Real-time presence for this specific course
  useEffect(() => {
    const room = `course_view_${activeLesson.id}`;
    
    socketService.connect();
    socketService.joinRoom(room);
    
    socketService.subscribeToRoomData((data) => {
        if (data.room === room) {
            setViewers(data.onlineCount);
        }
    });

    return () => {
        socketService.leaveRoom(room);
    };
  }, [activeLesson.id]);

  const toggleSection = (index) => {
    if (openSections.includes(index)) {
      setOpenSections(openSections.filter(i => i !== index));
    } else {
      setOpenSections([...openSections, index]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)] bg-slate-900 overflow-hidden">
      {/* Left: Video Player Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-black rounded-3xl overflow-hidden shadow-2xl aspect-video relative group">
          {/* Mock Video Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 bg-cyan-500/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <Play fill="white" className="ml-2 text-white" size={32} />
            </motion.button>
          </div>
          <img src={`https://picsum.photos/1200/800?random=${activeLesson.id}`} alt="Video Placeholder" className="w-full h-full object-cover opacity-60" />
          
          {/* Live Viewers Badge */}
          <div className="absolute top-4 left-4 bg-red-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 shadow-lg animate-pulse">
             <Eye size={14} />
             {viewers} Watching Now
          </div>

          {/* Video Controls Mock */}
          <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="h-1 bg-slate-700 rounded-full mb-4">
               <div className="h-full w-1/3 bg-cyan-500 rounded-full relative">
                 <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg scale-0 group-hover:scale-100 transition-transform"></div>
               </div>
            </div>
            <div className="flex justify-between text-white">
              <span>12:45 / 45:00</span>
              <div className="flex gap-4">
                 <span>CC</span>
                 <span>HD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-start">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2">{activeLesson.title}</h1>
               <p className="text-slate-400">Section 1 • Lesson {activeLesson.id}</p>
            </div>
             <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl text-slate-300 hover:text-white transition-colors">
               <MessageSquare size={18} />
               Discussion
             </button>
          </div>
          
          <div className="mt-8 border-t border-slate-800 pt-8">
            <h3 className="text-xl font-semibold text-white mb-4">About this lesson</h3>
            <p className="text-slate-400 leading-relaxed">
              In this lesson, we will explore the fundamental concepts behind the architecture. We'll start with a brief overview of the history and then dive deep into the technical specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Right: Course Content Sidebar */}
      <div className="w-full lg:w-96 bg-slate-850 border-l border-slate-800 flex flex-col h-full">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white">Course Content</h2>
          <div className="mt-2 w-full bg-slate-800 h-2 rounded-full overflow-hidden">
             <div className="bg-green-500 h-full w-[35%]"></div>
          </div>
          <p className="text-xs text-slate-400 mt-2">35% Completed</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3].map((section, idx) => (
            <div key={section} className="border-b border-slate-800">
              <button 
                onClick={() => toggleSection(idx)}
                className="w-full p-4 flex justify-between items-center bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-semibold text-slate-300 text-sm">Section {section}: Fundamentals</span>
                <ChevronDown size={16} className={`text-slate-400 transform transition-transform ${openSections.includes(idx) ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openSections.includes(idx) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {MOCK_LESSONS.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full p-4 flex gap-3 text-left hover:bg-slate-800/80 transition-colors ${activeLesson.id === lesson.id ? 'bg-cyan-500/10 border-r-2 border-cyan-500' : ''}`}
                      >
                        <div className="mt-1">
                          {lesson.completed ? (
                            <CheckCircle size={16} className="text-green-500" />
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 ${activeLesson.id === lesson.id ? 'border-cyan-500' : 'border-slate-600'}`}></div>
                          )}
                        </div>
                        <div>
                           <p className={`text-sm font-medium ${activeLesson.id === lesson.id ? 'text-cyan-400' : 'text-slate-300'}`}>
                             {lesson.id}. {lesson.title}
                           </p>
                           <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs text-slate-500">{lesson.duration}</span>
                             {lesson.type === 'quiz' && (
                               <span className="text-[10px] uppercase bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded">Quiz</span>
                             )}
                           </div>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
