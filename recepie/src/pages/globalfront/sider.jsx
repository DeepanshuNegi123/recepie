import { useSelector, useDispatch } from "react-redux";
import { toggle } from "../../services/slice/toggleslice";
import { Link } from "react-router-dom";
import { 
  FiX, 
  FiSearch, 
  FiArrowRight, 
} from "react-icons/fi";
import { 
  LuLeaf, 
  LuGlobe, 
  LuMessageCircle 
} from "react-icons/lu";
import { useState, useEffect } from "react";

function Sidebar() {
  const dispatch = useDispatch();
  const isopen = useSelector((state) => state.toggle.value);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isopen]);

  if (!isopen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex flex-col bg-white animate-fade-in">
      {/* HEADER SECTION */}
      <div className="w-full bg-white px-10 py-6 flex flex-col md:flex-row items-center border-b border-brand-200 z-10 gap-8">
        
        {/* Logo */}
        <h1 className="font-display italic text-3xl md:text-4xl text-brand-900 flex items-center gap-2 whitespace-nowrap">
          Recipe Book
        </h1>

        {/* Search Input */}
        <div className="relative w-full max-w-3xl flex-1">
          <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-500" size={20} />
          <input
            type="text"
            placeholder="Search recipes, artisans, ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 border border-brand-300 rounded-none text-base outline-none bg-brand-50 focus:bg-white focus:ring-0 focus:border-brand-500 transition-all font-light shadow-inner"
          />
          {/* Mock Search Results Area */}
          {searchTerm && (
            <div className="absolute top-16 left-0 w-full bg-white border border-brand-200 p-8 shadow-sm animate-slide-up">
              <p className="m-0 text-brand-600 font-light">
                Showing results for "<strong className="text-brand-900">{searchTerm}</strong>"...
              </p>
            </div>
          )}
        </div>
        
        {/* Close button on mobile */}
        <button
          onClick={() => dispatch(toggle())}
          className="md:hidden p-2 text-brand-500 hover:text-primary transition-colors focus:outline-none"
        >
          <FiX size={32} />
        </button>
      </div>

      {/* MAIN SPLIT LAYOUT */}
      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[35%] bg-white p-10 md:p-16 overflow-y-auto flex flex-col hide-scrollbar border-r border-brand-200">
          
          <div className="text-xs font-semibold tracking-widest mb-3 text-brand-500 uppercase mt-2">
            Explore
          </div>
          <h2 className="font-display italic text-4xl mb-12 text-brand-900">
            Our Philosophy
          </h2>

          <div className="mb-12 pb-10 border-b border-brand-200">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-8">Curated Links</h2>
            <div className="flex flex-col gap-6">
              {['Seasonal Picks', 'Artisan Origins', 'Farm to Table', 'Preservation'].map((linkText, idx) => (
                <Link to="/home" key={idx} className="group flex items-center justify-between" onClick={() => dispatch(toggle())}>
                  <span className="text-xl font-light text-brand-800 group-hover:text-primary transition-all">
                    {linkText}
                  </span>
                  <FiArrowRight className="text-brand-400 group-hover:text-primary transition-colors transform group-hover:translate-x-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Priority Items */}
          <div className="flex flex-col gap-8 mb-16">
            {[
              { label: 'SUSTAINABILITY', icon: LuLeaf },
              { label: 'LOCAL MARKETS', icon: LuGlobe },
              { label: 'GATHERINGS', icon: LuMessageCircle },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center cursor-pointer group hover:bg-brand-50 p-4 -mx-4 transition-colors">
                <span className="text-sm font-semibold tracking-widest uppercase text-brand-800 group-hover:text-primary">{item.label}</span>
                <div className="text-brand-400 group-hover:text-primary transition-colors">
                  <item.icon size={24} />
                </div>
              </div>
            ))}
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-xs font-semibold tracking-widest uppercase mb-6 text-brand-500">Categories</h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Rustic", "Foraging", "Fermentation",
                "Heirloom", "Wood-fired", "Slow Roast",
                "Pantry", "Herb Garden", "Preserves"
              ].map((topic) => (
                <span
                  key={topic}
                  className="px-5 py-2 border border-brand-200 text-xs tracking-widest uppercase font-semibold text-brand-600 cursor-pointer hover:bg-brand-50 hover:border-brand-400 hover:text-brand-900 transition-all"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[65%] bg-brand-50 p-10 md:p-20 relative overflow-y-auto text-brand-900 hide-scrollbar">
          
          {/* Close Button Desktop */}
          <button
            onClick={() => dispatch(toggle())}
            className="hidden md:flex absolute top-10 right-10 p-4 border border-brand-300 text-brand-600 hover:text-primary hover:border-primary transition-colors items-center justify-center bg-white"
          >
            <FiX size={28} />
          </button>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 mt-4 max-w-5xl">
            
            {/* Column 1 */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-brand-500 mb-4 font-semibold">About Us</div>
              <h3 className="font-display italic text-3xl text-brand-900 mb-8 flex items-center gap-2 cursor-pointer group">
                Community <FiArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform text-brand-400 group-hover:text-primary" />
              </h3>
              <ul className="space-y-4 text-brand-700 font-light text-lg">
                {["Our Heritage", "The Collective", "Contribute", "Journal"].map((item) => (
                  <li key={item} className="cursor-pointer hover:text-primary transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-brand-500 mb-4 font-semibold">Gather</div>
              <h3 className="font-display italic text-3xl text-brand-900 mb-8 flex items-center gap-2 cursor-pointer group">
                Events <FiArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform text-brand-400 group-hover:text-primary" />
              </h3>
              <ul className="space-y-4 text-brand-700 font-light text-lg">
                {["Farmers Markets", "Workshops", "Supper Clubs", "Harvest Festivals"].map((item) => (
                  <li key={item} className="cursor-pointer hover:text-primary transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-brand-500 mb-4 font-semibold">Resources</div>
              <h3 className="font-display italic text-3xl text-brand-900 mb-8 flex items-center gap-2 cursor-pointer group">
                Library <FiArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform text-brand-400 group-hover:text-primary" />
              </h3>
              <ul className="space-y-4 text-brand-700 font-light text-lg">
                {["Techniques", "Ingredient Index", "Cookbooks", "Tools & Craft"].map((item) => (
                  <li key={item} className="cursor-pointer hover:text-primary transition-colors">{item}</li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <div className="text-[10px] uppercase tracking-widest text-brand-500 mb-4 font-semibold">Contact</div>
              <h3 className="font-display italic text-3xl text-brand-900 mb-8 flex items-center gap-2 cursor-pointer group">
                Connect <FiArrowRight size={20} className="transform group-hover:translate-x-2 transition-transform text-brand-400 group-hover:text-primary" />
              </h3>
              <ul className="space-y-4 text-brand-700 font-light text-lg">
                {["Say Hello", "Partnerships", "Support", "Visit Us"].map((item) => (
                  <li key={item} className="cursor-pointer hover:text-primary transition-colors">{item}</li>
                ))}
              </ul>
            </div>

          </div>

          {/* Footer of Sidebar */}
          <div className="mt-32 pt-10 border-t border-brand-200 flex justify-between items-center text-brand-600">
            <div className="font-light text-sm tracking-wide">© 2026 Recipe Book. All rights reserved.</div>
            <div className="text-xs font-semibold uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">
              Terms & Privacy
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Sidebar;