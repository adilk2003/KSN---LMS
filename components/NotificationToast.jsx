
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { socketService } from '../services/socketService.js';

export const NotificationToast = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socketService.connect();
    
    socketService.subscribeToNotifications((data) => {
       const id = Date.now();
       setNotifications(prev => [...prev, { ...data, id }]);
       
       // Auto dismiss
       setTimeout(() => {
         setNotifications(prev => prev.filter(n => n.id !== id));
       }, 5000);
    });
  }, []);

  const removeNotif = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-24 right-6 z-50 flex flex-col gap-4">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-slate-800/90 backdrop-blur-md border border-slate-700 p-4 rounded-2xl shadow-2xl flex items-start gap-3 w-80"
          >
            <div className={`p-2 rounded-full ${
                n.type === 'success' ? 'bg-green-500/20 text-green-400' :
                n.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-cyan-500/20 text-cyan-400'
            }`}>
              {n.type === 'success' ? <CheckCircle size={18} /> :
               n.type === 'warning' ? <AlertTriangle size={18} /> :
               <Bell size={18} />}
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm">{n.title}</h4>
              <p className="text-slate-400 text-xs mt-1">{n.message}</p>
            </div>
            <button onClick={() => removeNotif(n.id)} className="text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
