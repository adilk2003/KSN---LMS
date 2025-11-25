
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap, Crown, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo.jsx';
import { api } from '../services/api.js';

const PricingCard = ({ plan, billingCycle, onSelect, isPopular }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`relative p-8 rounded-3xl border ${isPopular ? 'bg-slate-800/80 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]' : 'bg-slate-900/50 border-slate-700'} flex flex-col h-full`}
  >
    {isPopular && (
       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
          Most Popular
       </div>
    )}
    
    <div className="mb-6">
       <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isPopular ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
          {plan.icon}
       </div>
       <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
       <p className="text-slate-400 text-sm h-10">{plan.description}</p>
    </div>

    <div className="mb-8">
       <div className="flex items-end">
          <span className="text-4xl font-bold text-white">${billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly}</span>
          <span className="text-slate-500 mb-1 ml-1">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
       </div>
       {billingCycle === 'yearly' && plan.priceMonthly > 0 && (
          <p className="text-green-400 text-xs mt-2">Save 20%</p>
       )}
    </div>

    <ul className="space-y-4 mb-8 flex-1">
       {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
             {feature.included ? <Check size={16} className="text-green-400 shrink-0" /> : <X size={16} className="text-slate-600 shrink-0" />}
             <span className={!feature.included ? 'text-slate-600' : ''}>{feature.text}</span>
          </li>
       ))}
    </ul>

    <button
      onClick={() => onSelect(plan)}
      className={`w-full py-3 rounded-xl font-bold transition-all ${
        isPopular 
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/25' 
          : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
      }`}
    >
      {plan.priceMonthly === 0 ? 'Get Started' : 'Subscribe Now'}
    </button>
  </motion.div>
);

export const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
    setLoading(true);
    // Simulate API call
    try {
        const user = api.auth.getCurrentUser();
        if(!user) {
            navigate('/auth');
            return;
        }
        await api.subscription.upgradePlan(plan.id, billingCycle);
        alert(`Successfully subscribed to ${plan.name}!`);
        navigate('/dashboard');
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      priceMonthly: 0,
      priceYearly: 0,
      description: 'Perfect for exploring and learning basics.',
      icon: <Shield size={24} />,
      features: [
        { text: 'Access to 3 free courses', included: true },
        { text: 'Basic Quizzes', included: true },
        { text: 'Community Support', included: true },
        { text: 'Course Certificates', included: false },
        { text: 'Offline Downloads', included: false },
        { text: '1-on-1 Mentorship', included: false },
      ]
    },
    {
      id: 'pro',
      name: 'Pro Learner',
      priceMonthly: 29,
      priceYearly: 290,
      description: 'Unlock your full potential with unlimited access.',
      icon: <Zap size={24} />,
      features: [
        { text: 'Access to all courses', included: true },
        { text: 'Advanced Projects & Labs', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Course Certificates', included: true },
        { text: 'Offline Downloads', included: true },
        { text: '1-on-1 Mentorship', included: false },
      ]
    },
    {
      id: 'enterprise',
      name: 'Masterclass',
      priceMonthly: 99,
      priceYearly: 990,
      description: 'For serious learners and teams.',
      icon: <Crown size={24} />,
      features: [
        { text: 'Access to all courses', included: true },
        { text: 'Advanced Projects & Labs', included: true },
        { text: 'Priority Support', included: true },
        { text: 'Course Certificates', included: true },
        { text: 'Offline Downloads', included: true },
        { text: '1-on-1 Mentorship', included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
       {/* Nav */}
       <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-10">
          <div onClick={() => navigate('/')}><Logo /></div>
          <button onClick={() => navigate('/auth')} className="text-sm font-medium hover:text-cyan-400">Login</button>
       </nav>

       {/* Background */}
       <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          <div className="text-center mb-16">
             <h1 className="text-5xl font-bold mb-6">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Learning Path</span></h1>
             <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">Unlock unlimited access to world-class education. Upgrade anytime as you grow.</p>
             
             {/* Toggle */}
             <div className="inline-flex bg-slate-800 p-1 rounded-full border border-slate-700">
                <button 
                   onClick={() => setBillingCycle('monthly')}
                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                   Monthly
                </button>
                <button 
                   onClick={() => setBillingCycle('yearly')}
                   className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'yearly' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                   Yearly
                </button>
             </div>
          </div>

          {loading && <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm"><div className="text-white font-bold">Processing Subscription...</div></div>}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {plans.map((plan, index) => (
                <PricingCard 
                   key={plan.id} 
                   plan={plan} 
                   billingCycle={billingCycle} 
                   isPopular={index === 1}
                   onSelect={handleSubscribe}
                />
             ))}
          </div>
       </div>
    </div>
  );
};