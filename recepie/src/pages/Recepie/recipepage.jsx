import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../../services/recipeservices';
import { BackButton } from '../../components/UI/back';
import {commentservice, fcomments} from '../../services/commentservices';
import { HeartIcon, ClockIcon, UserGroupIcon, HashtagIcon, DocumentTextIcon, FireIcon } from '@heroicons/react/24/outline';





const RecipePage = () => {
    const { id } = useParams();
    const addcomment = async (e) => {
        e.preventDefault();

        const form = e.target.form || e.target;
        const formData = new FormData(form);
        const text = formData.get('comment');

        if (!text.trim()) {
            alert('Please enter a comment before submitting.');
            return;
        }

        console.log("Submitting comment:", text);

        try {
            const back = await commentservice({ recipeId: id, text });

            if (!back || back.success === false) {
                console.log({
                    message: 'Comment submission failed',
                    failed: true,
                    success: false
                });
                alert('Failed to add comment. Please try again.');
                return;
            }

            console.log(" Comment added successfully:", back);
            alert(`Comment has been successfully added!`);
            form.reset();
            // Refresh comments
            const result = await fcomments({ recipeId: id });
            if (result.success) setComments(result.comments || []);
        } catch (error) {
            console.error("Error submitting comment:", error);
            alert('Something went wrong. Please try again.');
        }



    };



    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments , setComments] = useState([]);

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const data = await fetchRecipe(id);
                setRecipe(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadRecipe();
    }, [id]);


    useEffect(() => {

       const getcomments = async () => {
  try {
    const result = await fcomments({ recipeId: id });

    if (!result.success) {
      console.error("Error fetching comments:", result.error || result.message);
      return;
    }

    setComments(result.comments || []);
  } catch (error) {
    console.error("Error loading comments:", error);
  }
};

        getcomments();


    },[id]);



    if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-brand-50">
        <div className="text-center animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-2 border-brand-800 border-t-transparent"></div>
          <p className="mt-6 font-medium text-brand-600 tracking-widest uppercase text-xs">Simmering...</p>
        </div>
      </div>
    );
    if (error) return <div className="text-center py-20 text-primary-dark font-display italic text-2xl bg-brand-50 min-h-screen">An error occurred: {error}</div>;
    if (!recipe) return <div className="text-center py-20 text-brand-600 font-display text-xl bg-brand-50 min-h-screen">Recipe not found</div>;

    return (
        <div className="animate-fade-in pb-24 bg-brand-50 min-h-screen pt-24">
            <div className='max-w-6xl mx-auto px-4'>
                <BackButton className='' text='Back'/>
            </div>
         

            <div className="max-w-6xl mx-auto px-4 mt-8">
                
                {/* Hero Section of Recipe */}
                <div className="relative mb-16 bg-black h-[600px] border border-brand-200">
                    <img
                        src={recipe.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200"}
                        alt={recipe.title}
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-10 md:p-16">
                      <h1 className="text-5xl md:text-7xl font-display italic text-brand-50 mb-6 leading-tight max-w-4xl">
                        {recipe.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-8 text-brand-100 uppercase tracking-widest text-xs font-semibold">
                        <div className="flex items-center gap-3">
                          <img src={recipe.author?.avatar || `https://ui-avatars.com/api/?name=${recipe.author?.username || 'C'}&background=c5b497&color=fff`} className="w-10 h-10 rounded-full border border-brand-300 grayscale-[20%]" alt="author"/>
                          <span>Author: {recipe.author?.username || "Unknown Artisan"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FireIcon className="w-5 h-5 text-brand-300" />
                          <span>Level: {recipe.difficulty || 'Medium'}</span>
                        </div>
                      </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2">
                        
                        {/* Ingredients */}
                        <div className="mb-16 bg-white border border-brand-200 p-10 lg:p-14 shadow-sm">
                            <h2 className="text-3xl font-display italic text-brand-900 mb-8 border-b border-brand-200 pb-4">
                              Ingredients
                            </h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                {recipe.ingredients?.map((ingredient, index) => (
                                    <li key={index} className="flex items-start py-2 border-b border-brand-100 last:border-0 md:[&:nth-last-child(-n+2)]:border-0">
                                        <span className="h-1.5 w-1.5 bg-brand-400 rounded-full mr-4 mt-2.5"></span>
                                        <span className="text-brand-800 font-light text-lg tracking-wide leading-relaxed">
                                            {ingredient.amount && <span className="font-semibold text-brand-900">{ingredient.amount} </span>}
                                            {ingredient.unit && <span className="text-brand-600 mr-2">{ingredient.unit} </span>}
                                            {ingredient.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Instructions */}
                        <div className="bg-white border border-brand-200 p-10 lg:p-14 shadow-sm">
                            <h2 className="text-3xl font-display italic text-brand-900 mb-10 border-b border-brand-200 pb-4">
                              Directions
                            </h2>
                            <ol className="space-y-12">
                                {recipe.steps?.map((step, index) => (
                                    <li key={index} className="flex flex-col gap-3 group">
                                        <span className="text-brand-400 font-bold font-display uppercase tracking-widest text-xs">
                                          Step {index + 1}
                                        </span>
                                        <p className="text-brand-900 text-xl font-light leading-relaxed">{step}</p>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    {/* Right Column - Sidebar info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white border border-brand-200 p-10 sticky top-32 shadow-sm">
                            <h3 className="font-display italic text-2xl text-brand-900 mb-8 border-b border-brand-200 pb-4">Overview</h3>
                            
                            <div className="space-y-8 uppercase tracking-widest text-xs font-semibold text-brand-700">
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-3"><ClockIcon className="w-5 h-5"/> Prep</span>
                                  <span className="text-brand-900">{recipe.prepTime} mins</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-3"><FireIcon className="w-5 h-5"/> Cook</span>
                                  <span className="text-brand-900">{recipe.cookTime} mins</span>
                                </div>
                                <div className="flex items-center justify-between border-b border-brand-200 pb-8">
                                  <span className="flex items-center gap-3"><UserGroupIcon className="w-5 h-5"/> Yield</span>
                                  <span className="text-brand-900">{recipe.servings} servings</span>
                                </div>
                                
                                {recipe.tags && recipe.tags.length > 0 && (
                                    <div className="pt-2">
                                        <p className="mb-4">Tags</p>
                                        <div className="flex flex-wrap gap-3">
                                            {recipe.tags.map((tag, index) => (
                                                <span key={index} className="border border-brand-300 text-brand-600 px-4 py-1 text-[10px]">
                                                  {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Comments Section */}
            <div className='max-w-4xl mx-auto px-4 mt-24'>
                <div className='bg-white border border-brand-200 shadow-sm overflow-hidden'>

                    {/* Comments Header */}
                    <div className='bg-brand-50 px-10 py-8 border-b border-brand-200'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-3xl font-display italic text-brand-900'>
                                Community Notes
                            </h2>
                            <span className='text-brand-600 uppercase tracking-widest text-xs font-semibold'>
                                {comments.length} Comments
                            </span>
                        </div>
                    </div>

                    {/* Add Comment Form */}
                    <div className='p-10'>
                        <form className='flex flex-col gap-6' onSubmit={addcomment}>
                            <textarea
                                name='comment'
                                rows='4'
                                className='w-full bg-brand-50 border border-brand-200 p-6 focus:border-brand-500 focus:ring-0 transition-colors resize-none text-brand-900 placeholder-brand-400 text-lg font-light shadow-inner rounded-none'
                                placeholder='Share your experience with this recipe...'
                            />
                            <div className='flex justify-end'>
                                <button type='submit' className='btn-primary px-10'>
                                    Publish Note
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Comments List Section */}
                    <div className='p-10 border-t border-brand-100 bg-white'>
                      {comments.length === 0 ? (
                        <div className='text-lg text-brand-500 font-light text-center py-10 italic'>
                          No notes have been added yet. Be the first to share.
                        </div>
                      ) : (
                        <div className='space-y-10'>
                          {comments.map((comment) => (
                            <div key={comment._id} className='border-b border-brand-100 pb-10 last:border-0 last:pb-0'>
                              <div className='flex items-center justify-between mb-4'>
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 font-display italic font-bold">
                                    {(comment.userId?.username || 'A')[0].toUpperCase()}
                                  </div>
                                  <div className='uppercase tracking-widest text-xs font-semibold text-brand-900'>
                                    {comment.userId?.username || 'Anonymous'}
                                  </div>
                                </div>
                                <div className='uppercase tracking-widest text-[10px] text-brand-500'>
                                  {new Date(comment.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                              <p className='text-xl text-brand-800 font-light leading-relaxed pl-14'>{comment.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default RecipePage;