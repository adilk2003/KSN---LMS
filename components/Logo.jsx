import React from 'react';
import { motion } from 'framer-motion';

export const Logo = ({ size = 'md', showText = true }) => {
  // Dimensions based on size prop
  const dimensions = size === 'sm' ? 32 : size === 'md' ? 40 : 64;
  
  // Text sizing
  const titleSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-3xl';
  const subTitleSize = size === 'sm' ? 'text-[0.6rem]' : size === 'md' ? 'text-xs' : 'text-sm';

  return (
    <div className="flex items-center gap-3 cursor-pointer select-none">
      <motion.div 
        className="relative flex items-center justify-center filter drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]"
        initial={{ rotate: -5, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        whileHover={{ scale: 1.1, rotate: 2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <svg width={dimensions} height={dimensions} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 1. Graduation Cap (Top) */}
          <path d="M10 25 L50 5 L90 25 L50 45 L10 25 Z" fill="#0f172a" stroke="#475569" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M90 25 V 45" stroke="#facc15" strokeWidth="2" strokeLinecap="round" /> {/* Tassel Line */}
          <circle cx="90" cy="48" r="2" fill="#facc15" /> {/* Tassel Ball */}

          {/* 2. Brain Circuits (Middle) */}
          {/* Left Hemisphere - Pink */}
          <path d="M25 45 C15 45 12 65 25 75 C35 80 48 75 48 60 V 45 H 25" fill="#1e293b" stroke="#ec4899" strokeWidth="2.5"/>
          <circle cx="28" cy="55" r="2.5" fill="#ec4899"/>
          <path d="M28 55 L36 60 L42 52" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Right Hemisphere - Cyan */}
          <path d="M75 45 C85 45 88 65 75 75 C65 80 52 75 52 60 V 45 H 75" fill="#1e293b" stroke="#06b6d4" strokeWidth="2.5"/>
          <circle cx="72" cy="55" r="2.5" fill="#06b6d4"/>
          <path d="M72 55 L64 60 L58 52" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>

          {/* 3. Tie (Center/Neck) */}
          <path d="M50 75 L42 84 L50 92 L58 84 L50 75" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="1"/>

          {/* 4. Open Book (Bottom) */}
          <path d="M15 88 C15 88 30 96 50 96 C70 96 85 88 85 88" stroke="#eab308" strokeWidth="3" strokeLinecap="round" fill="none"/>
          <path d="M50 96 V 88" stroke="#eab308" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
      
      {showText && (
        <div className="flex flex-col leading-none justify-center">
          <span className={`font-bold text-white tracking-tight ${titleSize}`}>KSN</span>
          <span className={`font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 tracking-widest uppercase ${subTitleSize}`}>
            Academy
          </span>
        </div>
      )}
    </div>
  );
};