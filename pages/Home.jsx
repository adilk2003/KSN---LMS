
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle, Shield, Globe } from 'lucide-react';
import { Logo } from '../components/Logo.jsx';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Features', 'Pricing', 'Contact'].map((item) => (
                  <button 
                    key={item} 
                    onClick={() => item === 'Pricing' ? navigate('/pricing') : null}
                    className="relative group px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button 
                onClick={() => navigate('/auth')}
                className="px-6 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-cyan-500/50 transition-all duration-300"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Learning is Here
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            Experience education reimagined. KSN Academy combines immersive technology with world-class curriculum to unlock your potential.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <button 
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-300 flex items-center justify-center group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
              <PlayCircle className="mr-2 text-purple-400" />
              Watch Demo
            </button>
          </motion.div>
        </div>

        {/* Hero Visual */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 relative z-10">
          <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-500 rounded-[3rem] blur-xl opacity-30 transform rotate-6"></div>
            <div className="relative bg-slate-800 border border-slate-700 p-2 rounded-[2.5rem] shadow-2xl">
               <img 
                 src="https://picsum.photos/600/400?random=10" 
                 alt="Dashboard Preview" 
                 className="rounded-[2rem] shadow-inner"
               />
               
               {/* Floating Badge */}
               <motion.div 
                 initial={{ x: 50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1 }}
                 className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-3"
               >
                 <div className="p-2 bg-green-500/20 rounded-full">
                   <Shield className="text-green-400" size={20} />
                 </div>
                 <div>
                   <p className="text-xs text-slate-400">Verified</p>
                   <p className="font-bold text-white">Certificate Earned</p>
                 </div>
               </motion.div>

               <motion.div 
                 initial={{ x: -50, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: 1.2 }}
                 className="absolute -top-6 -right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-3"
               >
                 <div className="p-2 bg-purple-500/20 rounded-full">
                   <Globe className="text-purple-400" size={20} />
                 </div>
                 <div>
                   <p className="text-xs text-slate-400">Community</p>
                   <p className="font-bold text-white">10k+ Students</p>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};