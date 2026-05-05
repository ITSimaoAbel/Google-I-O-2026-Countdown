/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Calendar, Monitor, Sparkles, MapPin, ArrowRight, Zap, Globe, Cpu } from 'lucide-react';

// --- Constants ---
const TARGET_DATE = new Date('2026-05-19T09:55:00-07:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// --- Components ---

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: [
              '#4285F4', // Blue
              '#EA4335', // Red
              '#FBBC04', // Yellow
              '#34A853', // Green
            ][i % 4],
            filter: 'blur(80px)',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const Digit = ({ value, label }: { value: number; label: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-20 sm:h-28 md:h-40 w-16 sm:w-24 md:w-32 flex items-center justify-center bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 group">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 60, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -60, opacity: 0, rotateX: 90 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className={`font-display font-bold text-4xl sm:text-6xl md:text-7xl ${
              label === 'Days' ? 'text-google-blue' :
              label === 'Hours' ? 'text-google-red' :
              label === 'Minutes' ? 'text-google-yellow' :
              'text-google-green'
            }`}
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
        
        {/* Decorative corner element */}
        <div className={`absolute top-0 right-0 w-6 h-6 opacity-10 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden`}>
           <div className={`absolute -top-3 -right-3 w-10 h-10 rotate-45 ${
             label === 'Days' ? 'bg-google-blue' :
             label === 'Hours' ? 'bg-google-red' :
             label === 'Minutes' ? 'bg-google-yellow' :
             'bg-google-green'
           }`} />
        </div>
      </div>
      <span className="mt-3 font-sans font-medium text-slate-500 uppercase tracking-widest text-[10px] sm:text-xs">
        {label}
      </span>
    </div>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [prepLogs, setPrepLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate preparation logs
  useEffect(() => {
    const logPool = [
      "Optimizing Gemini Pro 2.0 endpoints...",
      "Configuring Shoreline Amphitheatre main stage lighting...",
      "Syncing Flutter 4.0 alpha release notes...",
      "Preparing 'I/O Photo Booth' with generative AI backgrounds...",
      "Testing Android 17 'Vanilla Ice Cream' preview builds...",
      "Calibrating Project Starline sensors...",
      "Warming up the TPU v6 clusters...",
      "Polishing material design 4.0 guidelines...",
      "Deploying I/O Connect global event schedules...",
      "Readying the developer keynote demo rigs..."
    ];

    const interval = setInterval(() => {
      setPrepLogs(prev => {
        const next = [...prev, `[${new Date().toLocaleTimeString()}] ${logPool[Math.floor(Math.random() * logPool.length)]}`];
        return next.slice(-4);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return (
    <div className="h-screen w-full flex items-center justify-center bg-slate-50">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-google-blue border-t-transparent rounded-full"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen font-sans selection:bg-google-blue selection:text-white">
      <GeometricBackground />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-0.5">
              <div className="w-3 h-3 rounded-full bg-google-blue" />
              <div className="w-3 h-3 rounded-full bg-google-red" />
              <div className="w-3 h-3 rounded-full bg-google-yellow" />
              <div className="w-3 h-3 rounded-full bg-google-green" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">I/O <span className="font-light">2026</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-google-blue transition-colors">Program</a>
            <a href="#" className="hover:text-google-blue transition-colors">Community</a>
            <a href="#" className="hover:text-google-blue transition-colors">FAQ</a>
            <button className="bg-slate-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition-all active:scale-95">
              Register now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl mx-auto pt-16 px-6">
        <div className="flex flex-col items-center text-center space-y-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-8xl md:text-[9rem] font-display font-bold leading-none tracking-tighter"
          >
            Vibe <span className="text-gradient">I/O</span>
          </motion.h1>

          {/* Countdown Container - Centered and tight */}
          <section className="w-full">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto">
              <Digit value={timeLeft.days} label="Days" />
              <Digit value={timeLeft.hours} label="Hours" />
              <Digit value={timeLeft.minutes} label="Minutes" />
              <Digit value={timeLeft.seconds} label="Seconds" />
            </div>
          </section>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-xl sm:text-2xl text-slate-600 leading-relaxed font-light"
          >
            Join us at the 
            <span className="font-medium text-slate-900 mx-1">Shoreline Amphitheatre</span> 
            and online for our flagship developer event of the year. Let's explore the future of AI, mobile, and web together.
          </motion.p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white border-t border-slate-200 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
               <div className="w-6 h-6 rounded-lg bg-google-blue flex items-center justify-center text-white font-bold text-xs">G</div>
               <span className="font-display font-bold text-lg">Google I/O</span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs mx-auto md:mx-0">
              The annual developer conference for building experiences across mobile, desktop, and the web.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900">Events</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-google-blue">I/O Connect</a></li>
                <li><a href="#" className="hover:text-google-blue">I/O Extended</a></li>
                <li><a href="#" className="hover:text-google-blue">Global Summit</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-xs uppercase tracking-widest text-slate-900">Follow Us</h5>
              <ul className="text-sm text-slate-500 space-y-2">
                <li><a href="#" className="hover:text-google-blue">X / Twitter</a></li>
                <li><a href="#" className="hover:text-google-blue">YouTube</a></li>
                <li><a href="#" className="hover:text-google-blue">Instagram</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 inline-block text-center shadow-inner">
               <Calendar className="w-6 h-6 text-google-blue mx-auto mb-2" />
               <p className="font-display font-bold text-slate-900">May 19 — 21</p>
               <p className="text-xs text-slate-500">Add to calendar</p>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 uppercase tracking-widest font-semibold">
          <p>© 2026 Google. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Code of Conduct</a>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Button (Vibe check) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full google-gradient shadow-2xl flex items-center justify-center text-white group"
      >
        <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
      </motion.button>
    </div>
  );
}
