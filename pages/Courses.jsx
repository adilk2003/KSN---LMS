
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, BookOpen, CheckCircle, User, DollarSign, Clock } from 'lucide-react';
import { CourseCard } from '../components/CourseCard.jsx';
import { api } from '../services/api.js';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await api.data.getCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 min-h-screen pb-20 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Explore Courses</h1>
          <p className="text-slate-400 mt-1">Discover new skills for the future.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64 group z-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors duration-300" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-slate-500
              focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 focus:shadow-[0_0_20px_rgba(6,182,212,0.3)] focus:scale-105 origin-center
              transition-all duration-300 ease-out"
            />
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`p-3 rounded-full border transition-all ${isFilterOpen ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400' : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'}`}
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Filter Panel (Collapsible) */}
      <div className={`overflow-hidden transition-all duration-300 ${isFilterOpen ? 'max-h-60 mb-8 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          {['Category', 'Difficulty', 'Rating', 'Duration'].map((filter) => (
            <div key={filter}>
              <label className="text-sm text-slate-400 block mb-2">{filter}</label>
              <select className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white focus:outline-none focus:border-cyan-500/50">
                <option>All</option>
                <option>Option 1</option>
              </select>
            </div>
          ))}
          <div className="flex items-end">
            <button className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
              <X size={14} /> Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-white">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="h-[400px]">
              <CourseCard course={course} onClick={() => setSelectedCourse(course)} />
              <div className="mt-2 flex justify-between items-center px-2">
                 <span className="text-cyan-400 font-bold">{course.price > 0 ? `$${course.price}` : 'Free'}</span>
                 <button onClick={() => setSelectedCourse(course)} className="text-xs text-slate-400 hover:text-white underline">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Detail Modal */}
      <AnimatePresence>
        {selectedCourse && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setSelectedCourse(null)}
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors z-10">
                        <X size={20} />
                    </button>
                    
                    {/* Header Image */}
                    <div className="relative h-48 sm:h-64">
                        <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6">
                            <div className="flex gap-2 mb-2">
                                <span className="px-3 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full inline-block uppercase">{selectedCourse.category}</span>
                                <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full inline-block uppercase">{selectedCourse.difficulty}</span>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-1">{selectedCourse.title}</h2>
                            <p className="text-slate-300 flex items-center gap-2"><User size={16} /> {selectedCourse.instructor}</p>
                        </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-6">
                        <div className="flex flex-wrap gap-4 justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                             <div className="flex items-center gap-2 text-green-400 font-bold text-xl">
                                <DollarSign size={24} /> {selectedCourse.price > 0 ? selectedCourse.price : 'Free'}
                             </div>
                             <div className="flex items-center gap-2 text-slate-300">
                                <Clock size={20} /> <span>{selectedCourse.duration || `${selectedCourse.totalLessons || 0} Lessons`}</span>
                             </div>
                             <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-bold hover:shadow-lg transition-all">
                                Enroll Now
                             </button>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-3">About this Course</h3>
                            <p className="text-slate-400 leading-relaxed">{selectedCourse.description || "No description available."}</p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><BookOpen size={20} className="text-purple-400" /> Syllabus</h3>
                            <div className="space-y-3">
                                {(selectedCourse.syllabus || []).map((topic, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                                        <div className="mt-1 min-w-[24px] h-6 flex items-center justify-center bg-slate-700 rounded-full text-xs font-bold text-white">{i+1}</div>
                                        <p className="text-slate-300">{topic}</p>
                                    </div>
                                ))}
                                {(!selectedCourse.syllabus || selectedCourse.syllabus.length === 0) && (
                                    <p className="text-slate-500 italic">Syllabus coming soon.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};