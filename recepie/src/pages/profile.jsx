import React, { useState, useEffect, useRef } from 'react';
import { FaUser, FaUtensils, FaBookmark, FaClock, FaFire, FaHeart, FaShare, FaCamera, FaVideo, FaTrophy, FaStar, FaUsers, FaChartLine, FaSearch, FaFilter, FaSignOutAlt, FaBell, FaComments, FaGlobe, FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import getauthorisation from '../context/api';


const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [activeTab, setActiveTab] = useState('recipes');

  // ✅ WORKING: Loading and error states for auth
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ WORKING: Login form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // ✅ WORKING: UI states
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 🔴 TODO #3: UPDATE USER PROFILE STATS DYNAMICALLY
  // These stats should be calculated from real backend data, not hardcoded
  // NEEDS IMPLEMENTATION:
  // - recipes: should be myRecipes.length
  // - saved: should be savedRecipes.length
  // - followers, following: fetch from backend API
  // - totalLikes: sum of all likes from user's recipes
  // - achievements: fetch from backend based on user accomplishments




  const [user, setUser] = useState({
    name: "Johnson", // ✅ WORKING: Updated from auth API
    username: "@johnson_cooks", // 🔴 NEEDS: Fetch from backend
    bio: "🔥 Food enthusiast | 🥘 Recipe Creator | 🌱 Healthy Living Advocate\nSharing delicious recipes from around the world!", // 🔴 NEEDS: Fetch from backend
    location: "San Francisco, CA", // 🔴 NEEDS: Fetch from backend
    joinedDate: "January 2023", // 🔴 NEEDS: Fetch from backend
    recipes: 42, // 🔴 NEEDS: Calculate from myRecipes.length
    saved: 127, // 🔴 NEEDS: Calculate from savedRecipes.length
    followers: 2800, // 🔴 NEEDS: Fetch from backend
    following: 342, // 🔴 NEEDS: Fetch from backend
    totalLikes: 15400, // 🔴 NEEDS: Sum of all likes from myRecipes
    achievements: 8, // 🔴 NEEDS: Fetch from backend
    profileImage: "", // 🔴 NEEDS: Fetch from backend
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600" // 🔴 NEEDS: Fetch from backend
  });

  // 🔴 TODO #1: FETCH USER'S RECIPES FROM BACKEND
  // CURRENTLY: Using mock/dummy data
  // NEEDS IMPLEMENTATION:
  // 1. Create API endpoint: GET /api/recipes/my-recipes
  // 2. Add useEffect to fetch on component mount:
  //    useEffect(() => { fetchMyRecipes() }, [])
  // 3. Implement fetchMyRecipes function:
  //    async function fetchMyRecipes() {
  //      const response = await fetch('http://localhost:5003/api/recipes/my-recipes', {
  //        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //      });
  //      const data = await response.json();
  //      setMyRecipes(data.recipes);
  //    }


  const fetchingmyrecipes = async () => {
    try {
      const response = await fetch('http://localhost:5003/recipes/mykitchen', {
        headers: getauthorisation()
      })

      console.log(response.status);
      if (!response.ok) {
        throw new Error('Failed to fetch my recipes');
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setMyRecipes(data);
      }
      else if (data.recipes) {
        setMyRecipes(data.recipes);
      }

      else {
        setMyRecipes([]);
      }
      console.log(data);



    }


    catch (err) {

      console.log(err);
      setMyRecipes([]);

    }

  }


  const [myRecipes, setMyRecipes] = useState([

  ]);


  // 🔴 TODO #2: FETCH SAVED RECIPES FROM BACKEND
  // CURRENTLY: Using mock/dummy data
  // NEEDS IMPLEMENTATION:
  // 1. Create API endpoint: GET /api/recipes/saved
  // 2. Add useEffect to fetch on component mount
  // 3. Implement fetchSavedRecipes function similar to myRecipes
  const [savedRecipes, setSavedRecipes] = useState([

    // {
    //   id: 7,
    //   title: "Korean BBQ Tacos",
    //   author: "Chef Maria",
    //   image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    //   time: "45 min",
    //   difficulty: "Medium",
    //   likes: 5600,
    //   rating: 4.8
    // },
    // {
    //   id: 8,
    //   title: "Matcha Tiramisu",
    //   author: "Sweet Dreams Bakery",
    //   image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
    //   time: "3 hrs",
    //   difficulty: "Hard",
    //   likes: 3200,
    //   rating: 4.9
    // },
    // {
    //   id: 9,
    //   title: "Poke Bowl Perfection",
    //   author: "Ocean Kitchen",
    //   image: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=400",
    //   time: "25 min",
    //   difficulty: "Easy",
    //   likes: 2800,
    //   rating: 4.7
    // }
  ]);

  // ✅ WORKING: Static achievements display
  // 🔴 TODO: Make dynamic based on user's actual achievements from backend

  const achievements = [
    { icon: <FaTrophy />, title: "Top Creator", color: "text-yellow-500" },
    { icon: <FaFire />, title: "10K Likes", color: "text-orange-500" },
    { icon: <FaStar />, title: "Featured Chef", color: "text-purple-500" },
    { icon: <FaUsers />, title: "Community Leader", color: "text-blue-500" }
  ];


  // 🔴 TODO #4: FETCH NOTIFICATIONS FROM BACKEND
  // CURRENTLY: Using mock/dummy data
  // NEEDS IMPLEMENTATION:
  // 1. Create API endpoint: GET /api/notifications
  // 2. Fetch notifications on component mount and periodically
  // 3. Mark notifications as read when clicked
  // 4. Show unread count badge


  const [notifications, setNotifications] = useState([
    // MOCK DATA - Replace with real API data
    { text: "Sarah liked your Carbonara recipe", time: "2m ago", type: "like" },
    { text: "New follower: Mike Chen", time: "1h ago", type: "follow" },
    { text: "Your recipe was featured!", time: "3h ago", type: "feature" }
  ]);


  // ============================================================================
  // AUTHENTICATION & USER DATA
  // ============================================================================

  // ✅ WORKING: Checks if user is authenticated and fetches basic profile
  // ⚠️ PARTIAL: Only fetches username and email, needs to fetch all profile data
  // 


  const checkAuth = async () => {

    try {

      const token = localStorage.getItem('token');

      if (!token) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5003/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          setError('Session expired. Please log in again.');
        } else {
          setError('Failed to fetch profile data');
        }
        setLoading(false);
        return;
      }


      const data = await response.json();

      // ⚠️ PARTIAL: Only updates name and email
      // 🔴 NEEDS: Update all user fields (bio, location, images, stats, etc.)

      setUser(prev => ({
        ...prev,
        name: data.user.username,
        email: data.user.email,

        // 🔴 TODO: Add these fields from API response:
        // bio: data.user.bio,
        // location: data.user.location,
        // profileImage: data.user.profileImage,
        // coverImage: data.user.coverImage,
        // etc.

      }));

      setLoading(false);

    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };






  // ✅ WORKING: Runs on component mount to check authentication

  useEffect(() => {
    checkAuth();
    fetchingmyrecipes();
  }, [location.pathname]);


  // ✅ WORKING: Logout functionality

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };


  // ✅ WORKING: Login form submission

  const handleLoginSubmit = async () => {
    setLoggingIn(true);
    setLoginError('');

    try {
      const response = await fetch('http://localhost:5003/api/auth/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));


      setError('');
      setLoggingIn(false);

      // window.location.reload();
      navigate('/profile');
    } catch (err) {
      setLoginError(err.message || 'Login failed. Please check your credentials.');
      setLoggingIn(false);
    }
  };

  // ============================================================================
  // LOADING & ERROR STATES
  // ============================================================================

  // ✅ WORKING: Shows loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-orange-600 font-medium">Loading your culinary world...</p>
        </div>
      </div>
    );
  }

  // ✅ WORKING: Shows login form if not authenticated
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-orange-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
              <FaUtensils className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to continue your culinary journey</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-sm flex items-center">
              <span className="mr-2">⚠️</span>
              {loginError}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="your@email.com"
                onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
              />
            </div>


            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="Enter your password"
                onKeyDown={(e) => e.key === 'Enter' && handleLoginSubmit()}
              />
            </div>


            <button
              onClick={handleLoginSubmit}
              disabled={loggingIn}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-amber-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loggingIn ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-600 font-semibold hover:text-orange-700">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // FILTERING & SEARCH
  // ============================================================================

  // ✅ WORKING: Filters recipes based on search query and category
  const filteredRecipes = myRecipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterType === 'all' || recipe.category.toLowerCase() === filterType.toLowerCase())
  );

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br  from-orange-50 via-amber-50 to-yellow-50">
      {/* ========================================================================
          HEADER - ✅ WORKING
          ======================================================================== */}
      <header className="bg-white  shadow-sm border-b border-orange-100 sticky top-0 z-50 backdrop-blur-lg bg-opacity-95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center ">
            {/* <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
               Recipe Book
              </h1>
              <nav className="hidden md:flex space-x-6">
                <Link to="/" className="text-gray-600 hover:text-orange-500 transition font-medium">Home</Link>
                <Link to="/explore" className="text-gray-600 hover:text-orange-500 transition font-medium">Explore</Link>
                <Link to="/community" className="text-gray-600 hover:text-orange-500 transition font-medium">Community</Link>
              </nav>
            </div> */}

            <div className="flex items-center space-x-4 md:space-x-8 right-0 justify-end w-full">
              {/* ✅ WORKING: Notification dropdown toggle */}
              {/* 🔴 TODO #4: Fetch real notifications from backend */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 hover:bg-orange-50 rounded-full transition"
                >
                  <FaBell className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-5 top-12 w-80   bg-white rounded-xl shadow-xl border border-gray-100 p-4">
                    <h3 className="font-bold text-gray-800 mb-3">Notifications</h3>
                    <div className="space-y-3">
                      {/* 🔴 TODO: Replace with real notifications */}
                      {notifications.map((notif, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-2 hover:bg-orange-50 rounded-lg transition cursor-pointer">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-700">{notif.text}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ✅ WORKING: Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all transform hover:scale-105"
              >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================
          COVER IMAGE & PROFILE SECTION
          ======================================================================== */}
      <div className="relative">
        {/* 🔴 TODO #7: IMPLEMENT COVER IMAGE UPLOAD */}
        {/* NEEDS IMPLEMENTATION:
             1. Add file input (hidden)
             2. Create handleCoverImageUpload function
             3. Upload to API: POST /api/users/cover-image
             4. Update user state with new image URL
        */}
        <div
          className="h-72  rounded-t-lg bg-no-repeat bg-cover bg-center relative"
          style={{ backgroundImage: `url('${user.coverImage}')` }}
        >

          <div className=" ">
            {/* 🔴 NOT WORKING: Button has no functionality */}
            <button className=" absolute left-1 mt-1  bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition flex items-center space-x-2">
              <FaCamera />
              <span>Change Cover</span>
            </button>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="relative -mt-20 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">

              {/* 🔴 TODO #6: IMPLEMENT PROFILE IMAGE UPLOAD */}
              {/* NEEDS IMPLEMENTATION:
                   1. Create ref for file input: const profileImageInput = useRef(null)
                   2. Add hidden file input
                   3. Create handleProfileImageUpload function:
                      const handleProfileImageUpload = async (e) => {
                        const file = e.target.files[0];
                        const formData = new FormData();
                        formData.append('profileImage', file);
                        
                        const token = localStorage.getItem('token');
                        const response = await fetch('http://localhost:5003/api/users/profile-image', {
                          method: 'POST',
                          headers: { 'Authorization': `Bearer ${token}` },
                          body: formData
                        });
                        const data = await response.json();
                        setUser(prev => ({...prev, profileImage: data.imageUrl}));
                      }
                   4. Connect button to trigger file input
              */}
              <div className="relative group">
                <div className="w-40 h-40 rounded-full border-4 border-white bg-gradient-to-br from-orange-400 to-amber-400 shadow-2xl overflow-hidden">
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 🔴 NOT WORKING: Button has no functionality */}
                <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">
                  <FaCamera className="text-orange-500" />
                </button>
              </div>

              {/* Profile Info Card */}
              <div className="flex-1 text-center md:text-left bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-orange-100">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div>
                    <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                      {/* ✅ WORKING: Shows user name from auth */}
                      <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                      <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PRO CHEF
                      </span>
                    </div>
                    {/* 🔴 TODO: Fetch from backend */}
                    <p className="text-orange-600 font-medium mb-2">{user.username}</p>
                    <p className="text-gray-600 whitespace-pre-line max-w-2xl">{user.bio}</p>
                    <div className="flex items-center justify-center md:justify-start space-x-4 mt-3 text-sm text-gray-500">
                      <span className="flex items-center"><FaGlobe className="mr-1" /> {user.location}</span>
                      <span>Joined {user.joinedDate}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4 md:mt-0">
                    {/* 🔴 TODO #5: IMPLEMENT EDIT PROFILE FUNCTIONALITY */}
                    {/* NEEDS IMPLEMENTATION:
                         1. Add state: const [showEditModal, setShowEditModal] = useState(false)
                         2. Add onClick handler: onClick={() => setShowEditModal(true)}
                         3. Create edit modal/form component
                         4. Allow editing: name, bio, location, username
                         5. Create API endpoint: PUT /api/users/profile
                         6. Update user state after successful edit
                    */}
                    {/* 🔴 NOT WORKING: Button has no functionality */}
                    <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                      Edit Profile
                    </button>
                    <button className="bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition">
                      <FaShare className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================
                STATS CARDS
                ======================================================================== */}
            {/* 🔴 TODO #8: MAKE STATS INTERACTIVE/CLICKABLE */}
            {/* NEEDS IMPLEMENTATION:
                 - Followers card: onClick={() => setShowFollowersModal(true)} - show list of followers
                 - Following card: onClick={() => setShowFollowingModal(true)} - show list of following
                 - Recipes card: onClick to scroll to recipes section
                 - Create modals to display followers/following lists
                 - Fetch lists from API: GET /api/users/followers, /api/users/following
            */}

            { /* <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
              {/* ✅ WORKING: Displays count */}
            {/* 🔴 TODO #3: Calculate from myRecipes.length */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                  {user.recipes}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Recipes</div>
              </div> */}

            {/* 🔴 TODO #8: Add onClick to show followers list */}
            {/* 🔴 TODO #3: Fetch from backend */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                  {user.followers}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Followers</div>
              </div> */}

            {/* 🔴 TODO #8: Add onClick to show following list */}
            {/* 🔴 TODO #3: Fetch from backend */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center cursor-pointer">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {user.following}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Following</div>
              </div> */}

            {/* 🔴 TODO #3: Calculate sum of likes from myRecipes */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {user.totalLikes}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Total Likes</div>
              </div> */}

            {/* 🔴 TODO #3: Calculate from savedRecipes.length */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {user.saved}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Saved</div>
              </div> */}

            {/* 🔴 TODO #3: Fetch from backend based on achievements earned */}
            {/* <div className="bg-white rounded-xl p-4 shadow-lg border border-orange-100 hover:shadow-xl transition text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  {user.achievements}
                </div>
                <div className="text-gray-600 text-sm mt-1 font-medium">Badges</div>
              </div>
            </div>   */}



            {/* ========================================================================
                ACHIEVEMENTS SECTION - ✅ WORKING (Display only)
                🔴 TODO: Make dynamic based on actual user achievements from backend
                ======================================================================== */}

          </div>
        </div>
      </div>

      {/* ========================================================================
          TABS NAVIGATION - ✅ WORKING
          ======================================================================== */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-2 flex flex-wrap gap-2">
          {/* ✅ WORKING: Tab switching */}
          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'recipes'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-orange-50'
              }`}
            onClick={() => setActiveTab('recipes')}
          >
            <FaUtensils />
            <span>My Recipes</span>
            {/* ✅ WORKING: Shows count of recipes */}
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{myRecipes.length}</span>
          </button>

          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'saved'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-orange-50'
              }`}
            onClick={() => setActiveTab('saved')}
          >
            <FaBookmark />
            <span>Saved</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{savedRecipes.length}</span>
          </button>

          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'videos'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                : 'text-gray-600 hover:bg-orange-50'
              }`}
            onClick={() => setActiveTab('videos')}
          >
            <FaVideo />
            <span>Videos</span>
          </button>



          {/* <button 
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'analytics' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg' 
                : 'text-gray-600 hover:bg-orange-50'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            <FaChartLine />
            <span>Analytics</span>
          </button> */}
        </div>

        {/* ========================================================================
            CONTENT AREA - TAB CONTENT
            ======================================================================== */}
        <div className="mt-6">
          {/* ====================================================================
              MY RECIPES TAB
              ==================================================================== */}
          {activeTab === 'recipes' && (
            <div>
              {/* ✅ WORKING: Search and filter functionality */}
              <div className="bg-white rounded-xl shadow-lg border border-orange-100 p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search your recipes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="all">All Categories</option>
                    <option value="asian">Asian</option>
                    <option value="italian">Italian</option>
                    <option value="healthy">Healthy</option>
                    <option value="dessert">Dessert</option>
                    <option value="vegan">Vegan</option>
                    <option value="baking">Baking</option>
                  </select>
                </div>
              </div>


              {/* ✅ WORKING: Displays filtered recipes */}
              {/* 🔴 TODO #1: Replace mock data with real recipes from backend */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="group bg-white rounded-2xl 
                shadow-lg overflow-hidden border border-orange-100
                 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    <div className="relative h-56 overflow-hidden">

                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      <div className="absolute top-3 right-3 flex space-x-2">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-600">
                          {recipe.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                          <span className="text-white font-medium flex items-center">
                            <FaClock className="mr-1" /> {recipe.time}
                          </span>
                          <div className="flex space-x-2">
                            {/* 🔴 TODO #9: IMPLEMENT LIKE FUNCTIONALITY */}
                            {/* NEEDS IMPLEMENTATION:
                                 const handleLike = async (recipeId) => {
                                   const token = localStorage.getItem('token');
                                   await fetch(`http://localhost:5003/api/recipes/${recipeId}/like`, {
                                     method: 'POST',
                                     headers: { 
                                       'Authorization': `Bearer ${token}`,
                                       'Content-Type': 'application/json'
                                     }
                                   });
                                   // Update local state - increment likes count
                                   setMyRecipes(prev => prev.map(r => 
                                     r.id === recipeId ? {...r, likes: r.likes + 1} : r
                                   ));
                                 }
                            */}
                            {/* 🔴 NOT WORKING: Button has no functionality */}
                            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                              <FaHeart className="text-red-500" />
                            </button>
                            {/* 🔴 TODO #10: IMPLEMENT SHARE FUNCTIONALITY */}
                            {/* NEEDS IMPLEMENTATION:
                                 const handleShare = async (recipe) => {
                                   // Option 1: Copy link to clipboard
                                   await navigator.clipboard.writeText(`${window.location.origin}/recipe/${recipe.id}`);
                                   alert('Link copied to clipboard!');
                                   
                                   // Option 2: Open share modal with social media options
                                   setShareRecipe(recipe);
                                   setShowShareModal(true);
                                   
                                   // Option 3: Use Web Share API (mobile-friendly)
                                   if (navigator.share) {
                                     await navigator.share({
                                       title: recipe.title,
                                       text: recipe.description,
                                       url: `${window.location.origin}/recipe/${recipe.id}`
                                     });
                                   }
                                 }
                            */}
                            {/* 🔴 NOT WORKING: Button has no functionality */}
                            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                              <FaShare className="text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">

                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-orange-600 transition">

                        {recipe.title}

                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>

                      <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-4">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-gray-500">

                            <FaHeart className="mr-1 text-red-500" /> {recipe.likes}
                          </span>

                          <span className="flex items-center text-gray-500">
                            <FaComments className="mr-1 text-blue-500" /> {recipe.comments}
                          </span>

                        </div>

                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-500" />
                          <span className="font-bold text-gray-700">{recipe.rating}</span>

                        </div>

                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
                          {recipe.calories} cal
                        </span>
                        {/* 🔴 TODO: Add onClick to navigate to recipe detail page */}
                        <button className="text-orange-600 font-semibold text-sm hover:text-orange-700 transition">
                          View Recipe →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* ✅ WORKING: Link to create recipe page */}
                <Link
                  to="/create"
                  className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-dashed border-orange-300 flex items-center justify-center min-h-[400px] flex-col p-8 text-center cursor-pointer hover:from-orange-100 hover:to-amber-100 transition-all transform hover:scale-105 group"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <FaUtensils className="text-3xl" />
                  </div>
                  <h3 className="font-bold text-2xl mb-2 text-gray-800">Create New Recipe</h3>
                  <p className="text-gray-600">Share your culinary masterpiece with the world</p>
                </Link>
              </div>
            </div>
          )}

          {/* ====================================================================
              SAVED RECIPES TAB
              ==================================================================== */}
          {/* 🔴 TODO #2: Replace mock data with real saved recipes from backend */}
          {activeTab === 'saved' && (
            <div>
              {savedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedRecipes.map(recipe => (
                    <div key={recipe.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* 🔴 TODO #11: IMPLEMENT UNSAVE FUNCTIONALITY */}
                        {/* NEEDS IMPLEMENTATION:
                             const handleUnsave = async (recipeId) => {
                               const token = localStorage.getItem('token');
                               await fetch(`http://localhost:5003/api/recipes/${recipeId}/unsave`, {
                                 method: 'DELETE',
                                 headers: { 'Authorization': `Bearer ${token}` }
                               });
                               // Remove from local state
                               setSavedRecipes(prev => prev.filter(r => r.id !== recipeId));
                             }
                        */}
                        {/* 🔴 NOT WORKING: Button has no functionality */}
                        <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white transition shadow-lg">
                          <FaBookmark className="text-orange-500" />
                        </button>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-xl mb-1 text-gray-800">{recipe.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">by {recipe.author}</p>

                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center text-gray-500">
                            <FaClock className="mr-1" /> {recipe.time}
                          </span>
                          <div className="flex items-center space-x-1">
                            <FaStar className="text-yellow-500" />
                            <span className="font-bold text-gray-700">{recipe.rating}</span>
                          </div>
                        </div>

                        {/* 🔴 TODO: Add onClick to navigate to recipe detail page */}
                        <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                          View Recipe
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (


                // ✅ WORKING: Empty state display
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-orange-100">
                  <FaBookmark className="text-6xl text-orange-300 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">No Saved Recipes Yet</h3>
                  <p className="text-gray-600 mb-6">Start exploring and save recipes you love!</p>
                  <Link
                    to="/explore"
                    className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Explore Recipes
                  </Link>

                </div>

              )}
            </div>
          )}

          {/* ====================================================================
              VIDEOS TAB
              ==================================================================== */}
          {/* 🔴 TODO #12: IMPLEMENT VIDEO RECIPES FEATURE */}
          {/* NEEDS IMPLEMENTATION:
               1. Create video upload functionality
               2. Store videos (use cloud storage like AWS S3, Cloudinary)
               3. Create API endpoints for video CRUD operations
               4. Display user's video recipes
               5. Add video player component
          */}

          {activeTab === 'videos' && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-orange-100">
              <FaVideo className="text-6xl text-orange-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Video Recipes Coming Soon!</h3>
              <p className="text-gray-600 mb-6">Share your cooking process with video tutorials</p>
              {/* 🔴 NOT WORKING: Button has no functionality */}
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all transform hover:scale-105">
                Upload Your First Video
              </button>
            </div>
          )}

          {/* ====================================================================
              ANALYTICS TAB
              ==================================================================== */}
          {/* 🔴 TODO #13: IMPLEMENT ANALYTICS FEATURE */}
          {/* NEEDS IMPLEMENTATION:
               1. Track recipe views, likes, comments in database
               2. Create API endpoint: GET /api/analytics
               3. Fetch real analytics data:
                  - Total views over time
                  - Engagement rate calculation
                  - Follower growth rate
                  - Top performing recipes
                  - Demographics (if available)
               4. Add charts using a library like recharts or chart.js
               5. Add date range filters
          */}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* 🔴 TODO: Replace with real analytics data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Total Views</h3>
                    <FaChartLine className="text-blue-500 text-2xl" />
                  </div>
                  {/* 🔴 HARDCODED: Should calculate from real data */}
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    47.3K
                  </p>
                  <p className="text-sm text-green-600 mt-2">↑ 12.5% from last month</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Engagement Rate</h3>
                    <FaHeart className="text-red-500 text-2xl" />
                  </div>
                  {/* 🔴 HARDCODED: Should calculate from real data */}
                  <p className="text-4xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    8.7%
                  </p>
                  <p className="text-sm text-green-600 mt-2">↑ 3.2% from last month</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">New Followers</h3>
                    <FaUsers className="text-purple-500 text-2xl" />
                  </div>
                  {/* 🔴 HARDCODED: Should calculate from real data */}
                  <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    +234
                  </p>
                  <p className="text-sm text-green-600 mt-2">↑ 18% from last month</p>
                </div>
              </div>

              {/* 🔴 TODO: Calculate top performing recipes from real data */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <h3 className="font-bold text-gray-800 mb-4">Top Performing Recipes</h3>
                <div className="space-y-4">
                  {myRecipes.slice(0, 3).map((recipe, idx) => (
                    <div key={recipe.id} className="flex items-center space-x-4 p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-500">#{idx + 1}</div>
                      <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{recipe.title}</h4>
                        <p className="text-sm text-gray-600">{recipe.views} views · {recipe.likes} likes</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <FaStar className="text-yellow-500" />
                          <span className="font-bold text-gray-700">{recipe.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================
          FOOTER - ✅ WORKING (Static display)
          ======================================================================== */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent mb-4">
                Recipe Book
              </h3>
              <p className="text-gray-400 mb-4">
                Join millions of food lovers sharing recipes and culinary inspiration worldwide.
              </p>
              <div className="flex space-x-3">
                {/* 🔴 TODO: Add actual social media links */}
                <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                  <FaFacebook className="text-xl" />
                </button>
                <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                  <FaInstagram className="text-xl" />
                </button>
                <button className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition">
                  <FaPinterest className="text-xl" />
                </button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition">Trending Recipes</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Popular Chefs</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Recipe Collections</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Cooking Videos</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-orange-400 transition">Cooking Tips</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Meal Planning</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Nutrition Guide</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get weekly recipes & cooking tips!</p>
              <div className="flex">

                {/* 🔴 TODO #14: IMPLEMENT NEWSLETTER SUBSCRIPTION */}
                {/* NEEDS IMPLEMENTATION:
                     1. Add email state
                     2. Create API endpoint: POST /api/newsletter/subscribe
                     3. Add form validation
                     4. Show success/error message
                */}
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 focus:outline-none focus:border-orange-500 text-white placeholder-gray-400"
                />
                {/* 🔴 NOT WORKING: Button has no functionality */}
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-2 rounded-r-lg font-semibold hover:shadow-lg transition">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Recipe Book. Made with ❤️ for food lovers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;

/* ============================================================================
   SUMMARY OF ALL TODOS AND NON-WORKING FEATURES
   ============================================================================

   ✅ WORKING FEATURES:
   - User authentication check
   - Login/logout functionality
   - Tab navigation
   - Search and filter recipes
   - Responsive UI components
   - Loading and error states

   🔴 TODO #1: Fetch user's recipes from backend (Lines ~60-145)
   🔴 TODO #2: Fetch saved recipes from backend (Lines ~148-166)
   🔴 TODO #3: Update user stats dynamically (Lines ~39-58)
   🔴 TODO #4: Fetch notifications from backend (Lines ~174-186)
   🔴 TODO #5: Implement edit profile functionality (Line ~456)
   🔴 TODO #6: Implement profile image upload (Lines ~437-450)
   🔴 TODO #7: Implement cover image upload (Lines ~428-433)
   🔴 TODO #8: Make stats interactive/clickable (Lines ~481-526)
   🔴 TODO #9: Implement like functionality on recipes (Line ~635)
   🔴 TODO #10: Implement share functionality (Line ~663)
   🔴 TODO #11: Implement unsave functionality (Line ~762)
   🔴 TODO #12: Implement video recipes feature (Lines ~817-827)
   */