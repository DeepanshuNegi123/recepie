
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Recepie/home";
import LandingPage from "./pages/globalfront/landing";
import SearchEngine from "./pages/globalfront/search";
import OrganicwillShop from "./pages/globalfront/organicwill";
import EarthRevolution from "./pages/globalfront/earth";
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
import PrivateLayout from "./components/layout/privatelayout";
import GLOBALLAYOUT from "./components/layout/globallayout";
import Sidebar from "./pages/globalfront/sider";
import { ChatProvider } from "./context/chatcontext";
import EditRecipe from "./pages/Recepie/editrecipe";
function App() {


  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Loader overlay removed */}

        {/* Main app */}
       
       

          
<Routes>
   <Route element={<GLOBALLAYOUT />}>
    <Route path="/" element={<LandingPage />} />
    <Route path="/search" element={<SearchEngine />} />
    <Route path="/revolution" element={<EarthRevolution />} />
    <Route path="/organicwill" element={<OrganicwillShop />} />
   
  </Route>
  <Route element={<PrivateLayout/>}>
    <Route path="/home" element={<Home />} />
    <Route path="/globalchat" element={<ChatProvider><GlobalChat/></ChatProvider>} /> 
    <Route path="/register" element={<Register />} />
    <Route path="/recipes/:id" element={<RecipePage />} />
    <Route path="/create" element={<CreateRecipe />} />
    <Route path="/mykitchen" element={<MyKitchen />} />
    <Route path="/favorites" element={<Favorites />} />
    <Route path="/login" element={<Login />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/editrecipe" element={<EditRecipe/>}></Route>
  </Route>
</Routes>
       
          {/* <Footer /> */}
          <Toaster position="top-right" />
       
      </div>
    </Router>
  );
}

export default App;
