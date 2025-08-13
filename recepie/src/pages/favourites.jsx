import { BackButton } from "../components/UI/back";

const Favorites = () => {
  return (
    <>
    <BackButton text="Back" />
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Favorite Recipes</h1>
      <p>Your favorite recipes will appear here.</p>
    </div>
    </>
  );
};

export default Favorites;