import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, HeartIcon, PlusIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ProfileButton from './profilebutton';
import Globe from '../UI/globe';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          
          {/* Leftside - Logo and Globe */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/globalchat" className="hover:scale-105 transition-transform opacity-70 hover:opacity-100"> 
              <Globe />
            </Link>
            
            <Link to="/" className="flex items-center">
              <span className="font-display font-bold text-3xl tracking-wide text-brand-900 border-b-2 border-transparent hover:border-primary transition-colors pb-1">
                Recipe Book
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-[15px] tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'border-primary text-brand-900 font-semibold'
                    : 'border-transparent text-brand-600 hover:text-primary'
                }`
              }
            >
              Feed
            </NavLink>

            <NavLink
              to="/mykitchen"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-[15px] tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'border-primary text-brand-900 font-semibold'
                    : 'border-transparent text-brand-600 hover:text-primary'
                }`
              }
            >
              My Kitchen
            </NavLink>

            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `inline-flex items-center px-1 pt-1 border-b-2 text-[15px] tracking-wide uppercase transition-colors ${
                  isActive
                    ? 'border-primary text-brand-900 font-semibold'
                    : 'border-transparent text-brand-600 hover:text-primary'
                }`
              }
            >
              Favorites
            </NavLink>

            <NavLink
              to="/create"
              className="btn-primary ml-4"
            >
              <PlusIcon className="h-4 w-4 mr-1 stroke-2" />
              Add Recipe
            </NavLink>
            
            <ProfileButton />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
            <ProfileButton />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn-icon"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <NavLink
              to="/home"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium transition-colors uppercase tracking-wide border-b border-brand-100 ${
                  isActive ? 'text-primary' : 'text-brand-600 hover:bg-brand-50 hover:text-primary'
                }`
              }
            >
              Feed
            </NavLink>
             <NavLink
              to="/mykitchen"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium transition-colors uppercase tracking-wide border-b border-brand-100 ${
                  isActive ? 'text-primary' : 'text-brand-600 hover:bg-brand-50 hover:text-primary'
                }`
              }
            >
              My Kitchen
            </NavLink>
            <NavLink
              to="/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 text-base font-medium transition-colors uppercase tracking-wide border-b border-brand-100 ${
                  isActive ? 'text-primary' : 'text-brand-600 hover:bg-brand-50 hover:text-primary'
                }`
              }
            >
              Favorites
            </NavLink>
            <NavLink
              to="/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                 `block px-4 py-3 text-base font-medium transition-colors uppercase tracking-wide ${
                  isActive ? 'text-primary' : 'text-brand-600 hover:bg-brand-50 hover:text-primary'
                }`
              }
            >
              Add Recipe
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
