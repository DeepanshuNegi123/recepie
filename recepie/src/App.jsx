import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home';
import RecipePage from './pages/recipepage';
import CreateRecipe from './pages/createrecipe';
// import EditRecipe from './pages/editrecipe';
import MyKitchen from './pages/mykitchen';
import Favorites from './pages/favourites';
import Navbar from './components/UI/navbar';
import Footer from './components/UI/footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
            <Route path="/create" element={<CreateRecipe />} />
            {/* <Route path="/edit/:id" element={<EditRecipe />} /> */}
            <Route path="/mykitchen" element={<MyKitchen />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;