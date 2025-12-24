import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Terminal, Cpu, Zap, Waves, Sparkles, MessageCircle } from 'lucide-react';
import { chatWithSABR } from '../services/geminiService';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SABRAI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Hello! I am the SABR AI. I am here to answer any questions you have about our services or how we can help your business grow. What is on your mind today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const aiResponse = await chatWithSABR(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-52 pb-32 px-8 md:px-16 relative overflow-hidden bg-[#f9fafb]">
      <div className="luxury-grid opacity-20"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center mb-32 text-center">
          <motion.div 
            animate={{ 
              rotateY: [0, 360],
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="w-24 h-24 bg-white/20 border border-emerald-200 flex items-center justify-center mb-12 p-6 shadow-sm relative overflow-hidden backdrop-blur-md"
          >
            <Cpu className="w-full h-full text-emerald-600 relative z-10" />
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-syncopate font-bold text-emerald-950 leading-none tracking-tighter uppercase mb-6">SABR DIGITAL <span className="text-emerald-600">AI</span></h1>
          <p className="text-emerald-500 font-syncopate text-[10px] tracking-[0.5em] uppercase font-bold">SMART SUPPORT FOR YOUR BUSINESS</p>
        </div>

        <div className="bg-white border border-emerald-100 overflow-hidden flex flex-col h-[700px] shadow-2xl relative">
          <div className="px-10 py-8 border-b border-emerald-50 flex justify-between items-center bg-emerald-50/30">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-pea-green rounded-full"></div>
              <span className="text-[11px] font-syncopate text-emerald-950 tracking-[0.3em] uppercase font-bold">ONLINE AND READY</span>
            </div>
            <MessageCircle className="text-emerald-500 w-5 h-5" />
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-12 space-y-12 bg-emerald-50/10"
          >
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-10 ${
                  msg.role === 'user' 
                  ? 'bg-emerald-950 text-emerald-50 shadow-lg font-medium' 
                  : 'bg-white border border-emerald-100 text-emerald-900 shadow-sm font-light'
                }`}>
                  <p className="text-base md:text-lg leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-emerald-50 p-8">
                  <div className="flex space-x-3">
                    {[0, 1, 2].map(d => (
                      <motion.div 
                        key={d}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: d * 0.2 }}
                        className="w-2 h-2 bg-pea-green"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-10 bg-white border-t border-emerald-100">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask us anything..."
                className="w-full bg-emerald-50/30 border border-emerald-100 py-8 px-10 text-base focus:outline-none focus:border-emerald-500 transition-all text-emerald-900 font-medium placeholder:text-emerald-200 rounded-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-4 p-6 bg-emerald-950 text-white hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row justify-center items-center md:space-x-20 space-y-10 md:space-y-0 opacity-60">
           <div className="flex items-center space-x-5 text-[10px] font-syncopate tracking-[0.4em] text-emerald-700 uppercase font-bold">
              <Zap className="w-5 h-5 text-emerald-500" />
              <span>Smart Solutions</span>
           </div>
           <div className="flex items-center space-x-5 text-[10px] font-syncopate tracking-[0.4em] text-emerald-700 uppercase font-bold">
              <Sparkles className="w-5 h-5 text-pea-green" />
              <span>Personal Service</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SABRAI;