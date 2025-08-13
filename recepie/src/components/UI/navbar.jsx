import { Link, NavLink } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, HeartIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-yellow-600 font-bold text-xl">RecipeBook</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`
              }
            >
              <HomeIcon className="h-5 w-5 mr-1" />
              Home
            </NavLink>
            
            <NavLink 
              to="/mykitchen" 
              className={({ isActive }) => 
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`
              }
            >
              <BookOpenIcon className="h-5 w-5 mr-1" />
              My Kitchen
            </NavLink>
            
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`
              }
            >
              <HeartIcon className="h-5 w-5 mr-1" />
              Favorites
            </NavLink>
            
            <NavLink 
              to="/create" 
              className={({ isActive }) => 
                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${isActive ? 'border-yellow-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`
              }
            >
              <PlusIcon className="h-5 w-5 mr-1" />
              Add Recipe
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            className="block pl-3 pr-4 py-2 border-l-4 border-yellow-500 text-base font-medium text-yellow-700 bg-yellow-50"
          >
            Home
          </NavLink>
          <NavLink
            to="/mykitchen"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            My Kitchen
          </NavLink>
          <NavLink
            to="/favorites"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Favorites
          </NavLink>
          <NavLink
            to="/create"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Add Recipe
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;