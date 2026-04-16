import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';

const OrganicwillShop = () => {
  // Dummy products representing vendor catalogue
  const products = [
    { id: 1, name: 'Cold-Pressed Olive Oil', vendor: 'Organicwill Farms', price: '$24.00', tag: 'Bestseller' },
    { id: 2, name: 'Heirloom Tomato Seeds', vendor: 'Organicwill Farms', price: '$5.50', tag: 'New' },
    { id: 3, name: 'Aged Balsamic Vinegar', vendor: 'Organicwill Farms', price: '$18.00', tag: '' },
    { id: 4, name: 'Hand-harvested Sea Salt', vendor: 'Organicwill Farms', price: '$12.00', tag: '' },
    { id: 5, name: 'Wildflower Honey', vendor: 'Organicwill Farms', price: '$16.50', tag: 'Organic' },
    { id: 6, name: 'Artisan Sourdough Starter', vendor: 'Organicwill Farms', price: '$9.00', tag: '' },
  ];

  return (
    <div className="min-h-screen bg-brand-50 font-sans flex flex-col">
      {/* Absolute Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-brand-400 hover:text-white transition uppercase tracking-widest text-sm font-semibold">
           <FaArrowLeft /> Back to Hub
        </Link>
        <div className="font-display font-bold text-2xl tracking-wide text-white flex items-center gap-2">
          <FaLeaf className="text-primary" />
          Organicwill
        </div>
      </nav>

      {/* Top Banner */}
      <div className="bg-brand-900 text-brand-50 py-16 px-4 text-center relative overflow-hidden pt-32">
        <div className="max-w-4xl mx-auto relative z-10 mt-8">
            <FaLeaf className="text-4xl text-primary mx-auto mb-6" />
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4">Organicwill</h1>
            <p className="text-xl text-brand-200 font-light max-w-2xl mx-auto">
              Our verified trusted partner network. Shop fresh, organic, and authentic culinary ingredients directly from the makers.
            </p>
        </div>
      </div>

      {/* Main Shop Interface */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Sidebar Filters */}
        <div className="col-span-1 hidden md:block">
            <h3 className="font-display italic text-2xl text-brand-900 mb-6 border-b border-brand-200 pb-2">Categories</h3>
            <ul className="space-y-4 text-brand-700 font-light">
                <li className="hover:text-primary cursor-pointer transition">All Products</li>
                <li className="hover:text-primary cursor-pointer transition">Oils & Vinegars</li>
                <li className="hover:text-primary cursor-pointer transition">Seeds & Spices</li>
                <li className="hover:text-primary cursor-pointer transition">Pantry Essentials</li>
            </ul>

            <h3 className="font-display italic text-2xl text-brand-900 mb-6 border-b border-brand-200 pb-2 mt-12">Partners</h3>
            <ul className="space-y-4 text-brand-700 font-light">
                <li className="hover:text-primary cursor-pointer transition font-semibold text-brand-900">Organicwill Farms</li>
                <li className="hover:text-primary cursor-pointer transition">The Tuscan Grove</li>
                <li className="hover:text-primary cursor-pointer transition">Himalayan Naturals</li>
            </ul>
        </div>

        {/* Products Grid */}
        <div className="col-span-1 md:col-span-3">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-200">
                <h2 className="text-xl uppercase tracking-widest text-brand-800 font-semibold">Featured Items</h2>
                <span className="text-sm text-brand-500">{products.length} Results</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(item => (
                    <div key={item.id} className="group bg-white border border-brand-200 flex flex-col hover:border-brand-400 transition cursor-pointer">
                        {/* Image Placeholder */}
                        <div className="aspect-square bg-brand-100 flex items-center justify-center relative">
                            {item.tag && (
                                <span className="absolute top-4 left-4 bg-primary text-white text-xs uppercase tracking-widest px-3 py-1 font-semibold">
                                    {item.tag}
                                </span>
                            )}
                            <FaShoppingBag className="text-4xl text-brand-300 group-hover:text-primary transition duration-500 group-hover:scale-110" />
                        </div>
                        {/* Info */}
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="font-bold text-brand-900 text-lg mb-1">{item.name}</h3>
                            <p className="text-sm text-brand-500 mb-4">{item.vendor}</p>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="font-display text-2xl font-bold text-brand-900">{item.price}</span>
                                <button className="text-xs uppercase tracking-widest border border-brand-300 px-4 py-2 font-semibold hover:bg-brand-900 hover:text-white transition">
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

    </div>
  );
};

export default OrganicwillShop;
