import React, { useState, useEffect, Suspense, lazy, memo, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Instagram,
  Linkedin,
  Activity,
  Cpu
} from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Process = lazy(() => import('./pages/Process'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const SABRAI = lazy(() => import('./pages/SABRAI'));
const Services = lazy(() => import('./pages/Services'));

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
};

const GlowEntrance = memo(({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: "circIn" }}
      className="fixed inset-0 z-[9999] bg-[#f9fafb] flex items-center justify-center overflow-hidden gpu-accel"
    >
      <div className="relative flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <div className="text-[10px] font-syncopate tracking-[0.5em] text-emerald-400 mb-4 uppercase font-bold">saberdigital.co.uk</div>
          <div className="font-syncopate text-2xl font-bold tracking-[0.6em] text-[#064e3b] flex items-center justify-center">
            SABR DIGITAL
          </div>
        </motion.div>
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "200px", opacity: 0.1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="h-[1px] bg-[#064e3b] mt-8"
        />
      </div>
    </motion.div>
  );
});

const SnakeLogo = memo(() => {
  return (
    <div className="relative group flex items-center transform-gpu snake-wiggle">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-emerald-50 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500 opacity-50"></div>
        <svg viewBox="0 0 100 100" className="w-8 h-8 relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
          <path 
            d="M75 25 C75 10, 25 10, 25 35 C25 50, 75 50, 75 65 C75 90, 25 90, 25 75" 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="12" 
            strokeLinecap="round" 
            className="transition-all duration-300"
          />
          <circle cx="25" cy="75" r="5" fill="#84cc16" />
        </svg>
      </div>
      <div className="ml-4 flex flex-col items-start">
        <span className="font-syncopate font-bold text-sm tracking-[0.2em] text-[#064e3b] leading-none group-hover:text-emerald-500 transition-colors">
          SABR DIGITAL
        </span>
        <span className="text-[7px] font-syncopate tracking-[0.5em] text-emerald-400 mt-1 uppercase opacity-60">Serpent_Core_v3</span>
      </div>
    </div>
  );
});

const SystemStatus = memo(() => {
  const statuses = ["BREW_LVL: 100%", "GRID: Wiltshire_S1", "TEA_TEMP: OPTIMAL", "RAIN: VERY_UK", "SYS_SYNC: ACTIVE"];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(prev => (prev + 1) % statuses.length), 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hidden lg:flex items-center space-x-4 border-l border-emerald-100 pl-8 ml-8">
      <div className="flex flex-col items-end">
        <span className="text-[8px] font-syncopate font-bold text-emerald-300 tracking-[0.2em] uppercase">Status_Intel</span>
        <motion.span key={index} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="text-[9px] font-syncopate font-bold text-emerald-600 tracking-[0.3em] uppercase">{statuses[index]}</motion.span>
      </div>
      <Activity className="w-4 h-4 text-pea-green animate-pulse" />
    </div>
  );
});

const Navbar = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => setScrolled(window.scrollY > 40));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'OUR WORK', path: '/portfolio', code: '01' },
    { name: 'SERVICES', path: '/services', code: '02' },
    { name: 'PROCESS', path: '/process', code: '03' },
    { name: 'QUESTIONS', path: '/faq', code: '04' },
    { name: 'TALK TO US', path: '/contact', code: '05' },
    { name: 'SABR AI', path: '/ai', code: '06' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 gpu-accel ${scrolled ? 'glass-luxury py-3 px-8 md:px-16 shadow-2xl border-b border-emerald-50' : 'bg-transparent py-10 px-8 md:px-16'}`}>
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        <Link to="/" className="flex items-center group"><SnakeLogo /></Link>
        <div className="hidden md:flex items-center">
          <div className="flex items-center gap-10 lg:gap-12">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`font-syncopate text-[9px] tracking-[0.3em] font-bold transition-all duration-200 relative group uppercase glitch-text ${location.pathname === link.path ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-900'}`}
              >
                <span className="text-emerald-300 mr-2 opacity-50">[{link.code}]</span>{link.name}
              </Link>
            ))}
          </div>
          <SystemStatus />
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-emerald-900 focus:outline-none">{isOpen ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-[#f9fafb] z-40 flex flex-col items-center justify-center space-y-12">
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-8"><X className="w-8 h-8" /></button>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="font-syncopate text-2xl font-bold text-emerald-900 hover:text-emerald-600 uppercase transition-colors">
                <span className="text-sm mr-4 opacity-50">[{link.code}]</span>{link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);
  return (
    <Router>
      <AnimatePresence mode="wait">{!booted && <GlowEntrance key="intro" onComplete={() => setBooted(true)} />}</AnimatePresence>
      <ScrollToTop />
      <div className="relative min-h-screen bg-[#f9fafb] flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="h-[60vh] flex items-center justify-center"><div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/process" element={<Process />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/ai" element={<SABRAI />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </Suspense>
        </main>
        <footer className="py-24 bg-white border-t border-emerald-50 relative overflow-hidden text-center">
            <div className="max-w-7xl mx-auto px-8"><SnakeLogo /><p className="mt-8 text-emerald-800 opacity-60">High-performance digital craft in the heart of Wiltshire.</p></div>
            <div className="mt-10 font-syncopate text-[9px] tracking-[0.5em] text-emerald-300">&copy; 2025 SABR DIGITAL // GRID_ACTIVE</div>
        </footer>
      </div>
    </Router>
  );
};

export default App;