import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Instagram, MapPin, Phone } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen pt-52 pb-40 px-8 md:px-16 overflow-hidden relative bg-[#f9fafb]">
      <div className="luxury-grid opacity-20"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="max-w-xl">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-8xl font-syncopate font-bold mb-12 text-emerald-950 leading-[0.9] tracking-tighter uppercase"
            >
              LET'S <br/><span className="text-emerald-600">CHAT.</span>
            </motion.h1>
            <p className="text-emerald-800 text-xl leading-relaxed mb-20 font-light">
              We're here to help you get your business looking the part online. Send us a message or give us a shout on socials, and we'll get back to you quickly.
            </p>

            <div className="space-y-16">
              <ContactChannel 
                icon={Mail} 
                value="hello@sabrdigital.co.uk" 
                desc="Send us an email and we'll reply within 24 hours."
              />
              <ContactChannel 
                icon={Instagram} 
                value="@sabrdigital" 
                desc="Send us a DM or a voice note on Instagram."
              />
              <div className="flex items-center space-x-6 text-emerald-400">
                <MapPin className="w-5 h-5" />
                <span className="text-sm font-medium">Based in Wiltshire, serving the UK.</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 md:p-20 border border-emerald-50 shadow-2xl relative"
          >
            <h2 className="text-xl font-syncopate font-bold text-emerald-950 mb-10 uppercase tracking-tight">Send us a message</h2>
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[11px] font-syncopate tracking-[0.3em] text-emerald-400 uppercase font-bold">YOUR NAME</label>
                  <input type="text" placeholder="John Smith" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-none p-6 text-emerald-900 focus:outline-none focus:border-emerald-500 transition-all text-base placeholder:text-emerald-200 font-medium" />
                </div>
                <div className="space-y-4">
                  <label className="text-[11px] font-syncopate tracking-[0.3em] text-emerald-400 uppercase font-bold">EMAIL ADDRESS</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-none p-6 text-emerald-900 focus:outline-none focus:border-emerald-500 transition-all text-base placeholder:text-emerald-200 font-medium" />
                </div>
              </div>
              
              <div className="space-y-4">
                <label className="text-[11px] font-syncopate tracking-[0.3em] text-emerald-400 uppercase font-bold">BUSINESS TYPE</label>
                <input type="text" placeholder="e.g. Plumber, Café owner" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-none p-6 text-emerald-900 focus:outline-none focus:border-emerald-500 transition-all text-base placeholder:text-emerald-200 font-medium" />
              </div>

              <div className="space-y-4">
                <label className="text-[11px] font-syncopate tracking-[0.3em] text-emerald-400 uppercase font-bold">HOW CAN WE HELP?</label>
                <textarea rows={4} placeholder="Tell us a bit about what you need..." className="w-full bg-emerald-50/30 border border-emerald-100 rounded-none p-8 text-emerald-900 focus:outline-none focus:border-emerald-500 transition-all text-base placeholder:text-emerald-200 font-medium"></textarea>
              </div>

              <button className="w-full py-8 bg-emerald-900 text-white font-syncopate font-bold text-[12px] tracking-[0.5em] rounded-none flex items-center justify-center group hover:bg-emerald-600 transition-all shadow-xl uppercase">
                SEND MESSAGE <Send className="ml-6 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ContactChannel = ({ icon: Icon, value, desc }: any) => (
  <div className="p-10 bg-white border border-emerald-50 shadow-sm transition-all group hover:shadow-lg">
    <div className="text-xl font-syncopate font-bold text-emerald-950 mb-4 uppercase tracking-tight flex items-center">
      <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center mr-6 group-hover:bg-emerald-100 transition-colors">
        <Icon className="w-5 h-5 text-emerald-600" />
      </div>
      {value}
    </div>
    <p className="text-emerald-700 text-sm font-light leading-relaxed tracking-wide">{desc}</p>
  </div>
);

export default Contact;