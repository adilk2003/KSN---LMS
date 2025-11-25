
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Users, Activity, TrendingUp, Search, MoreVertical, 
  Layers, FileText, Calendar, AlertTriangle, BookOpen, Edit, Trash, Plus, Video, Image, Clock, BarChart, UploadCloud
} from 'lucide-react';
import { api } from '../services/api.js';
import { uploadService } from '../services/uploadService.js';
import { useNavigate } from 'react-router-dom';

const TabButton = ({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium ${
      active 
        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Course Editor State
  const [editingCourse, setEditingCourse] = useState(null); 
  const [uploading, setUploading] = useState(false);
  const [courseForm, setCourseForm] = useState({ 
    title: '', 
    instructor: '', 
    price: 0, 
    category: '', 
    description: '', 
    syllabus: '',
    thumbnail: '',
    difficulty: 'Beginner',
    totalLessons: 0,
    duration: ''
  });

  const [liveClassForm, setLiveClassForm] = useState({ topic: '', date: '', time: '', link: '' });

  const navigate = useNavigate();
  const currentUser = api.auth.getCurrentUser();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
        navigate('/dashboard');
        return;
    }
    fetchInitialData();
  }, [currentUser, navigate]);

  const fetchInitialData = async () => {
    try {
        const adminStats = await api.subscription.getAdminStats();
        setStats(adminStats);
        setUsers(adminStats.users || []);
        
        const batchData = await api.admin.getBatches();
        setBatches(batchData);

        const studentData = await api.admin.getStudents();
        setStudents(studentData);

        const courseData = await api.data.getCourses();
        setCourses(courseData);
    } catch (e) {
        console.error("Failed to load admin data", e);
    } finally {
        setLoading(false);
    }
  };

  const handleEditCourse = (course) => {
      setEditingCourse(course);
      setCourseForm({
          title: course.title,
          instructor: course.instructor,
          price: course.price || 0,
          category: course.category,
          description: course.description || '',
          syllabus: course.syllabus ? course.syllabus.join('\n') : '',
          thumbnail: course.thumbnail || '',
          difficulty: course.difficulty || 'Beginner',
          totalLessons: course.totalLessons || 10,
          duration: course.duration || '4 Weeks'
      });
  };

  const handleCreateCourse = () => {
      setEditingCourse({});
      setCourseForm({ 
        title: '', instructor: '', price: 0, category: '', 
        description: '', syllabus: '', thumbnail: '',
        difficulty: 'Beginner', totalLessons: 10, duration: '4 Weeks'
      });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    setUploading(true);
    try {
        const url = await uploadService.uploadFile(file);
        setCourseForm(prev => ({ ...prev, thumbnail: url }));
    } catch(err) {
        alert("Upload Failed");
    } finally {
        setUploading(false);
    }
  };

  const handleSaveCourse = async (e) => {
      e.preventDefault();
      const syllabusArray = courseForm.syllabus.split('\n').filter(s => s.trim() !== '');
      const payload = { ...courseForm, syllabus: syllabusArray };
      
      if (!payload.thumbnail) {
          payload.thumbnail = `https://picsum.photos/400/250?random=${Date.now()}`;
      }

      try {
          if (editingCourse.id) {
              await api.admin.updateCourse(editingCourse.id, payload);
          } else {
              await api.admin.addCourse(payload);
          }
          setEditingCourse(null);
          const updatedCourses = await api.data.getCourses();
          setCourses(updatedCourses);
      } catch (err) {
          console.error("Error saving course", err);
      }
  };

  const handleDeleteCourse = async (id) => {
      if(window.confirm("Are you sure you want to delete this course?")) {
          await api.admin.deleteCourse(id);
          const updatedCourses = await api.data.getCourses();
          setCourses(updatedCourses);
      }
  };

  const handleScheduleClass = async (e) => {
      e.preventDefault();
      try {
          await api.liveClasses.scheduleClass({ ...liveClassForm, instructor: currentUser.name });
          alert("Class Scheduled!");
          setLiveClassForm({ topic: '', date: '', time: '', link: '' });
      } catch (err) {
          console.error(err);
      }
  };

  if (loading) return <div className="p-10 text-white">Loading Admin Data...</div>;

  return (
    <div className="p-6 md:p-10 pb-20">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-slate-400">Logged in as: <span className="text-cyan-400 font-semibold">{currentUser?.email}</span></p>
        </div>
        <div className="hidden md:block px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold rounded-full uppercase tracking-wider">
            Admin Access Only
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-800 pb-6">
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={Activity} label="Overview" />
        <TabButton active={activeTab === 'courses'} onClick={() => setActiveTab('courses')} icon={BookOpen} label="Courses" />
        <TabButton active={activeTab === 'live'} onClick={() => setActiveTab('live')} icon={Video} label="Live Classes" />
        <TabButton active={activeTab === 'students'} onClick={() => setActiveTab('students')} icon={Users} label="Students" />
        <TabButton active={activeTab === 'batches'} onClick={() => setActiveTab('batches')} icon={Layers} label="Batches" />
        <TabButton active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={Calendar} label="Attendance" />
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { title: 'Total Revenue', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'text-green-400' },
                    { title: 'Active Subscriptions', value: stats.activeSubs, icon: Activity, color: 'text-cyan-400' },
                    { title: 'New Users (Mo)', value: `+${stats.newUsers}`, icon: Users, color: 'text-purple-400' },
                    { title: 'Churn Rate', value: `${stats.churnRate}%`, icon: TrendingUp, color: 'text-red-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-slate-900 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                        </div>
                        <h3 className="text-slate-400 text-sm mb-1">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'courses' && (
            <div>
                {editingCourse ? (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 max-w-4xl mx-auto">
                        <div className="flex justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">{editingCourse.id ? 'Edit Course' : 'Create New Course'}</h2>
                            <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white">Cancel</button>
                        </div>
                        <form onSubmit={handleSaveCourse} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><BookOpen size={16}/> Course Title</label>
                                    <input required type="text" value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Advanced AI" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><Users size={16}/> Instructor Name</label>
                                    <input required type="text" value={courseForm.instructor} onChange={e => setCourseForm({...courseForm, instructor: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Dr. Smith" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><DollarSign size={16}/> Price ($)</label>
                                    <input type="number" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: parseFloat(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><Layers size={16}/> Category</label>
                                    <input type="text" value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. Technology" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><BarChart size={16}/> Difficulty</label>
                                    <select value={courseForm.difficulty} onChange={e => setCourseForm({...courseForm, difficulty: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none">
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><Clock size={16}/> Duration</label>
                                    <input type="text" value={courseForm.duration} onChange={e => setCourseForm({...courseForm, duration: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" placeholder="e.g. 12 Weeks / 40 Hours" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><BookOpen size={16}/> Total Lessons</label>
                                    <input type="number" value={courseForm.totalLessons} onChange={e => setCourseForm({...courseForm, totalLessons: parseInt(e.target.value)})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm text-slate-400 flex items-center gap-2"><Image size={16}/> Thumbnail Image</label>
                                    <div className="flex gap-2">
                                        <input type="text" value={courseForm.thumbnail} readOnly className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-400" />
                                        <label className="flex items-center justify-center px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer text-white transition-colors">
                                            <UploadCloud size={20} />
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                        </label>
                                    </div>
                                    {uploading && <p className="text-xs text-cyan-400 animate-pulse">Uploading...</p>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Description</label>
                                <textarea value={courseForm.description} onChange={e => setCourseForm({...courseForm, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none h-24" placeholder="Course overview..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-slate-400">Syllabus (One topic per line)</label>
                                <textarea value={courseForm.syllabus} onChange={e => setCourseForm({...courseForm, syllabus: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none h-40" placeholder="Week 1: Intro&#10;Week 2: Basics..." />
                            </div>
                            <div className="pt-4">
                                <button type="submit" disabled={uploading} className="px-8 py-3 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-colors w-full md:w-auto disabled:opacity-50">Save Course</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">Available Courses</h2>
                            <button onClick={handleCreateCourse} className="flex items-center gap-2 px-4 py-2 bg-cyan-600 rounded-xl text-white text-sm font-medium hover:bg-cyan-500">
                                <Plus size={16} /> Add New Course
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                                    <tr>
                                        <th className="p-6">Title</th>
                                        <th className="p-6">Instructor</th>
                                        <th className="p-6">Price</th>
                                        <th className="p-6">Category</th>
                                        <th className="p-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-700/50">
                                    {courses.map(course => (
                                        <tr key={course.id} className="hover:bg-slate-700/20">
                                            <td className="p-6 text-white font-medium">
                                                <div className="flex items-center gap-3">
                                                    <img src={course.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-700" />
                                                    {course.title}
                                                </div>
                                            </td>
                                            <td className="p-6 text-slate-300">{course.instructor}</td>
                                            <td className="p-6 text-cyan-400">${course.price || 0}</td>
                                            <td className="p-6 text-slate-400">
                                                <span className="bg-slate-700 px-2 py-1 rounded text-xs">{course.category}</span>
                                            </td>
                                            <td className="p-6 flex justify-end gap-3">
                                                <button onClick={() => handleEditCourse(course)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"><Edit size={18} /></button>
                                                <button onClick={() => handleDeleteCourse(course.id)} className="p-2 hover:bg-red-500/20 rounded-lg text-slate-400 hover:text-red-400"><Trash size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        )}

        {activeTab === 'live' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-1 bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
                     <h2 className="text-xl font-bold text-white mb-6">Schedule Live Class</h2>
                     <form onSubmit={handleScheduleClass} className="space-y-4">
                        <div className="space-y-2">
                             <label className="text-sm text-slate-400">Topic</label>
                             <input required type="text" value={liveClassForm.topic} onChange={e => setLiveClassForm({...liveClassForm, topic: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm text-slate-400">Date</label>
                             <input required type="date" value={liveClassForm.date} onChange={e => setLiveClassForm({...liveClassForm, date: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm text-slate-400">Time</label>
                             <input required type="time" value={liveClassForm.time} onChange={e => setLiveClassForm({...liveClassForm, time: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" />
                        </div>
                        <div className="space-y-2">
                             <label className="text-sm text-slate-400">Zoom/Meeting Link</label>
                             <input required type="url" value={liveClassForm.link} onChange={e => setLiveClassForm({...liveClassForm, link: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none" placeholder="https://zoom.us/..." />
                        </div>
                        <button type="submit" className="w-full py-3 bg-cyan-600 rounded-xl text-white font-bold hover:bg-cyan-500 transition-colors">Schedule Class</button>
                     </form>
                 </div>
                 
                 <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-3xl p-8">
                     <h2 className="text-xl font-bold text-white mb-6">Upcoming Schedule</h2>
                     <div className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 text-center text-slate-400">
                         <p>Scheduled classes will appear here and on the student's "Live Classes" page.</p>
                     </div>
                 </div>
            </div>
        )}

        {activeTab === 'students' && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
                        <tr>
                            <th className="p-6">Name</th>
                            <th className="p-6">Batch</th>
                            <th className="p-6">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-slate-700/20">
                                <td className="p-6 font-medium text-white">{student.name}</td>
                                <td className="p-6 text-slate-300">{student.batch}</td>
                                <td className="p-6 text-green-400">{student.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        {activeTab === 'batches' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {batches.map((batch) => (
                    <div key={batch.id} className="bg-slate-800/50 border border-slate-700 p-6 rounded-3xl">
                        <h3 className="text-xl font-bold text-white mb-2">{batch.name}</h3>
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">{batch.status}</span>
                    </div>
                ))}
            </div>
        )}

        {activeTab === 'attendance' && (
             <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-8 text-center">
                 <p className="text-slate-400">Attendance Management Module</p>
             </div>
        )}
      </motion.div>
    </div>
  );
};
