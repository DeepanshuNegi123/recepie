import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ClockIcon, 
  UserGroupIcon, 
  BookmarkIcon, 
  ShoppingBagIcon, 
  HeartIcon, 
  ArrowRightOnRectangleIcon, 
  XMarkIcon,
  CheckIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import { useUser } from '../../context/usercontext';
import api from '../../services/api';
import { fetchMyKitchen, fetchFavorites, toggleFavorite, deleteRecipe } from '../../services/recipeservices';
import { fetchMyOrders } from '../../services/orderservices';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop',
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user: contextUser, setUser: setContextUser, logout } = useUser();

  const [activeTab, setActiveTab] = useState('recipes'); // 'recipes' | 'saved' | 'orders'
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tab Data States
  const [myRecipes, setMyRecipes] = useState([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [savedLoading, setSavedLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Edit Profile Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: '',
    bio: '',
    avatar: ''
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Load Profile from backend
  const loadProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/auth/profile');
      if (res.data?.user) {
        setProfileData(res.data.user);
        setEditForm({
          username: res.data.user.username || '',
          bio: res.data.user.bio || '',
          avatar: res.data.user.avatar || ''
        });
        setContextUser(res.data.user);
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  // Load My Recipes
  const loadMyRecipes = async () => {
    try {
      setRecipesLoading(true);
      const data = await fetchMyKitchen();
      setMyRecipes(Array.isArray(data) ? data : (data.recipes || []));
    } catch (err) {
      console.error('Error fetching my kitchen:', err);
    } finally {
      setRecipesLoading(false);
    }
  };

  // Load Saved Recipes
  const loadSavedRecipes = async () => {
    try {
      setSavedLoading(true);
      const data = await fetchFavorites();
      setSavedRecipes(Array.isArray(data) ? data : (data.recipes || []));
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setSavedLoading(false);
    }
  };

  // Load Orders
  const loadOrders = async () => {
    try {
      setOrdersLoading(true);
      const data = await fetchMyOrders();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    loadMyRecipes();
    loadSavedRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === 'orders' && orders.length === 0) {
      loadOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Handle Remove / Unsave
  const handleUnsave = async (recipeId) => {
    try {
      await toggleFavorite(recipeId);
      setSavedRecipes(prev => prev.filter(r => (r._id || r.id) !== recipeId));
      setProfileData(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          saved: Math.max(0, (prev.stats?.saved || 1) - 1)
        }
      } : prev);
      toast.success('Removed from saved recipes');
    } catch (err) {
      console.error('Error unsaving recipe:', err);
      toast.error('Could not update saved recipes');
    }
  };

  // Handle Delete My Recipe
  const handleDeleteRecipe = async (recipeId) => {
    if (!window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteRecipe(recipeId);
      setMyRecipes(prev => prev.filter(r => (r._id || r.id) !== recipeId));
      setProfileData(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          recipes: Math.max(0, (prev.stats?.recipes || 1) - 1)
        }
      } : prev);
      toast.success('Recipe deleted successfully');
    } catch (err) {
      console.error('Error deleting recipe:', err);
      toast.error('Failed to delete recipe');
    }
  };

  // Handle Edit Profile Submission
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editForm.username.trim()) {
      toast.error('Username cannot be empty');
      return;
    }

    try {
      setSavingProfile(true);
      const res = await api.put('/auth/profile', {
        username: editForm.username.trim(),
        bio: editForm.bio.trim(),
        avatar: editForm.avatar.trim()
      });

      if (res.data?.user) {
        const updated = res.data.user;
        setProfileData(prev => ({
          ...prev,
          username: updated.username,
          bio: updated.bio,
          avatar: updated.avatar
        }));
        setContextUser(prev => ({
          ...prev,
          username: updated.username,
          bio: updated.bio,
          avatar: updated.avatar
        }));
        localStorage.setItem('user', JSON.stringify({
          ...(contextUser || {}),
          username: updated.username,
          avatar: updated.avatar
        }));
        toast.success('Profile updated successfully');
        setIsEditModalOpen(false);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      toast.error(err.response?.data?.message || err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center pt-24 pb-20">
        <div className="text-center animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="mt-4 font-medium text-brand-700 tracking-widest uppercase text-xs">
            Opening your profile...
          </p>
        </div>
      </div>
    );
  }

  // Unauthenticated view
  if (!token || !profileData) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 pt-24 pb-20">
        <div className="max-w-md w-full bg-white border border-brand-200 p-8 md:p-10 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-brand-100 rounded-full flex items-center justify-center text-primary">
            <BookmarkIcon className="h-8 w-8" />
          </div>
          <h2 className="text-3xl text-brand-900 mb-3">Sign in Required</h2>
          <p className="text-brand-600 font-light text-sm mb-8 leading-relaxed">
            Please log in to manage your culinary profile, view your personal kitchen recipes, favorites, and orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/login" className="btn-primary flex-1 py-3 text-xs uppercase tracking-widest">
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary flex-1 py-3 text-xs uppercase tracking-widest">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = profileData;
  const memberDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'October 2026';

  const avatarSrc = user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'Chef')}&background=c5b497&color=fff&size=200`;

  const totalLikes = user.stats?.totalLikes ?? myRecipes.reduce((sum, r) => sum + (r.favorites?.length || 0), 0);
  const recipesCount = myRecipes.length || user.stats?.recipes || 0;
  const savedCount = savedRecipes.length || user.stats?.saved || 0;

  return (
    <div className="min-h-screen bg-brand-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PROFILE HEADER CARD */}
        <div className="bg-white border border-brand-200 shadow-sm p-6 sm:p-10 mb-8 transition-all">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            
            {/* Avatar & User Details */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 flex-1">
              <div className="relative group shrink-0">
                <img
                  src={avatarSrc}
                  alt={user.username}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-brand-300 shadow-sm"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'Chef')}&background=c5b497&color=fff&size=200`;
                  }}
                />
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  aria-label="Edit Profile"
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow border border-brand-300 text-brand-700 hover:text-primary transition"
                  title="Change avatar"
                >
                  <PencilSquareIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  <h1 className="text-3xl sm:text-4xl text-brand-900 font-bold">
                    {user.username}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] tracking-widest font-semibold uppercase bg-brand-100 text-brand-800 border border-brand-200">
                    <SparklesIcon className="w-3 h-3 text-primary" />
                    Artisan Chef
                  </span>
                </div>

                <p className="text-xs font-medium uppercase tracking-wider text-brand-500">
                  {user.email} • Member since {memberDate}
                </p>

                <p className="text-brand-700 font-light text-sm pt-1 max-w-2xl leading-relaxed">
                  {user.bio || 'Passionate cook and culinary explorer. Sharing delicious recipes and wholesome ingredients.'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-3 shrink-0">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="btn-secondary py-2.5 px-5 text-xs uppercase tracking-wider flex items-center gap-2 w-full sm:w-auto"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Edit Profile
              </button>

              <Link
                to="/create"
                className="btn-primary py-2.5 px-5 text-xs uppercase tracking-wider flex items-center gap-1.5 w-full sm:w-auto text-center"
              >
                <PlusIcon className="h-4 w-4 stroke-2" />
                Add Recipe
              </Link>

              <button
                onClick={handleLogout}
                className="p-2.5 text-brand-500 hover:text-red-600 transition border border-brand-200 hover:border-red-200 hover:bg-red-50"
                title="Sign Out"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* STATS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-brand-100">
            <button 
              onClick={() => setActiveTab('recipes')}
              className={`p-4 text-center transition border ${activeTab === 'recipes' ? 'bg-brand-50 border-brand-300' : 'bg-white border-brand-100 hover:bg-brand-50/60'}`}
            >
              <span className="block text-2xl sm:text-3xl font-bold text-brand-900">
                {recipesCount}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                My Recipes
              </span>
            </button>

            <button 
              onClick={() => setActiveTab('saved')}
              className={`p-4 text-center transition border ${activeTab === 'saved' ? 'bg-brand-50 border-brand-300' : 'bg-white border-brand-100 hover:bg-brand-50/60'}`}
            >
              <span className="block text-2xl sm:text-3xl font-bold text-brand-900">
                {savedCount}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                Saved Recipes
              </span>
            </button>

            <div className="p-4 text-center border border-brand-100 bg-white">
              <span className="block text-2xl sm:text-3xl font-bold text-primary">
                {totalLikes}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                Total Likes
              </span>
            </div>

            <button 
              onClick={() => setActiveTab('orders')}
              className={`p-4 text-center transition border ${activeTab === 'orders' ? 'bg-brand-50 border-brand-300' : 'bg-white border-brand-100 hover:bg-brand-50/60'}`}
            >
              <span className="block text-2xl sm:text-3xl font-bold text-brand-900">
                {orders.length}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-600">
                Shop Orders
              </span>
            </button>
          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex border-b border-brand-300 mb-8 bg-white shadow-sm">
          <button
            onClick={() => setActiveTab('recipes')}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'recipes'
                ? 'border-primary text-primary font-bold bg-brand-50/50'
                : 'border-transparent text-brand-600 hover:text-brand-900'
            }`}
          >
            My Recipes ({myRecipes.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'saved'
                ? 'border-primary text-primary font-bold bg-brand-50/50'
                : 'border-transparent text-brand-600 hover:text-brand-900'
            }`}
          >
            Saved Recipes ({savedRecipes.length})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-primary text-primary font-bold bg-brand-50/50'
                : 'border-transparent text-brand-600 hover:text-brand-900'
            }`}
          >
            Order History {orders.length > 0 && `(${orders.length})`}
          </button>
        </div>

        {/* TAB 1: MY RECIPES */}
        {activeTab === 'recipes' && (
          <div>
            {recipesLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                <p className="mt-3 text-xs uppercase tracking-widest text-brand-600">Loading your creations...</p>
              </div>
            ) : myRecipes.length === 0 ? (
              <div className="bg-white border border-brand-200 p-12 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-100 rounded-full flex items-center justify-center text-brand-600">
                  <PlusIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl text-brand-900 mb-2">No recipes published yet</h3>
                <p className="text-brand-600 text-sm max-w-md mx-auto mb-6 font-light">
                  Share your favorite dishes, traditional family treasures, and secret spices with the community.
                </p>
                <Link to="/create" className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest">
                  Create Your First Recipe
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {myRecipes.map((recipe) => (
                  <div 
                    key={recipe._id || recipe.id}
                    className="group bg-white border border-brand-200 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <div className="relative h-52 overflow-hidden bg-brand-100">
                        <img
                          src={recipe.imageUrl || recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop'}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {recipe.category && (
                          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-brand-200">
                            {recipe.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <Link to={`/recipes/${recipe._id || recipe.id}`}>
                          <h3 className="text-xl text-brand-900 group-hover:text-primary transition-colors line-clamp-1 mb-2">
                            {recipe.title}
                          </h3>
                        </Link>

                        <p className="text-brand-600 text-xs font-light line-clamp-2 mb-4">
                          {recipe.description || 'A delicious home-cooked recipe prepared with fresh ingredients.'}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-brand-500 uppercase tracking-wider font-medium">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4 text-brand-400" />
                            {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min
                          </span>
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4 text-brand-400" />
                            {recipe.servings || 1} serv
                          </span>
                          <span className="flex items-center gap-1 text-red-600">
                            <HeartSolid className="h-4 w-4 text-red-500" />
                            {recipe.favorites?.length || 0}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 pt-3 border-t border-brand-100 flex items-center justify-between bg-brand-50/40">
                      <Link
                        to={`/recipes/${recipe._id || recipe.id}`}
                        className="text-xs font-semibold uppercase tracking-wider text-brand-800 hover:text-primary transition"
                      >
                        View Details →
                      </Link>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/recipes/${recipe._id || recipe.id}/edit`}
                          className="p-1.5 text-brand-600 hover:text-primary transition"
                          title="Edit Recipe"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteRecipe(recipe._id || recipe.id)}
                          className="p-1.5 text-brand-400 hover:text-red-600 transition"
                          title="Delete Recipe"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SAVED RECIPES */}
        {activeTab === 'saved' && (
          <div>
            {savedLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                <p className="mt-3 text-xs uppercase tracking-widest text-brand-600">Loading your favorites...</p>
              </div>
            ) : savedRecipes.length === 0 ? (
              <div className="bg-white border border-brand-200 p-12 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-100 rounded-full flex items-center justify-center text-primary">
                  <BookmarkIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl text-brand-900 mb-2">No saved recipes</h3>
                <p className="text-brand-600 text-sm max-w-md mx-auto mb-6 font-light">
                  Browse community creations and tap the heart icon to curate your personal collection of culinary inspirations.
                </p>
                <Link to="/home" className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest">
                  Explore Recipes
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedRecipes.map((recipe) => (
                  <div
                    key={recipe._id || recipe.id}
                    className="group bg-white border border-brand-200 hover:shadow-md transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Image & Unsave button */}
                      <div className="relative h-52 overflow-hidden bg-brand-100">
                        <img
                          src={recipe.imageUrl || recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&auto=format&fit=crop'}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={() => handleUnsave(recipe._id || recipe.id)}
                          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full text-red-600 shadow transition"
                          title="Remove from saved"
                        >
                          <HeartSolid className="h-4 w-4" />
                        </button>
                        {recipe.category && (
                          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-brand-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider border border-brand-200">
                            {recipe.category}
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <Link to={`/recipes/${recipe._id || recipe.id}`}>
                          <h3 className="text-xl text-brand-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
                            {recipe.title}
                          </h3>
                        </Link>
                        <p className="text-[11px] uppercase tracking-wider font-medium text-brand-500 mb-3">
                          By {recipe.author?.username || 'Artisan Chef'}
                        </p>
                        <p className="text-brand-600 text-xs font-light line-clamp-2 mb-4">
                          {recipe.description || 'Authentic dish prepared with fresh seasonal ingredients.'}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-brand-500 uppercase tracking-wider font-medium">
                          <span className="flex items-center gap-1">
                            <ClockIcon className="h-4 w-4 text-brand-400" />
                            {(recipe.prepTime || 0) + (recipe.cookTime || 0)} min
                          </span>
                          <span className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4 text-brand-400" />
                            {recipe.servings || 1} serv
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-3 border-t border-brand-100 flex items-center justify-between bg-brand-50/40">
                      <Link
                        to={`/recipes/${recipe._id || recipe.id}`}
                        className="btn-secondary py-1.5 px-4 text-[11px] uppercase tracking-wider w-full text-center"
                      >
                        View Full Recipe
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ORDER HISTORY */}
        {activeTab === 'orders' && (
          <div>
            {ordersLoading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                <p className="mt-3 text-xs uppercase tracking-widest text-brand-600">Retrieving order records...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white border border-brand-200 p-12 text-center shadow-sm">
                <div className="w-14 h-14 mx-auto mb-4 bg-brand-100 rounded-full flex items-center justify-center text-brand-700">
                  <ShoppingBagIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl text-brand-900 mb-2">No orders placed yet</h3>
                <p className="text-brand-600 text-sm max-w-md mx-auto mb-6 font-light">
                  Order organic, zero-chemical pantry staples, heritage grains, and cold-pressed oils from our Organicwill shop.
                </p>
                <Link to="/organicwill" className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest">
                  Visit Organicwill Shop
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => {
                  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  });
                  const shortId = (order._id || '').slice(-8).toUpperCase();

                  return (
                    <div
                      key={order._id}
                      className="bg-white border border-brand-200 p-6 shadow-sm flex flex-col md:flex-row justify-between gap-6"
                    >
                      {/* Left: Info & Items */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-lg font-bold text-brand-900">
                            Order #{shortId}
                          </span>
                          <span className="text-xs text-brand-500 uppercase tracking-wider">
                            {orderDate}
                          </span>
                          <span className={`text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-bold rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status || 'Processing'}
                          </span>
                        </div>

                        {/* Items List */}
                        <div className="border-l-2 border-brand-200 pl-4 space-y-1.5">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm text-brand-800 max-w-md">
                              <span>
                                {item.name} <span className="text-brand-500 font-normal">x{item.quantity}</span>
                              </span>
                              <span className="font-semibold">
                                ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Delivery Details */}
                        {order.deliveryDetails && (
                          <div className="text-xs text-brand-600 font-light space-y-0.5 pt-1">
                            <p><strong className="font-semibold text-brand-800">Address:</strong> {order.deliveryDetails.address}</p>
                            <p><strong className="font-semibold text-brand-800">Phone:</strong> {order.deliveryDetails.phone}</p>
                            {order.deliveryDetails.notes && (
                              <p><strong className="font-semibold text-brand-800">Notes:</strong> "{order.deliveryDetails.notes}"</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Right: Total Price */}
                      <div className="flex flex-col justify-between items-start md:items-end md:text-right border-t md:border-t-0 md:border-l border-brand-100 pt-4 md:pt-0 md:pl-6 shrink-0 min-w-[140px]">
                        <div>
                          <span className="text-[10px] text-brand-500 uppercase tracking-widest font-semibold block">
                            Total Price
                          </span>
                          <span className="text-2xl font-bold text-brand-900">
                            ${Number(order.totalPrice || 0).toFixed(2)}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-brand-600 bg-brand-50 px-2.5 py-1 border border-brand-200 mt-3 inline-block">
                          Cash on Delivery
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-brand-300 w-full max-w-lg p-6 sm:p-8 shadow-xl relative animate-slide-up">
            
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-5 right-5 text-brand-400 hover:text-brand-800 transition"
              title="Close"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-2xl sm:text-3xl text-brand-900 mb-2 font-bold">
              Edit Culinary Profile
            </h2>
            <p className="text-brand-600 text-xs font-light uppercase tracking-wider mb-6">
              Update your public display name, biography, and avatar.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-5">
              
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                  Display Name / Username
                </label>
                <input
                  type="text"
                  value={editForm.username}
                  onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                  className="input-field"
                  placeholder="e.g. MasterChef"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="input-field resize-none"
                  placeholder="Tell fellow foodies about your cooking style, favorite cuisines..."
                />
              </div>

              {/* Avatar URL or Preset */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-700 mb-1.5">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={editForm.avatar}
                  onChange={(e) => setEditForm({ ...editForm, avatar: e.target.value })}
                  className="input-field"
                  placeholder="https://example.com/avatar.jpg"
                />

                {/* Quick Presets */}
                <div className="mt-3">
                  <span className="text-[11px] text-brand-500 uppercase tracking-widest font-semibold block mb-2">
                    Or select an artisan avatar:
                  </span>
                  <div className="flex gap-2">
                    {AVATAR_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setEditForm({ ...editForm, avatar: preset })}
                        className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition ${
                          editForm.avatar === preset ? 'border-primary ring-2 ring-primary/30' : 'border-brand-200 hover:border-brand-400'
                        }`}
                      >
                        <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                        {editForm.avatar === preset && (
                          <div className="absolute inset-0 bg-primary/40 flex items-center justify-center text-white">
                            <CheckIcon className="w-4 h-4 stroke-2" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-brand-200">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={savingProfile}
                  className="btn-secondary py-2.5 px-5 text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProfilePage;