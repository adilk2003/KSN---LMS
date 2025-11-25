import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Share2, MessageSquare, Users, Shield, Settings, LayoutGrid } from 'lucide-react';
import { api } from '../services/api.js';

export const LiveClassRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [participants, setParticipants] = useState(12);
  
  // Attendance Tracking
  const startTimeRef = useRef(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0); // in seconds

  useEffect(() => {
    // Fetch Class Details
    const fetchData = async () => {
      const cls = await api.liveClasses.getClassById(id);
      if (!cls) {
          // Fallback for demo/testing if ID doesn't exist in mock
          setClassData({
              topic: "Live Session",
              instructor: "Instructor",
              id: id
          });
      } else {
          setClassData(cls);
      }
    };
    fetchData();

    // Timer for UI
    startTimeRef.current = Date.now();
    const timer = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setElapsedTime(seconds);
    }, 1000);

    return () => clearInterval(timer);
  }, [id]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLeave = async () => {
    // Calculate Duration in Minutes
    const durationMinutes = (Date.now() - startTimeRef.current) / 1000 / 60;
    
    console.log(`Leaving class. Duration: ${durationMinutes.toFixed(2)} mins`);

    try {
        // Call API to mark attendance
        const result = await api.liveClasses.markLiveAttendance(id, durationMinutes);
        if (result.status === 'marked') {
            alert(`Class ended. Attendance Marked! ✅\nYou attended for ${Math.floor(durationMinutes)} mins.`);
        } else {
            alert(`Class ended. Attendance Not Marked ⚠️\n(Minimum 30 mins required. You attended ${durationMinutes.toFixed(1)} mins)`);
        }
    } catch (err) {
        console.error("Failed to mark attendance", err);
    }

    navigate('/live-classes');
  };

  if (!classData) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Connecting to Secure Room...</div>;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col">
      {/* Header / Top Bar */}
      <div className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6">
         <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-red-600/20 border border-red-500/50 px-3 py-1 rounded-full">
                 <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                 <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Live</span>
             </div>
             <div className="border-l border-slate-700 pl-4">
                 <h2 className="text-white font-bold">{classData.topic}</h2>
                 <p className="text-xs text-slate-400">Instructor: {classData.instructor}</p>
             </div>
         </div>

         <div className="flex items-center gap-4 text-slate-400 text-sm font-mono">
             <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg">
                 <Users size={14} /> {participants}
             </div>
             <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-lg">
                 <div className={`w-2 h-2 rounded-full ${elapsedTime > 5 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                 {formatTime(elapsedTime)}
             </div>
         </div>
      </div>

      {/* Main Video Grid */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden relative">
          
          {/* Main Speaker (Simulated Zoom UI) */}
          <div className="md:col-span-2 bg-slate-900 rounded-2xl relative overflow-hidden border border-slate-800 group">
              <img 
                 src="https://picsum.photos/1200/800?random=10" 
                 alt="Main Speaker" 
                 className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-white text-sm font-medium">
                  {classData.instructor} (Host)
              </div>
              
              {/* Watermark/Logo Overlay */}
              <div className="absolute top-4 right-4 opacity-50">
                  <Shield className="text-slate-500" size={32} />
              </div>
          </div>

          {/* Sidebar / Grid of other students */}
          <div className="hidden md:grid grid-rows-3 gap-4">
              {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-slate-800 rounded-2xl relative overflow-hidden border border-slate-700">
                      <img src={`https://picsum.photos/400/300?random=${i+20}`} alt="Student" className="w-full h-full object-cover opacity-60" />
                      <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-white text-xs">
                          Student {i}
                      </div>
                      <div className="absolute top-2 right-2 bg-slate-900/80 p-1 rounded-full">
                          <MicOff size={12} className="text-red-400" />
                      </div>
                  </div>
              ))}
              {/* Self View */}
              <div className="bg-slate-900 rounded-2xl relative overflow-hidden border-2 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                  {videoOn ? (
                       <img src="https://picsum.photos/400/300?random=99" alt="Me" className="w-full h-full object-cover" />
                  ) : (
                       <div className="w-full h-full flex items-center justify-center bg-slate-800">
                           <div className="w-16 h-16 rounded-full bg-cyan-600 flex items-center justify-center text-xl font-bold text-white">ME</div>
                       </div>
                  )}
                  <div className="absolute bottom-2 left-2 bg-cyan-600 px-2 py-0.5 rounded text-white text-xs font-bold">
                      You
                  </div>
              </div>
          </div>
      </div>

      {/* Footer Controls */}
      <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 relative">
          <button 
             onClick={() => setMicOn(!micOn)}
             className={`p-4 rounded-full transition-all ${micOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
          >
             {micOn ? <Mic size={20} /> : <MicOff size={20} />}
          </button>
          
          <button 
             onClick={() => setVideoOn(!videoOn)}
             className={`p-4 rounded-full transition-all ${videoOn ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-red-500/20 text-red-500 border border-red-500/50'}`}
          >
             {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
          </button>

          <div className="h-8 w-px bg-slate-700 mx-2"></div>

          <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all">
             <Share2 size={20} />
          </button>
          <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all">
             <MessageSquare size={20} />
          </button>
          <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all hidden sm:block">
             <LayoutGrid size={20} />
          </button>
          <button className="p-4 rounded-full bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-all hidden sm:block">
             <Settings size={20} />
          </button>

          <button 
             onClick={handleLeave}
             className="ml-4 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all flex items-center gap-2"
          >
             <PhoneOff size={20} />
             <span className="hidden sm:inline">Leave Class</span>
          </button>
      </div>
    </div>
  );
};