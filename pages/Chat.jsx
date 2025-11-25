
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, Smile, Hash } from 'lucide-react';
import { api } from '../services/api.js';
import { socketService } from '../services/socketService.js';

export const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [onlineCount, setOnlineCount] = useState(1);
  const messagesEndRef = useRef(null);
  const user = api.auth.getCurrentUser();
  const room = 'global_chat';

  useEffect(() => {
    // 1. Connect
    const socket = socketService.connect();
    
    // 2. Join Room
    socketService.joinRoom(room);

    // 3. Listen for Messages
    socketService.subscribeToMessages((msg) => {
       setMessages(prev => [...prev, msg]);
       scrollToBottom();
    });

    // 4. Listen for Online Count
    socketService.subscribeToRoomData((data) => {
       if (data.room === room) {
         setOnlineCount(data.onlineCount);
       }
    });

    // Fetch history (mocking backend call)
    api.data.getMessages().then(hist => {
       // Convert DB message format to Socket message format if needed
       const formatted = hist.map(h => ({
         _id: h._id,
         text: h.text,
         senderName: h.sender.name,
         senderAvatar: h.sender.avatar,
         senderId: h.sender._id,
         createdAt: h.createdAt
       }));
       setMessages(formatted);
       scrollToBottom();
    });

    return () => {
      socketService.leaveRoom(room);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageData = {
      room,
      text: input,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
    };

    // Emit to Socket
    socketService.sendMessage(messageData);
    
    // Optimistic Update
    // setMessages(prev => [...prev, { ...messageData, createdAt: new Date().toISOString() }]);
    
    // Persist via API (optional if socket handler does it, but good for robust apps)
    await api.data.sendMessage(input, room);

    setInput('');
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-slate-900">
      {/* Sidebar Channels */}
      <div className="w-64 border-r border-slate-800 hidden md:flex flex-col bg-slate-800/30">
        <div className="p-6 border-b border-slate-800">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
             <Hash className="text-cyan-400" /> Channels
           </h2>
        </div>
        <div className="p-4 space-y-2">
           <div className="bg-slate-700/50 text-white p-3 rounded-xl flex items-center gap-2 cursor-pointer border border-cyan-500/30">
              <Hash size={18} className="text-cyan-400" />
              <span>General</span>
           </div>
           <div className="text-slate-400 p-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-800">
              <Hash size={18} />
              <span>Announcements</span>
           </div>
           <div className="text-slate-400 p-3 rounded-xl flex items-center gap-2 cursor-pointer hover:bg-slate-800">
              <Hash size={18} />
              <span>Q&A</span>
           </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/90 backdrop-blur-md">
           <div>
              <h3 className="text-white font-bold flex items-center gap-2"># General Chat</h3>
              <p className="text-xs text-slate-400">Discuss everything about KSN Academy</p>
           </div>
           <div className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20">
              <Users size={14} />
              {onlineCount} Online
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           {messages.map((msg, idx) => {
             const isMe = msg.senderId === user.id;
             return (
               <motion.div 
                 key={idx}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}
               >
                 <img src={msg.senderAvatar || 'https://picsum.photos/50'} alt="Avatar" className="w-10 h-10 rounded-full border border-slate-700" />
                 <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-sm font-bold text-slate-200">{msg.senderName}</span>
                       <span className="text-[10px] text-slate-500">{new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                       isMe 
                         ? 'bg-cyan-600 text-white rounded-tr-none' 
                         : 'bg-slate-800 text-slate-300 rounded-tl-none border border-slate-700'
                    }`}>
                       {msg.text}
                    </div>
                 </div>
               </motion.div>
             );
           })}
           <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-slate-800 bg-slate-900">
           <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-6 pr-14 text-white focus:border-cyan-500 outline-none shadow-lg"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-cyan-500 hover:bg-cyan-400 rounded-xl text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};
