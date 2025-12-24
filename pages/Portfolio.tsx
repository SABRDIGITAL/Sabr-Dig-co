import React, { useState, memo } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ExternalLink, CheckCircle2 } from 'lucide-react';

const WorkCard = memo(({ project }: { project: any }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group relative flex flex-col bg-white border border-emerald-50 shadow-sm hover:shadow-2xl transition-all duration-700"
  >
    <div className="relative overflow-hidden aspect-[16/10] bg-emerald-50">
      <img 
        src={project.image} 
        alt={project.title} 
        loading="lazy" 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
      />
      <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/10 transition-colors duration-500" />
      <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white p-4 shadow-xl border border-emerald-100">
          <ExternalLink className="w-5 h-5 text-emerald-600" />
        </div>
      </div>
    </div>

    <div className="p-10">
      <div className="text-[10px] font-syncopate tracking-[0.4em] text-emerald-600 mb-4 uppercase font-bold">{project.type}</div>
      <h3 className="text-2xl font-syncopate font-bold text-emerald-900 uppercase leading-tight tracking-tight mb-6">{project.title}</h3>
      <p className="text-emerald-800 text-base font-light leading-relaxed mb-8">{project.problem}</p>
      
      <div className="space-y-3">
        {project.results.map((result: string, idx: number) => (
          <div key={idx} className="flex items-center space-x-3 text-emerald-600 text-sm">
            <CheckCircle2 className="w-4 h-4 text-pea-green" />
            <span>{result}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
));

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState('ALL');
  const categories = ['ALL', 'TRADES', 'CAFE', 'SHOPS', 'PROFESSIONAL'];

  const projects = [
    { 
      title: 'Local Plumber Website', 
      type: 'TRADES', 
      problem: 'The customer had no website and was relying on Facebook. We built a site that makes them look like the most reliable plumber in town.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
      results: ['Professional booking form', 'Clear list of services', 'Mobile friendly for people on the go']
    },
    { 
      title: 'High Street Café', 
      type: 'CAFE', 
      problem: 'People couldn’t find their menu or opening times online. We created a clean, welcoming site that shows off their food.',
      image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1200',
      results: ['Online menu that loads fast', 'Beautiful food photography', 'Easy to find directions']
    },
    { 
      title: 'Vintage Toy Store', 
      type: 'SHOPS', 
      problem: 'A local collector wanting to sell across the UK. We built a clean store that handles orders safely.',
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&q=80&w=1200',
      results: ['Secure online payments', 'Inventory management', 'Nationwide shipping setup']
    },
    { 
      title: 'Property Management', 
      type: 'PROFESSIONAL', 
      problem: 'An old, messy site was making them look unprofessional. We simplified everything and focused on trust.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      results: ['Clean property listings', 'Tenant contact portal', 'Modern, high-end branding']
    },
  ];

  const filteredProjects = filter === 'ALL' ? projects : projects.filter(p => p.type === filter);

  return (
    <div className="min-h-screen pt-48 pb-40 px-8 md:px-16 overflow-hidden relative bg-[#f9fafb]">
      <div className="luxury-grid opacity-20"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-32 gap-16">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-syncopate font-bold mb-10 text-emerald-950 leading-[1] tracking-tighter uppercase"
            >
              REAL WORK FOR <br/><span className="text-emerald-600">LOCAL BUSINESSES</span>
            </motion.h1>
            <p className="text-emerald-800 font-light text-lg md:text-xl leading-relaxed max-w-2xl">
              We take pride in helping local businesses look their best online. Here are a few examples of sites we've built recently.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 p-3 bg-white border border-emerald-100 shadow-sm">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-4 text-[11px] font-syncopate tracking-[0.3em] transition-all duration-300 uppercase font-bold ${
                  filter === cat ? 'bg-emerald-900 text-white shadow-lg' : 'text-emerald-400 hover:text-emerald-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <WorkCard key={project.title} project={project} />
              ))}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default Portfolio;