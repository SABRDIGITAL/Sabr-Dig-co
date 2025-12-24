import React, { useRef, useState, memo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Monitor, 
  Layers, 
  Activity,
  Terminal,
  PenTool,
  Search,
  MessageSquare,
  Globe,
  Waves,
  X,
  ChevronRight,
  Info
} from 'lucide-react';

interface ServiceItem {
  icon: any;
  title: string;
  desc: string;
  color: string;
  glowColor: string;
  specs: string[];
  detailedDesc: string;
  ops: string[];
}

const QuickViewModal: React.FC<{ service: ServiceItem | null, onClose: () => void }> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden bg-emerald-950/80 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0, rotateY: 20 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-5xl bg-black/90 border border-emerald-500/30 shadow-[0_0_100px_rgba(16,185,129,0.2)] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Animated Scanlines Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.1)_50%,transparent_100%)] bg-[length:100%_4px] animate-[scan_4s_linear_infinite]" />
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 p-4 text-emerald-400 hover:text-white hover:bg-emerald-500/20 transition-all border border-emerald-500/20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left Side: Visual/Icon */}
        <div className="lg:w-1/3 p-12 flex flex-col items-center justify-center bg-emerald-950/20 border-r border-emerald-500/10">
          <div className="w-32 h-32 mb-12 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
            <service.icon className="w-16 h-16 relative z-10" style={{ color: service.color }} />
          </div>
          <h2 className="text-2xl font-syncopate font-bold text-center tracking-tighter text-white uppercase">{service.title}</h2>
          <div className="mt-8 flex items-center space-x-2 text-emerald-400 text-[10px] font-syncopate tracking-[0.3em] font-bold">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span>NODE_SYNCHRONIZED</span>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="lg:w-2/3 p-12 md:p-16 flex flex-col justify-between overflow-y-auto max-h-[80vh] lg:max-h-none">
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-8">
              <Terminal className="w-5 h-5 text-emerald-500" />
              <span className="text-[10px] font-syncopate tracking-[0.5em] text-emerald-300 font-bold">DETAILED_MANIFEST_v2.5</span>
            </div>
            <p className="text-xl text-emerald-50 font-light leading-relaxed mb-12 border-l-4 border-emerald-500 pl-8">
              {service.detailedDesc}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-xs font-syncopate text-emerald-500 font-bold uppercase tracking-widest">Core Capabilities</h4>
                {service.specs.map((s, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm text-emerald-200">
                    <ChevronRight className="w-4 h-4 text-pea-green" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <h4 className="text-xs font-syncopate text-pea-green font-bold uppercase tracking-widest">Operational Benefits</h4>
                {service.ops.map((o, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm text-emerald-200">
                    <Activity className="w-4 h-4 text-emerald-500 opacity-50" />
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 mt-8">
            <button className="flex-1 py-6 bg-emerald-500 text-black font-syncopate text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              INITIATE_PROJECT
            </button>
            <button onClick={onClose} className="flex-1 py-6 border border-emerald-500/30 text-emerald-400 font-syncopate text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-emerald-500/10 transition-all">
              RETURN_TO_MATRIX
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ParallaxServiceCard: React.FC<{ item: ServiceItem, index: number, onQuickView: (s: ServiceItem) => void }> = ({ item, index, onQuickView }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRange = index % 2 === 0 ? [50, -50] : [30, -30];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group h-[500px] [perspective:2000px] transform-gpu"
    >
      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] glass-luxury p-12 flex flex-col items-center text-center shadow-2xl bg-black/40 border-white/5">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-10 transition-all group-hover:scale-110 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <item.icon className="w-8 h-8" style={{ color: item.color }} />
          </div>
          <h3 className="text-xl font-syncopate font-bold mb-8 tracking-tight text-white uppercase leading-tight">{item.title}</h3>
          <p className="text-slate-500 leading-relaxed text-sm font-light mb-auto tracking-wide">{item.desc}</p>
          <div className="mt-10 flex items-center space-x-3 text-[8px] font-syncopate tracking-[0.4em] font-bold uppercase" style={{ color: item.color }}>
            <Activity className="w-4 h-4 animate-pulse" />
            <span>SYS_ACTIVE</span>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] glass-luxury p-12 flex flex-col justify-between shadow-2xl bg-slate-950/90 border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `linear-gradient(45deg, ${item.color} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
          <div>
            <div className="flex items-center justify-between mb-8">
              <h4 className="font-syncopate text-[9px] tracking-[0.5em] uppercase font-bold" style={{ color: item.color }}>Nodes</h4>
              <Terminal className="w-4 h-4 text-slate-500" />
            </div>
            <div className="space-y-4">
              {item.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between items-center text-[9px] font-syncopate font-bold border-b border-white/5 pb-2">
                  <span className="text-slate-600 tracking-widest uppercase">ID_{idx + 1}</span>
                  <span style={{ color: item.color }}>{spec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onQuickView(item); }}
              className="w-full py-4 bg-white/5 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all font-syncopate text-[9px] tracking-[0.4em] font-bold flex items-center justify-center space-x-3"
            >
              <Info className="w-3 h-3" />
              <span>[D_VIEW]</span>
            </button>
            <button className="w-full py-5 text-slate-900 rounded-none flex items-center justify-center space-x-4 group/btn hover:brightness-110 transition-all shadow-xl active:scale-95" style={{ backgroundColor: item.color }}>
              <span className="font-syncopate text-[9px] tracking-[0.4em] uppercase font-bold">ENGAGE_NODE</span>
              <Waves className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const serviceItems: ServiceItem[] = [
    {
      icon: Monitor,
      title: "VIBRANT WEB DESIGN",
      desc: "Shockingly fast websites for Wiltshire trades. High-speed performance meets neon-grade aesthetics.",
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      specs: ["CORE: REACT_19", "LOAD: SUB_200MS", "CONV: ELECTRIC"],
      detailedDesc: "Our web systems are engineered for the absolute edge. We don't just 'make sites'—we deploy high-fidelity digital infrastructure that loads instantly on mobile and captures every lead with visual authority.",
      ops: ["Lighthouse 100/100", "Zero Layout Shift", "UK Native Hosting"]
    },
    {
      icon: Search,
      title: "HYPER-LOCAL SEO",
      desc: "Ignite your presence. We boost your local frequency until you're the only signal that matters.",
      color: "#84cc16",
      glowColor: "rgba(132, 204, 22, 0.4)",
      specs: ["MAPS: ACTIVE", "RANK: APEX", "SEO: NEURAL"],
      detailedDesc: "Dominating local search requires precise frequency modulation. We tune your business profile to perfectly match the search intent of your local Wiltshire customers, ensuring you appear first, every time.",
      ops: ["Top 3 Map Pack", "Local Citations", "Review Optimization"]
    },
    {
      icon: PenTool,
      title: "CHROME BRANDING",
      desc: "Aura definition. We create branding that doesn't just sit there—it glows with authority.",
      color: "#059669",
      glowColor: "rgba(5, 150, 105, 0.4)",
      specs: ["DESIGN: 8K_VEC", "AURA: UNIQUE", "BRAND: CYBER"],
      detailedDesc: "Your visual identity is your digital shopfront. We craft logos and branding systems that resonate with quality, making your business look like a premium option before a single word is read.",
      ops: ["Full Brand Book", "Social Graphics", "Vector Scalability"]
    },
    {
      icon: Globe,
      title: "UPLINK HOSTING",
      desc: "Stability for the modern era. Secure, fast, and always-on Wiltshire local infrastructure.",
      color: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.4)",
      specs: ["SEC: SHIELDED", "UP: 99.99%", "SSL: AES-256"],
      detailedDesc: "Speed is a business requirement. Our UK-based servers ensure your site is always online and lightning-fast for local users, providing the rock-solid foundation your growth needs.",
      ops: ["Daily Backups", "Managed Security", "Email Config"]
    },
    {
      icon: MessageSquare,
      title: "AI INTEL OPS",
      desc: "Deploy neural agents to handle your customer flow. While you're on the tools, our AI closes the lead.",
      color: "#84cc16",
      glowColor: "rgba(132, 204, 22, 0.4)",
      specs: ["AGENT: 24/7", "REPLY: INSTANT", "LEAD: AUTO_SYNC"],
      detailedDesc: "Stop missing calls when you're busy. Our custom-trained AI agents answer common questions, qualify leads, and book appointments while you're busy delivering quality work.",
      ops: ["NLP Integration", "Smart Lead Sorting", "Multi-Channel Ops"]
    },
    {
      icon: Layers,
      title: "ELECTRIC GRAPHICS",
      desc: "From vehicle wraps that pop to print media that demands attention. Electric clarity in every pixel.",
      color: "#059669",
      glowColor: "rgba(5, 150, 105, 0.4)",
      specs: ["PRINT: 600DPI", "USAGE: OMNI", "STYLE: TRON"],
      detailedDesc: "We take your digital high-end feel into the physical world. Whether it's business cards or complete van wraps, we maintain the SABR standard of neon-sharp precision and design excellence.",
      ops: ["Print-Ready Files", "Vehicle Mockups", "Infinite Revisions"]
    }
  ];

  return (
    <div className="min-h-screen pt-52 pb-40 px-6 overflow-hidden relative bg-[#010409]">
      <div className="luxury-grid opacity-15"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-40"
        >
          <div className="flex justify-center mb-10">
            <div className="p-4 border border-emerald-500/20 bg-emerald-950/20">
               <Activity className="w-12 h-12 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-5xl md:text-8xl font-syncopate font-bold mb-10 text-white uppercase tracking-tighter leading-none">
            GROWTH <span className="luxury-gradient-text">MATRIX</span>
          </h1>
          <p className="text-emerald-500/60 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-widest uppercase">
            [DEPLOYING_HIGH_FIDELITY_BUSINESS_SYSTEMS]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 pb-40">
          {serviceItems.map((item, i) => (
            <ParallaxServiceCard 
              key={i} 
              item={item} 
              index={i} 
              onQuickView={(s) => setSelectedService(s)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <QuickViewModal 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>

      <style>{`
        @keyframes scan {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default Services;