
import React, { useState } from 'react';
import { User, Bell, Lock, Eye, Moon, Globe, LogOut } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="space-y-8">
         {/* Profile Section */}
         <section className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <User className="text-cyan-400" /> Account Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-sm text-slate-400">Full Name</label>
                  <input type="text" defaultValue="Alex K." className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
               </div>
               <div className="space-y-2">
                  <label className="text-sm text-slate-400">Email</label>
                  <input type="email" defaultValue="student@ksn.com" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-colors" />
               </div>
               <div className="col-span-full">
                  <label className="text-sm text-slate-400 block mb-2">Bio</label>
                  <textarea className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none h-24 transition-colors" defaultValue="Passionate learner exploring AI and Design." />
               </div>
            </div>
            <div className="mt-6 flex justify-end">
               <button className="px-6 py-2 bg-cyan-600 rounded-xl text-white font-medium hover:bg-cyan-500 transition-colors">Save Changes</button>
            </div>
         </section>

         {/* Preferences */}
         <section className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Globe className="text-purple-400" /> Preferences
            </h2>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                     <h3 className="font-medium text-white">Language</h3>
                     <p className="text-sm text-slate-400">Select your preferred language</p>
                  </div>
                  <select className="bg-slate-900 border border-slate-700 text-white px-3 py-2 rounded-lg outline-none">
                     <option>English</option>
                     <option>Spanish</option>
                     <option>French</option>
                  </select>
               </div>
               <div className="flex items-center justify-between">
                  <div>
                     <h3 className="font-medium text-white">Dark Mode</h3>
                     <p className="text-sm text-slate-400">Toggle application theme</p>
                  </div>
                  <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
               </div>
            </div>
         </section>
         
         {/* Notifications */}
         <section className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
               <Bell className="text-yellow-400" /> Notifications
            </h2>
            <div className="space-y-4">
               {['Email Notifications', 'Push Notifications', 'Weekly Digest', 'New Course Alerts'].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                     <div className="w-5 h-5 rounded border border-slate-600 bg-slate-900 flex items-center justify-center group-hover:border-cyan-500">
                        <div className="w-3 h-3 bg-cyan-500 rounded-sm opacity-100"></div>
                     </div>
                     <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </label>
               ))}
            </div>
         </section>

         <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors">
               <LogOut size={20} /> Sign Out of All Devices
            </button>
         </div>
      </div>
    </div>
  );
};