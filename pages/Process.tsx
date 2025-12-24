import React from 'react';
import { motion as m } from 'framer-motion';
import { MessageCircle, FileText, Layout, Rocket, ArrowRight, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: MessageCircle,
    title: "1. Let's have a chat",
    desc: "We start with a quick, normal conversation about what you need. No pressure, just a talk about your business and how a new site can help.",
    color: "text-emerald-600",
    glow: "rgba(16, 185, 129, 0.1)"
  },
  {
    icon: FileText,
    title: "2. Send us your bits",
    desc: "You send us any photos, your logo, and a bit of info about what you do. If you're not sure what to write, we can help you with that too.",
    color: "text-pea-green",
    glow: "rgba(132, 204, 22, 0.1)"
  },
  {
    icon: Layout,
    title: "3. We build the site",
    desc: "We get to work designing your new site. We make sure it looks great on both computers and phones, and focus on making it easy for customers to call you.",
    color: "text-emerald-700",
    glow: "rgba(5, 150, 105, 0.1)"
  },
  {
    icon: Rocket,
    title: "4. Review and Launch",
    desc: "We show you the site, make any changes you want, and then we put it live! We handle all the techy bits like hosting and your domain name.",
    color: "text-emerald-900",
    glow: "rgba(6, 78, 59, 0.1)"
  }
];

const Process: React.FC = () => {
  return (
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-16 relative overflow-hidden bg-[#f9fafb]">
      <div className="luxury-grid opacity-20"></div>
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-32 text-center md:text-left">
          <m.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-syncopate font-bold text-emerald-950 uppercase tracking-tighter mb-10 leading-none"
          >
            HOW WE <br/><span className="luxury-gradient-text">GET YOU ONLINE</span>
          </m.h1>
          <p className="text-emerald-800 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            We've made our process as simple as possible. You handle the business, we handle the tech.
          </p>
        </div>

        <div className="flex flex-col space-y-16">
          {steps.map((step, i) => (
            <m.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative p-12 bg-white border border-emerald-50 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row items-center md:items-start gap-12"
              style={{ boxShadow: `0 20px 50px ${step.glow}` }}
            >
              <div className={`w-20 h-20 bg-emerald-50/50 flex items-center justify-center ${step.color} group-hover:scale-110 transition-transform shrink-0 shadow-inner`}>
                <step.icon className="w-10 h-10" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-syncopate font-bold text-emerald-900 mb-6 uppercase tracking-tight">{step.title}</h3>
                <p className="text-emerald-800 text-lg font-light leading-relaxed mb-8">{step.desc}</p>
                <div className="w-16 h-[2px] bg-emerald-50 mx-auto md:mx-0"></div>
              </div>
            </m.div>
          ))}
        </div>

        <div className="mt-32 pt-20 border-t border-emerald-100 flex flex-col items-center text-center">
          <h2 className="text-2xl font-syncopate font-bold text-emerald-900 uppercase mb-10">Ready to start step 1?</h2>
          <Link to="/contact" className="px-16 py-8 bg-emerald-900 text-white font-syncopate font-bold text-[12px] tracking-[0.6em] rounded-none hover:bg-emerald-600 transition-all shadow-2xl uppercase flex items-center">
            TALK TO US <ArrowRight className="ml-5 w-5 h-5" />
          </Link>
          <p className="mt-8 text-emerald-400 text-sm flex items-center gap-3">
            <MousePointer2 className="w-4 h-4" /> Just a friendly chat, no pressure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;