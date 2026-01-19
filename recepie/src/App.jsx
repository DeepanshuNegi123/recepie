import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Recepie/home";
import RecipePage from "./pages/Recepie/recipepage";
import CreateRecipe from "./pages/Recepie/createrecipe";
import MyKitchen from "./pages/Recepie/mykitchen";
import Favorites from "./pages/Recepie/favourites";
import Navbar from "./components/Common/navbar";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/login";
import Profile from "./pages/Profile/profile";
import Loading from "./components/Common/loading";
import GlobalChat from "./pages/Chat/globalchat";
function App() {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // marks data/app ready
      // remove loader after fade-out animation
      setTimeout(() => setShowLoader(false), 3000); // match fade duration
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Loader overlay */}
        {showLoader && (
          <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 transition-opacity duration-700 ${
              loading ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Loading />
          </div>
        )}

        {/* Main app */}
        <div
          className={`flex flex-col flex-grow transition-opacity duration-700 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
        >
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-20">
            <Routes>
           
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:id" element={<RecipePage />} />
              <Route path="/create" element={<CreateRecipe />} />
              <Route path="/mykitchen" element={<MyKitchen />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/globalchat' element={<GlobalChat/>} />
            </Routes>
          </main>
          {/* <Footer /> */}
          <Toaster position="top-right" />
        </div>
      </div>
    </Router>
  );
}

export default App;
