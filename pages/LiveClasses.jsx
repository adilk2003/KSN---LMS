
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Calendar, Clock, ExternalLink } from 'lucide-react';
import { api } from '../services/api.js';

export const LiveClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
       const data = await api.liveClasses.getUpcoming();
       setClasses(data);
       setLoading(false);
    };
    fetchClasses();
  }, []);

  return (
    <div className="p-6 md:p-10 min-h-screen pb-20">
       <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Live Classes</h1>
          <p className="text-slate-400 mt-1">Join scheduled sessions with your instructors.</p>
       </div>

       {loading ? <div className="text-white">Loading schedule...</div> : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.length === 0 && <p className="text-slate-500">No upcoming classes scheduled.</p>}
              {classes.map((cls, index) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 relative overflow-hidden group"
                  >
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Video size={64} className="text-purple-500" />
                      </div>

                      <div className="relative z-10">
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-bold rounded-full uppercase mb-4 inline-block">Upcoming</span>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{cls.topic}</h3>
                          <p className="text-slate-400 text-sm mb-6">Instructor: {cls.instructor}</p>
                          
                          <div className="space-y-3 mb-8">
                             <div className="flex items-center gap-3 text-slate-300">
                                 <Calendar size={18} className="text-cyan-400" />
                                 <span>{cls.date}</span>
                             </div>
                             <div className="flex items-center gap-3 text-slate-300">
                                 <Clock size={18} className="text-cyan-400" />
                                 <span>{cls.time}</span>
                             </div>
                          </div>

                          <a 
                             href={cls.link} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                          >
                             Join via Zoom <ExternalLink size={16} />
                          </a>
                      </div>
                  </motion.div>
              ))}
           </div>
       )}
    </div>
  );
};