
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Medal, Crown } from 'lucide-react';

export const Leaderboard = ({ users }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-3xl p-6 overflow-hidden relative">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-500/20 rounded-xl">
           <Trophy className="text-yellow-400" size={24} />
        </div>
        <h2 className="text-xl font-bold text-white">Top Learners</h2>
      </div>

      <div className="space-y-4">
        {users.map((user, index) => (
          <motion.div 
            key={user.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
              user.rank === 1 
                ? 'bg-gradient-to-r from-yellow-500/10 to-transparent border-yellow-500/30' 
                : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-8 h-8 font-bold text-slate-400">
                {user.rank === 1 ? <Crown size={20} className="text-yellow-400" /> : `#${user.rank}`}
              </div>
              <div className="relative">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-slate-700" />
                {user.rank <= 3 && (
                   <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border border-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-900 ${
                     user.rank === 1 ? 'bg-yellow-400' : user.rank === 2 ? 'bg-slate-300' : 'bg-orange-400'
                   }`}>
                     {user.rank}
                   </div>
                )}
              </div>
              <div>
                <h4 className={`font-medium ${user.rank === 1 ? 'text-yellow-400' : 'text-white'}`}>{user.name}</h4>
                <p className="text-xs text-slate-500">Student</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-cyan-400">{user.points.toLocaleString()} XP</p>
              {user.trend === 'up' && (
                <div className="flex items-center justify-end text-[10px] text-green-400">
                  <TrendingUp size={10} className="mr-1" />
                  <span>Rising</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl -z-10"></div>
    </div>
  );
};

export const AchievementBadge = ({ achievement }) => {
  const isRare = achievement.rarity === 'Rare';
  const isLegendary = achievement.rarity === 'Legendary';
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className={`relative group p-[1px] rounded-2xl overflow-hidden ${
        isLegendary 
          ? 'bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500' 
          : isRare 
            ? 'bg-gradient-to-tr from-cyan-400 to-blue-500' 
            : 'bg-slate-700'
      }`}
    >
      <div className="bg-slate-900 rounded-2xl p-4 h-full flex flex-col items-center justify-center text-center relative z-10">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 text-2xl bg-slate-800 shadow-inner ${
           isLegendary ? 'shadow-yellow-500/20' : isRare ? 'shadow-cyan-500/20' : ''
        }`}>
          {achievement.icon}
        </div>
        <h4 className={`font-bold text-sm mb-1 ${
           isLegendary ? 'text-yellow-400' : isRare ? 'text-cyan-400' : 'text-slate-200'
        }`}>
          {achievement.title}
        </h4>
        <p className="text-[10px] text-slate-500">{achievement.dateEarned}</p>
        
        {/* Rarity Label */}
        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
          isLegendary ? 'bg-yellow-500 animate-pulse' : isRare ? 'bg-cyan-500' : 'bg-slate-600'
        }`}></div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
    </motion.div>
  );
};