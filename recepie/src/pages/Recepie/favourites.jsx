import { BackButton } from "../../components/UI/back";

const Favorites = () => {
  return (
    <div className="w-full pb-24 pt-24 min-h-screen bg-brand-50">
      <div className='max-w-6xl mx-auto px-4'>
          <BackButton className='' text="Back"/>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="mb-16 animate-fade-in text-center border-b border-brand-200 pb-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-display italic text-brand-900 mb-6">
            Favorites
          </h1>
          <p className="text-brand-600 font-light uppercase tracking-widest text-sm">A curated collection of your most beloved recipes.</p>
        </div>

        <div className="bg-white border border-brand-200 shadow-sm p-20 text-center animate-slide-up mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-display italic text-brand-900 mb-6">Your collection is empty</h2>
          <p className="text-brand-600 font-light text-lg mb-8 max-w-lg mx-auto">We couldn't find any saved recipes. Heart a recipe to add it here.</p>
        </div>
      </div>
    </div>
  );
};

export default Favorites;