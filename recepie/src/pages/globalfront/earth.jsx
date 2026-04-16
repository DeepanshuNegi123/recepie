import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Globe2, Wind, Droplets, Leaf, ArrowLeft, ShieldAlert } from 'lucide-react';

const EarthRevolution = () => {
  return (
    <div className="min-h-screen bg-green-950 font-sans text-green-50 selection:bg-emerald-500 selection:text-white">
      
      {/* Absolute Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-green-200 hover:text-white transition uppercase tracking-widest text-sm font-semibold">
           <ArrowLeft size={16} /> Back to Hub
        </Link>
        <div className="font-display font-bold text-2xl tracking-wide text-white flex items-center gap-2">
          <TreePine size={24} className="text-emerald-400" />
          Devdar
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Abstract organic background elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-emerald-900 rounded-full blur-[120px] opacity-60 z-0"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30rem] h-[30rem] bg-emerald-800 rounded-full blur-[100px] opacity-40 z-0"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block border border-emerald-500/50 text-emerald-300 uppercase tracking-widest text-xs font-bold px-4 py-1 rounded-full mb-8">
             Project Devdar
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            We only have one planet. <br />
            Let's <span className="text-emerald-400 italic">save</span> it together.
          </h1>
          <p className="text-xl md:text-2xl text-green-100 font-light max-w-3xl mx-auto leading-relaxed mb-12">
            Humanity's impact on climate change and carbon emissions is accelerating. We are building a revolution to protect wildlife, restore forests, and sustain our ecosystem before it's too late.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-8 py-4 uppercase tracking-widest text-sm transition shadow-lg shadow-emerald-900/50 rounded-sm">
                Join Project Devdar
             </button>
             <button className="border border-emerald-400/30 hover:border-emerald-400 text-white font-semibold px-8 py-4 uppercase tracking-widest text-sm transition rounded-sm bg-green-950/50 backdrop-blur-sm">
                Learn Mitigation Tech
             </button>
          </div>
        </div>
      </section>

      {/* Major Issues Affecting Earth */}
      <section className="py-24 bg-green-900/30 relative z-10 border-t border-emerald-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <ShieldAlert size={48} className="text-red-400/80 mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white">Major Threats to Mother Nature</h2>
            <p className="text-lg text-emerald-100/70 font-light max-w-2xl mx-auto">
              Understanding how human industrialization and consumption habits critically endanger our environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-950 border border-green-800 p-8 hover:border-emerald-500 transition duration-300">
               <Globe2 size={40} className="text-emerald-500 mb-6" />
               <h3 className="text-2xl font-bold mb-4 text-white">Carbon Emissions</h3>
               <p className="text-green-200/80 font-light leading-relaxed">
                 Industrial agriculture and global supply chains contribute massively to greenhouse gases. The trapping of heat is devastating global weather patterns and accelerating ice melt.
               </p>
            </div>
            <div className="bg-green-950 border border-green-800 p-8 hover:border-emerald-500 transition duration-300">
               <Leaf size={40} className="text-emerald-500 mb-6" />
               <h3 className="text-2xl font-bold mb-4 text-white">Wildlife Habitat Loss</h3>
               <p className="text-green-200/80 font-light leading-relaxed">
                 Deforestation for monoculture farming displaces thousands of species annually. We are experiencing a drastic reduction in biodiversity critical to ecological balance.
               </p>
            </div>
            <div className="bg-green-950 border border-green-800 p-8 hover:border-emerald-500 transition duration-300">
               <Droplets size={40} className="text-emerald-500 mb-6" />
               <h3 className="text-2xl font-bold mb-4 text-white">Water Contamination</h3>
               <p className="text-green-200/80 font-light leading-relaxed">
                 Excessive use of synthetic fertilizers and pesticides creates toxic runoff, threatening marine life, coral reefs, and the global water cycle.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tech / Solutions */}
      <section className="py-24 relative z-10">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-5xl font-bold mb-6 text-white leading-tight">
                Prevention Tech & Human Reversal
              </h2>
              <p className="text-xl text-emerald-100/80 font-light mb-8 leading-relaxed">
                We possess the technology and the culinary influence to change the world. By shifting how we source and consume, we can directly reduce the carbon footprint.
              </p>
              <ul className="space-y-6">
                 <li className="flex gap-4">
                    <div className="mt-1"><Wind className="text-emerald-400" /></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Regenerative Agriculture</h4>
                      <p className="text-green-200/60 font-light">Using farming techniques that restore soil health and naturally sequester carbon dioxide from the atmosphere.</p>
                    </div>
                 </li>
                 <li className="flex gap-4">
                    <div className="mt-1"><TreePine className="text-emerald-400" /></div>
                    <div>
                      <h4 className="font-bold text-lg text-white">Agroforestry Optimization</h4>
                      <p className="text-green-200/60 font-light">Integrating trees and shrubs into crop and animal farming systems to create environmental, economic, and social benefits.</p>
                    </div>
                 </li>
              </ul>
            </div>

            {/* Illustrative Block */}
            <div className="relative">
               <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 translate-x-4 translate-y-4"></div>
               <div className="aspect-[4/5] bg-green-900 border border-emerald-800 relative z-10 p-2">
                  <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000" alt="Sustainable Earth" className="w-full h-full object-cover grayscale-[30%]" />
               </div>
            </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="bg-green-950 border-t border-emerald-900/50 py-12 text-center text-green-200/50 text-sm font-light uppercase tracking-widest relative z-10">
         A Project Devdar Initiative. Protect Mother Nature.
      </footer>
    </div>
  );
};

export default EarthRevolution;
