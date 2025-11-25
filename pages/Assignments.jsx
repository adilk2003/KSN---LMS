
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Clock, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { api } from '../services/api.js';

export const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await api.data.getAssignments();
        setAssignments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-400 bg-green-500/10 border-green-500/30';
      case 'In Progress': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Overdue': return 'text-red-400 bg-red-500/10 border-red-500/30';
      default: return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30';
    }
  };

  const handleStartTest = (link) => {
    if (link) {
        window.open(link, '_blank');
    } else {
        alert("Link not available for this task.");
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen pb-20">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Assignments & Tests</h1>
          <p className="text-slate-400 mt-1">Manage your tasks and deadlines.</p>
        </div>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:text-white transition-colors">History</button>
           <button className="px-4 py-2 bg-cyan-600 rounded-lg text-white hover:bg-cyan-500 transition-colors">Upcoming</button>
        </div>
      </div>

      {loading ? (
         <div className="text-slate-400">Loading assignments...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 hover:shadow-lg hover:shadow-cyan-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-xl ${
                   assignment.type === 'Quiz' ? 'bg-purple-500/20 text-purple-400' : 
                   assignment.type === 'Essay' ? 'bg-blue-500/20 text-blue-400' : 
                   'bg-orange-500/20 text-orange-400'
                }`}>
                  <FileText size={20} />
                </div>
                <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{assignment.title}</h3>
              <p className="text-sm text-slate-400 mb-4">{assignment.course}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                {assignment.status === 'Overdue' && (
                  <div className="flex items-center gap-1 text-red-400">
                    <AlertCircle size={14} />
                    <span>Late</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
                 {assignment.status === 'Completed' ? (
                   <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle size={18} />
                      <span className="font-semibold">Score: {assignment.score}%</span>
                   </div>
                 ) : (
                   <button 
                    onClick={() => handleStartTest(assignment.link)}
                    className="w-full py-2 rounded-xl bg-slate-700 hover:bg-cyan-600 text-white transition-all flex items-center justify-center gap-2"
                   >
                      {assignment.status === 'In Progress' ? 'Continue' : 'Start Task'}
                      {assignment.link && <ExternalLink size={14} />}
                   </button>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};