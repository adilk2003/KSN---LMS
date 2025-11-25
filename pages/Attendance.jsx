
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Check, X } from 'lucide-react';
import { api } from '../services/api.js';

export const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  
  useEffect(() => {
    api.data.getAttendance().then(setAttendanceData);
  }, []);

  const stats = {
    present: attendanceData.filter(d => d.status === 'present').length,
    absent: attendanceData.filter(d => d.status === 'absent').length,
    late: attendanceData.filter(d => d.status === 'late').length,
  };
  
  const attendancePercentage = Math.round((stats.present / (attendanceData.length || 1)) * 100);

  return (
    <div className="p-6 md:p-10 min-h-screen">
       <div className="mb-10">
          <h1 className="text-3xl font-bold text-white">Attendance Record</h1>
          <p className="text-slate-400 mt-1">October 2023</p>
       </div>

       {/* Overview Cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
             <div className="text-slate-400 text-sm mb-2">Attendance Rate</div>
             <div className="text-4xl font-bold text-white">{attendancePercentage}%</div>
             <div className="w-full bg-slate-700 h-1.5 mt-4 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full" style={{ width: `${attendancePercentage}%` }}></div>
             </div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
             <div className="text-slate-400 text-sm mb-2">Present</div>
             <div className="text-4xl font-bold text-green-400">{stats.present}</div>
             <div className="text-xs text-slate-500 mt-1">Days</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
             <div className="text-slate-400 text-sm mb-2">Absent</div>
             <div className="text-4xl font-bold text-red-400">{stats.absent}</div>
             <div className="text-xs text-slate-500 mt-1">Days</div>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
             <div className="text-slate-400 text-sm mb-2">Late</div>
             <div className="text-4xl font-bold text-yellow-400">{stats.late}</div>
             <div className="text-xs text-slate-500 mt-1">Days</div>
          </div>
       </div>

       {/* Calendar Grid View */}
       <div className="bg-slate-800/30 border border-slate-700 rounded-3xl p-6 md:p-8">
          <div className="grid grid-cols-7 gap-4 mb-4 text-center">
             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-slate-500 text-sm font-medium uppercase">{day}</div>
             ))}
          </div>
          <div className="grid grid-cols-7 gap-4">
             {/* Offset for start of month mock */}
             <div className="hidden md:block"></div> 
             <div className="hidden md:block"></div> 
             
             {attendanceData.map((day, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ delay: i * 0.02 }}
                   className={`aspect-square rounded-2xl border flex flex-col items-center justify-center relative group ${
                      day.status === 'present' ? 'bg-green-500/10 border-green-500/30' : 
                      day.status === 'absent' ? 'bg-red-500/10 border-red-500/30' : 
                      'bg-yellow-500/10 border-yellow-500/30'
                   }`}
                >
                   <span className="text-lg font-bold text-white">{new Date(day.date).getDate()}</span>
                   
                   <div className={`mt-1 ${
                      day.status === 'present' ? 'text-green-400' : 
                      day.status === 'absent' ? 'text-red-400' : 
                      'text-yellow-400'
                   }`}>
                      {day.status === 'present' ? <Check size={16} /> : day.status === 'absent' ? <X size={16} /> : <Clock size={16} />}
                   </div>

                   {/* Tooltip */}
                   <div className="absolute bottom-full mb-2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none capitalize">
                      {day.status}
                   </div>
                </motion.div>
             ))}
          </div>
       </div>
    </div>
  );
};