

import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaInstagram, FaYoutube, FaEnvelope, FaLinkedin } from 'react-icons/fa';
import { TreePine } from 'lucide-react';
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-brand-50 flex flex-col font-sans ">
      
      {/* Navbar overlay for Landing */}
      <nav className="sticky  bg-brand-50  top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <div className="font-display font-bold text-3xl tracking-wide text-brand-900 border-b border-brand-900 pb-1">
          Recipe Book
        </div>
        <div className="flex items-center gap-6">
           <Link to="/organicwill" className="text-brand-800 uppercase tracking-widest text-sm font-semibold hover:text-primary transition hidden md:block">Shop</Link>
           <button className="text-brand-800 uppercase tracking-widest text-sm font-semibold hover:text-primary transition hidden md:block">Donation</button>
           <Link to="/search" className="text-brand-800 hover:text-primary transition"><FaSearch className="text-xl" /></Link>
           <div className="h-6 w-px bg-brand-300 hidden md:block"></div>
           <Link to="/login" className="text-brand-800 uppercase tracking-widest text-sm font-semibold hover:text-primary transition">Sign In</Link>
           <Link to="/register" className="btn-primary px-8 hidden sm:block">Join the table</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center relative overflow-hidden mt-6">
        <div className="max-w-6xl mx-auto px-4 z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-start gap-8">
            <h1 className="font-display text-6xl md:text-8xl text-brand-900 leading-tight">
              Good, <br/> Clean, <br/> & Fair.
            </h1>
            <p className="text-xl text-brand-700 max-w-md font-light leading-relaxed">
              Discover authentic recipes from around the globe. Join a community dedicated to preserving culinary traditions and eating mindfully.
            </p>
            <div className="flex gap-4 pt-4">
               <Link to="/home" className="btn-primary py-4 px-10 text-base">
                 Explore Recipes
               </Link>
            </div>
            
            <div className="pt-12 flex gap-8 text-brand-600 font-display italic">
              <div>
                 <span className="block text-3xl font-bold text-brand-900 not-italic">10k+</span>
                 Artisan Recipes
              </div>
              <div>
                 <span className="block text-3xl font-bold text-brand-900 not-italic">50k+</span>
                 Community Members
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="pt-2 flex gap-6 text-brand-400 text-xl">
               <a href="#" className="hover:text-primary transition"><FaInstagram /></a>
               <a href="#" className="hover:text-primary transition"><FaYoutube /></a>
               <a href="#" className="hover:text-primary transition"><FaEnvelope /></a>
               <a href="#" className="hover:text-primary transition"><FaLinkedin /></a>
            </div>
          </div>

          <div className="relative hidden md:block">
             <div className="absolute inset-0 bg-brand-200 transform rounded-none rotate-3 scale-105 z-0"></div>
             <img 
               src="https://images.unsplash.com/photo-1495195134817-a165fc0f4e2d?q=80&w=2000&auto=format&fit=crop" 
               alt="Rustic dining table filled with wholesome food" 
               className="relative z-10 w-full h-[700px] object-cover shadow-2xl grayscale-[20%]"
             />
          </div>

        </div>

      </main>

      {/* 2. How Does the Network Work Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display italic text-5xl text-brand-900 mb-16 text-center">
            How does the network work?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="p-8 border border-brand-200 bg-brand-50 hover:bg-brand-100 transition duration-300">
              <span className="text-4xl font-display text-primary block mb-6">01.</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Discover</h3>
              <p className="text-brand-700 font-light leading-relaxed">
                Explore an extensive library of curated, artisan recipes rooted in tradition and wellness.
              </p>
            </div>
            {/* Step 2 */}
            <div className="p-8 border border-brand-200 bg-brand-50 hover:bg-brand-100 transition duration-300">
              <span className="text-4xl font-display text-primary block mb-6">02.</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Connect</h3>
              <p className="text-brand-700 font-light leading-relaxed">
                Engage with a global community of food lovers, chefs, and local advocates in the Chef's Exchange.
              </p>
            </div>
            {/* Step 3 */}
            <div className="p-8 border border-brand-200 bg-brand-50 hover:bg-brand-100 transition duration-300">
              <span className="text-4xl font-display text-primary block mb-6">03.</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Contribute</h3>
              <p className="text-brand-700 font-light leading-relaxed">
                Share your own culinary heritage, build your personal kitchen, and gather feedback on your creations.
              </p>
            </div>
            {/* Step 4 */}
            <div className="p-8 border border-brand-200 bg-brand-50 hover:bg-brand-100 transition duration-300">
              <span className="text-4xl font-display text-primary block mb-6">04.</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-4">Sustain</h3>
              <p className="text-brand-700 font-light leading-relaxed">
                Support sustainable practices, fair food systems, and culinary longevity through collective action.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Join The Network Section */}
      <section className="py-24 bg-brand-900 text-brand-50 relative overflow-hidden">
        {/* Subtle decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full border border-brand-800 opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display italic text-5xl md:text-6xl mb-8 leading-tight">
            Join Recipe Book. <br /> Stand for authentic food.
          </h2>
          <p className="text-xl text-brand-200 font-light mb-12 max-w-2xl mx-auto">
            Become a part of a global movement transforming the way we talk about, share, and consume our meals.
          </p>
          <div className="flex justify-center gap-6">
            <Link to="/register" className="bg-brand-50 text-brand-900 font-semibold px-10 py-4 uppercase tracking-widest text-sm hover:bg-white transition shadow-lg">
              Become a Member
            </Link>
            <Link to="/home" className="border border-brand-400 text-brand-50 font-semibold px-10 py-4 uppercase tracking-widest text-sm hover:bg-brand-800 transition">
              Explore First
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Latest News Section */}
      <section className="py-24 bg-brand-50 border-t border-brand-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display italic text-5xl text-brand-900">Latest News & Events</h2>
            <Link to="/home" className="text-sm font-semibold uppercase tracking-widest text-brand-600 hover:text-primary transition pb-2 border-b border-brand-300">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group cursor-pointer">
              <div className="h-64 bg-brand-200 mb-6 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" alt="Farmer Market" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition duration-700" />
              </div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">Community</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-3 group-hover:text-primary transition">The Return of Local Farmers Markets</h3>
              <p className="text-brand-600 font-light line-clamp-3">Supporting local agriculture is the backbone of the slow food movement. Join us as we explore the revival of seasonal markets.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="h-64 bg-brand-200 mb-6 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=800" alt="Cooking Masterclass" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition duration-700" />
              </div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">Events</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-3 group-hover:text-primary transition">Artisan Bread Baking Masterclass</h3>
              <p className="text-brand-600 font-light line-clamp-3">Master the art of sourdough with Chef Maria in our upcoming weekend intensive workshop series.</p>
            </div>
            <div className="group cursor-pointer">
              <div className="h-64 bg-brand-200 mb-6 overflow-hidden">
                 <img src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=800" alt="Sustainable Kitchen" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition duration-700" />
              </div>
              <span className="text-xs uppercase tracking-widest text-primary font-bold mb-3 block">Editorial</span>
              <h3 className="text-2xl font-bold text-brand-900 mb-3 group-hover:text-primary transition">Building a Sustainable Kitchen</h3>
              <p className="text-brand-600 font-light line-clamp-3">Simple steps to reduce waste, source ethically, and cook with a lower carbon footprint at home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Showcase / Organicwill Products */}
      <section className="py-24 bg-white border-t border-brand-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
            <span className="block text-primary font-bold tracking-widest uppercase text-sm mb-4 mt-4">Organicwill</span>
            <h2 className="font-display italic text-5xl text-brand-900 mb-6">Our Products</h2>
            <p className="text-lg text-brand-600 font-light max-w-2xl mx-auto mb-16">
              Discover artisan ingredients from our trusted vendor network. Handcrafted, organic, and delivered to your table.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16 text-left">
              {[
                { name: "Cold-Pressed Olive Oil", price: "$24.00" },
                { name: "Aged Balsamic Vinegar", price: "$18.00" },
                { name: "Wildflower Honey", price: "$16.50" },
                { name: "Artisan Sea Salt", price: "$12.00" }
              ].map((item, index) => (
                <Link to="/organicwill" key={index} className="group block bg-brand-50 border border-brand-200 p-6 hover:border-primary transition">
                   <div className="aspect-square bg-white border border-brand-100 mb-6 flex items-center justify-center">
                     <span className="font-display italic text-brand-300 text-6xl group-hover:text-brand-400 transition">0{index + 1}</span>
                   </div>
                   <h3 className="text-lg font-bold text-brand-900 mb-1 group-hover:text-primary transition">{item.name}</h3>
                   <span className="text-primary font-display font-bold text-xl">{item.price}</span>
                </Link>
              ))}
            </div>

            <Link to="/organicwill" className="btn-primary py-4 px-12 text-base shadow-lg hover:-translate-y-1 transform transition">Visit Organicwill Shop</Link>
        </div>
      </section>




    {/* 5. Mother Earth & Conservation Section */}
      <section className="py-24 bg-green-950 text-green-50 relative overflow-hidden border-b border-green-900 border-t-8 border-t-emerald-800">
        <div className="absolute top-0 right-0 opacity-10 flex gap-4">
           {/* Abstract forest shapes in background */}
           <div className="w-96 h-96 bg-emerald-500 blur-[100px] rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <TreePine size={64} className="mx-auto mb-6 text-emerald-400 opacity-90" />
          <span className="block text-emerald-400 font-bold tracking-widest uppercase text-sm mb-4">Project Devdar</span>
          <h2 className="font-display text-5xl md:text-6xl mb-6 font-bold text-white">
            Honoring Mother Nature
          </h2>
          <p className="text-xl text-green-200 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Our mission goes beyond food. We stand to protect the wildlife, limit carbon emissions, and preserve the deep roots of our planet—like the unyielding Deodar Cedar.
          </p>
          <div className="flex justify-center">
             <Link to="/revolution" className="bg-emerald-600 text-white font-semibold px-10 py-4 uppercase tracking-widest text-sm hover:bg-emerald-500 transition shadow-lg flex items-center gap-3 rounded-sm">
               Join The Revolution <TreePine size={18} />
             </Link>
          </div>
        </div>
      </section>





      {/* 4. Contact Us Section */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-5xl font-bold mb-4">Contact Us</h2>
            <h3 className="font-display italic text-3xl text-white/90 mb-6">Get in touch</h3>
            <p className="text-lg text-white/80 font-light max-w-sm">
              Do you have any questions or comments for our team? Don't hesitate to reach out!
            </p>
          </div>
          
          <div className="p-2">
             <form className="flex flex-col gap-8">
               <div className="flex gap-8">
                 <div className="flex-1 border-b border-white/40 group">
                   <label className="text-sm font-semibold uppercase tracking-widest text-white/80 block mb-2">Name *</label>
                   <input type="text" className="w-full bg-transparent outline-none py-2 text-white placeholder-white/30" />
                 </div>
                 <div className="flex-1 border-b border-white/40 group">
                   <label className="text-sm font-semibold uppercase tracking-widest text-white/80 block mb-2">Surname *</label>
                   <input type="text" className="w-full bg-transparent outline-none py-2 text-white placeholder-white/30" />
                 </div>
               </div>
               
               <div className="flex gap-8">
                 <div className="flex-1 border-b border-white/40 group">
                   <label className="text-sm font-semibold uppercase tracking-widest text-white/80 block mb-2">Email *</label>
                   <input type="email" className="w-full bg-transparent outline-none py-2 text-white placeholder-white/30" />
                 </div>
                 <div className="flex-1 border-b border-white/40 group relative">
                   <label className="text-sm font-semibold uppercase tracking-widest text-white/80 block mb-2">Location</label>
                   <select className="w-full bg-transparent outline-none py-2 text-white appearance-none cursor-pointer">
                     <option value="" className="text-brand-900">Select...</option>
                     <option value="us" className="text-brand-900">United States</option>
                     <option value="eu" className="text-brand-900">Europe</option>
                     <option value="as" className="text-brand-900">Asia</option>
                     <option value="ot" className="text-brand-900">Other</option>
                   </select>
                 </div>
               </div>

               <div className="border-b border-white/40 group">
                 <label className="text-sm font-semibold uppercase tracking-widest text-white/80 block mb-2">Message</label>
                 <textarea rows="3" className="w-full bg-transparent outline-none py-2 text-white resize-none"></textarea>
               </div>

               <div className="flex items-start gap-4">
                 <input type="checkbox" id="privacy" className="mt-1 w-4 h-4 cursor-pointer accent-brand-900" />
                 <label htmlFor="privacy" className="text-sm text-white/80 cursor-pointer">
                   I declare that I have read and understood the <a href="#" className="underline hover:text-white">Privacy Policy</a> *
                 </label>
               </div>

               <button type="button" className="border border-white/40 py-4 font-semibold uppercase tracking-widest text-sm hover:bg-white hover:text-primary transition duration-300 mt-4 rounded-full">
                 Send Request
               </button>
             </form>
          </div>
        </div>
      </section>

  

      {/* Minimal Footer */}
      <footer className="bg-brand-900 text-brand-400 py-8 text-center text-sm font-light uppercase tracking-widest">
         © 2026 Recipe Book. All Rights Reserved.
      </footer>
    </div>
  );
};

export default LandingPage;