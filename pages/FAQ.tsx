import React, { useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CircleDollarSign,
  Clock,
  HelpCircle,
  Pencil,
  Smartphone,
  ShieldCheck,
  MessageSquareMore,
  LifeBuoy
} from 'lucide-react';

const FlipFAQCard: React.FC<{ faq: any, index: number }> = memo(({ faq, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yRange = index % 2 === 0 ? [20, -20] : [15, -15];
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  const colors = [
    { main: '#10b981', bg: 'bg-emerald-50', icon: CircleDollarSign },
    { main: '#059669', bg: 'bg-emerald-100', icon: Clock },
    { main: '#84cc16', bg: 'bg-lime-50', icon: Pencil },
    { main: '#10b981', bg: 'bg-emerald-50', icon: HelpCircle },
    { main: '#059669', bg: 'bg-emerald-100', icon: Smartphone },
    { main: '#84cc16', bg: 'bg-lime-50', icon: ShieldCheck },
  ];

  const theme = colors[index % colors.length];
  const IconComp = theme.icon;

  return (
    <motion.div 
      ref={ref}
      style={{ y }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
      className="group h-[380px] [perspective:1500px]"
    >
      <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] cursor-pointer">
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] -webkit-backface-visibility:hidden bg-white p-12 flex flex-col items-center text-center shadow-md border border-emerald-50">
          <div className={`w-16 h-16 ${theme.bg} flex items-center justify-center mb-10 transition-all group-hover:scale-110 shadow-inner`}>
            <IconComp className="w-8 h-8" style={{ color: theme.main }} />
          </div>
          <h3 className="text-xl font-syncopate font-bold mb-6 tracking-tight text-emerald-950 uppercase leading-tight min-h-[3.5rem] flex items-center">{faq.q}</h3>
          <p className="text-[10px] font-syncopate tracking-[0.4em] text-emerald-400 mt-auto uppercase">Click to reveal</p>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] -webkit-backface-visibility:hidden [transform:rotateY(180deg)] bg-emerald-950 p-12 flex flex-col justify-between shadow-2xl overflow-hidden text-emerald-50">
          <div className="space-y-6">
            <div className="w-10 h-[2px] bg-emerald-700"></div>
            <p className="text-emerald-100 text-lg font-light leading-relaxed">
              {faq.a}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[9px] font-syncopate text-pea-green tracking-[0.3em] uppercase">
             <MessageSquareMore className="w-4 h-4" />
             <span>Got more questions? Just ask!</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How much does a website cost?",
      a: "Every project is different, but we provide a clear, fixed quote upfront based on exactly what you need. No hidden extras or surprise bills."
    },
    {
      q: "How long does it take?",
      a: "Usually, we can get your site live in 1 to 2 weeks, depending on how quickly we get your photos and information."
    },
    {
      q: "Do I need to write the text?",
      a: "If you want to, great! If not, don't worry. Just give us the basics and we'll write clean, professional text for you."
    },
    {
      q: "Can you update it later?",
      a: "Absolutely. We can help with price changes, new photos, or any updates you need down the line. We don't just disappear after the launch."
    },
    {
      q: "Will it work on phones?",
      a: "Yes, every single site we build is made to work perfectly on mobiles, tablets, and computers. It's a standard feature for us."
    },
    {
      q: "What do I need to provide?",
      a: "Just your logo, some photos of your work, and a brief chat about what services you offer. We can handle everything else."
    }
  ];

  return (
    <div className="min-h-screen pt-52 pb-40 px-8 md:px-16 relative overflow-hidden bg-[#f9fafb]">
      <div className="luxury-grid opacity-20"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="mb-32 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-syncopate font-bold text-emerald-950 uppercase tracking-tighter mb-10 leading-none"
          >
            SABR <span className="luxury-gradient-text">QUESTIONS</span>
          </motion.h1>
          <p className="text-emerald-800 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto tracking-wide">
            Honest answers to the things people ask us most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-40">
          {faqs.map((faq, i) => (
            <FlipFAQCard key={i} faq={faq} index={i} />
          ))}
        </div>

        <div className="mt-32 p-20 bg-white border border-emerald-50 text-center shadow-lg max-w-4xl mx-auto">
          <h2 className="text-xl font-syncopate font-bold text-emerald-950 mb-6 uppercase">Still got questions?</h2>
          <p className="text-emerald-700 mb-10">We're happy to talk through anything on your mind. No pressure, just a chat.</p>
          <a href="mailto:hello@sabrdigital.co.uk" className="text-xl md:text-2xl font-syncopate font-bold text-emerald-800 hover:text-emerald-600 transition-all uppercase underline underline-offset-[16px] decoration-emerald-200 hover:decoration-emerald-500">
            hello@sabrdigital.co.uk
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;