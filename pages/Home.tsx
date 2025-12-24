import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  LayoutTemplate,
  Smile,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const swiftFadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
} as const;

const LuxuryBackground = memo(() => {
  // Memoize particle array to avoid recreation
  const particles = useMemo(() => [...Array(10)].map((_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 15,
    delay: Math.random() * 5
  })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 gpu-accel">
      <div className="luxury-grid opacity-20"></div>
      <div className="luxury-aura top-[-10%] left-[-10%]"></div>
      <div className="luxury-aura aura-2 bottom-[-10%] right-[-10%]"></div>
      
      <div className="absolute inset-0 opacity-[0.05]">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 0 }}
            animate={{ 
              y: ["-2%", "102%"],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay
            }}
            className="absolute w-[2px] h-[2px] bg-emerald-400 rounded-full"
          />
        ))}
      </div>
    </div>
  );
});

const HeroFlipper = memo(() => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const lines = useMemo(() => [
    "Your reputation is already strong",
    "your website should reflect that strength",
    "not quietly work against it."
  ], []);

  useEffect(() => {
    const FLIP_DURATION = 3000; 
    const tick = () => setIndex((prev) => (prev + 1) % lines.length);
    timeoutRef.current = window.setTimeout(tick, FLIP_DURATION);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [index, lines.length]);

  return (
    <div className="relative h-[220px] md:h-[280px] lg:h-[380px] w-full flex items-center justify-center [perspective:2000px] mb-12 overflow-visible">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, rotateX: -90, y: 40, scale: 0.99 }}
          animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
          exit={{ opacity: 0, rotateX: 90, y: -40, scale: 0.99 }}
          transition={{ 
            duration: 0.7, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none gpu-accel"
        >
          <div className="flex flex-col items-center justify-center text-center w-full px-4 max-w-6xl mx-auto">
            <h1 className="emerald-glow-shimmer text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-syncopate font-bold uppercase leading-[1.05] tracking-tighter">
              {lines[index]}
            </h1>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

const Home: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-[#f9fafb] text-emerald-900">
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-4 md:px-16 pt-32 pb-24 overflow-hidden">
        <LuxuryBackground />
        
        <div className="container mx-auto flex flex-col items-center text-center z-10 max-w-[95%] lg:max-w-7xl">
          <HeroFlipper />

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#065f46] max-w-2xl text-base md:text-lg lg:text-xl leading-relaxed mb-14 md:mb-18 font-light tracking-wide px-6"
          >
            We build high-performance, easy-to-use websites for local business owners in Wiltshire and across the UK. 
            No confusing tech talk—just world-class design that helps you win more work.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-12"
          >
            <Link to="/contact" className="group relative px-14 py-6 bg-emerald-900 text-white font-syncopate text-[11px] font-bold tracking-[0.5em] rounded-none transition-all hover:bg-emerald-600 hover:translate-y-[-4px] active:translate-y-[0px] uppercase flex items-center shadow-xl">
              TALK TO US <ArrowRight className="ml-5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/portfolio" className="group px-14 py-6 bg-white border border-emerald-100 text-emerald-700 hover:border-emerald-900 hover:text-emerald-900 transition-all font-syncopate text-[11px] font-bold tracking-[0.5em] rounded-none uppercase shadow-sm">
              SEE OUR WORK
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Simple British Value Propositions */}
      <section className="py-28 bg-white relative z-10 border-y border-emerald-50">
        <LuxuryBackground />
        <div className="container mx-auto px-8 md:px-16 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ValueItem 
              icon={Smile} 
              title="Friendly & Honest" 
              desc="We're a small team that speaks normal English. We won't try to confuse you with buzzwords." 
              color="text-emerald-500"
              bgColor="bg-emerald-50"
            />
            <ValueItem 
              icon={LayoutTemplate} 
              title="Clean Designs" 
              desc="No clutter, no mess. Just a website that looks professional and works perfectly on phones." 
              color="text-pea-green"
              bgColor="bg-lime-50"
            />
            <ValueItem 
              icon={CheckCircle} 
              title="Sorted For You" 
              desc="We handle everything from the domain to the design. You just keep doing what you do best." 
              color="text-emerald-700"
              bgColor="bg-emerald-50"
            />
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="py-24 md:py-36 bg-emerald-50/20 relative z-10">
        <LuxuryBackground />
        <div className="container mx-auto px-8 md:px-16 max-w-7xl relative z-10">
          <motion.p {...swiftFadeUp} className="text-emerald-400 mb-20 text-center max-w-2xl mx-auto font-bold tracking-widest text-xs uppercase">
            WHY GOOD DESIGN MATTERS FOR YOUR BUSINESS
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <StatItem number="38%" label="FIRST IMPRESSIONS" detail="PEOPLE JUDGE YOUR BUSINESS BY HOW YOUR SITE LOOKS." color="text-emerald-600" />
            <StatItem number="70%" label="LOCAL SEARCH" detail="CUSTOMERS CHECK WEBSITES BEFORE CALLING A TRADE." color="text-pea-green" />
            <StatItem number="90%" label="TRUST" detail="A CLEAN SITE MAKES YOU LOOK MORE RELIABLE." color="text-emerald-800" />
          </div>
        </div>
      </section>

      {/* "New Front Line" Section */}
      <section className="py-24 md:py-36 bg-white relative z-10">
        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center max-w-7xl">
          <motion.div {...swiftFadeUp}>
            <h2 className="text-3xl md:text-5xl font-syncopate font-bold mb-10 tracking-tighter uppercase leading-tight">YOUR WEBSITE IS YOUR <br/><span className="text-emerald-600">MODERN SHOPFRONT</span></h2>
            <p className="text-[#065f46] text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl">
              Think of your website like the front of your shop or the side of your van. If it looks messy or confusing, people might keep walking. 
              <br/><br/>
              A clean, smart website shows people you take pride in your work. It makes it easy for them to see what you do and give you a call.
            </p>
            <div className="flex flex-col space-y-6 mb-12">
               <div className="flex items-start space-x-5">
                  <div className="w-8 h-8 bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold shrink-0 shadow-sm">1</div>
                  <p className="text-emerald-800">People find you on Google or Social Media.</p>
               </div>
               <div className="flex items-start space-x-5">
                  <div className="w-8 h-8 bg-lime-50 flex items-center justify-center text-pea-green font-bold shrink-0 shadow-sm">2</div>
                  <p className="text-emerald-800">They check your site to see if you're the real deal.</p>
               </div>
               <div className="flex items-start space-x-5">
                  <div className="w-8 h-8 bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0 shadow-sm">3</div>
                  <p className="text-emerald-800">If it looks great, they trust you and get in touch.</p>
               </div>
            </div>
            <Link to="/contact" className="inline-flex items-center px-10 py-5 bg-emerald-900 text-white font-syncopate text-[10px] font-bold tracking-[0.4em] uppercase transition-all hover:bg-emerald-600 shadow-md">
              GET IN TOUCH <ArrowRight className="ml-4 w-4 h-4" />
            </Link>
          </motion.div>
          
          <div className="relative group p-10 bg-emerald-50/40 border border-emerald-100 shadow-sm transition-all hover:shadow-md">
             <div className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-200/20 -z-10 group-hover:scale-110 transition-transform"></div>
             <p className="text-emerald-900 leading-relaxed mb-8 font-medium text-lg italic">
              "We take your business as seriously as you do. A great website isn't just a luxury anymore—it's how you show the world you're the best at what you do."
             </p>
             <p className="text-emerald-500 font-syncopate text-[9px] tracking-widest uppercase font-bold">The SABR Team</p>
          </div>
        </div>
      </section>

      {/* Bold CTA */}
      <section className="py-24 md:py-36 text-center bg-emerald-950 relative z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-10 luxury-grid"></div>
        <div className="container mx-auto px-8 max-w-4xl relative z-10">
          <motion.div {...swiftFadeUp}>
            <h2 className="text-3xl md:text-5xl font-syncopate font-bold mb-10 uppercase tracking-tighter leading-tight text-white">READY TO LOOK THE <br/><span className="luxury-gradient-text">PART ONLINE?</span></h2>
            <Link to="/contact" className="px-14 py-7 bg-white text-emerald-950 font-syncopate font-bold text-[11px] tracking-[0.5em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl inline-block uppercase mt-8">
              TALK TO US
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ValueItem = memo(({ icon: Icon, title, desc, color, bgColor }: any) => (
  <div className="p-10 border border-transparent hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group relative z-10">
    <div className={`w-14 h-14 ${bgColor} flex items-center justify-center mb-8 ${color} group-hover:scale-110 group-hover:bg-white transition-all duration-300 shadow-sm`}><Icon className="w-7 h-7" /></div>
    <h3 className="text-base font-syncopate font-bold text-emerald-900 mb-5 uppercase tracking-tight">{title}</h3>
    <p className="text-emerald-700 text-sm font-light leading-relaxed tracking-wide">{desc}</p>
  </div>
));

const StatItem = memo(({ number, label, detail, color }: any) => (
  <div className="text-center group flex flex-col items-center relative z-10">
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "circOut" }}
      className={`text-6xl md:text-7xl font-bold ${color} mb-6 tracking-tighter`}
    >
      {number}
    </motion.div>
    <h4 className="text-[10px] font-syncopate font-bold text-emerald-900 tracking-[0.4em] mb-4 uppercase">{label}</h4>
    <p className="text-emerald-500 text-[9px] font-bold leading-relaxed max-w-[200px] mx-auto tracking-widest uppercase">{detail}</p>
  </div>
));

export default Home;