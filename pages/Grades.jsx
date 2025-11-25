
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Download, Share2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { api } from '../services/api.js';

export const Grades = () => {
  const [grades, setGrades] = useState([]);
  
  useEffect(() => {
     api.data.getGrades().then(setGrades);
  }, []);

  const calculateGPA = () => {
     if(grades.length === 0) return 0;
     const total = grades.reduce((acc, curr) => acc + curr.score, 0);
     return (total / grades.length / 25).toFixed(2); // Mock GPA calc
  };

  return (
    <div className="p-6 md:p-10 min-h-screen pb-20">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
         <div>
            <h1 className="text-3xl font-bold text-white">Academic Performance</h1>
            <p className="text-slate-400 mt-1">Track your scores and GPA.</p>
         </div>
         <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white border border-slate-700">
               <Download size={16} /> Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white border border-slate-700">
               <Share2 size={16} /> Share
            </button>
         </div>
       </div>

       {/* Stats Row */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-purple-900/50 to-slate-900 border border-purple-500/30 p-6 rounded-3xl relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Overall GPA</p>
                <h2 className="text-4xl font-bold text-white">{calculateGPA()}</h2>
                <div className="mt-2 text-green-400 text-sm flex items-center gap-1">
                   <TrendingUp size={14} /> +0.2 from last term
                </div>
             </div>
             <Award className="absolute -bottom-4 -right-4 text-purple-500/20 w-32 h-32" />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Credits Earned</p>
                <h2 className="text-4xl font-bold text-white">24<span className="text-xl text-slate-500">/120</span></h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Total Assessments</p>
                <h2 className="text-4xl font-bold text-white">{grades.length}</h2>
          </motion.div>
       </div>

       {/* Grades Table */}
       <motion.div 
         initial={{ opacity: 0 }} 
         animate={{ opacity: 1 }} 
         transition={{ delay: 0.3 }}
         className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl overflow-hidden"
       >
          <div className="overflow-x-auto">
             <table className="w-full text-left">
                <thead className="bg-slate-800/80 text-slate-400 text-xs uppercase tracking-wider">
                   <tr>
                      <th className="p-6">Course</th>
                      <th className="p-6">Assessment</th>
                      <th className="p-6">Date</th>
                      <th className="p-6">Score</th>
                      <th className="p-6">Grade</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                   {grades.map((grade) => (
                      <tr key={grade.id} className="hover:bg-slate-700/20 transition-colors">
                         <td className="p-6 font-medium text-white">{grade.course}</td>
                         <td className="p-6 text-slate-300">{grade.assessment}</td>
                         <td className="p-6 text-slate-400 text-sm">{grade.date}</td>
                         <td className="p-6 font-bold text-white">{grade.score} / {grade.maxScore}</td>
                         <td className="p-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                               grade.score >= 90 ? 'bg-green-500/10 text-green-400 border-green-500/30' :
                               grade.score >= 80 ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' :
                               'bg-red-500/10 text-red-400 border-red-500/30'
                            }`}>
                               {grade.score >= 90 ? 'A' : grade.score >= 80 ? 'B' : 'C'}
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </motion.div>
    </div>
  );
};