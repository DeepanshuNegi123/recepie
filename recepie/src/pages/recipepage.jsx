import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../services/recipeservices';
import { BackButton } from '../components/UI/back';
import {commentservice, fcomments} from '../services/commentservices';




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
            alert(`${text} has been successfully added!`);
            form.reset();
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



    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <>
            <div className=''>
                <BackButton className='' text='Back'/>
            </div>

            <div className="max-w-4xl mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>

                <div className="mb-6">
                    <img
                        src={recipe.imageUrl}
                        alt={recipe.title}
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ingredients</h2>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="mr-2">•</span>
                                        <span>
                      {ingredient.amount && `${ingredient.amount} `}
                                            {ingredient.unit && `${ingredient.unit} `}
                                            {ingredient.name}
                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Instructions</h2>
                            <ol className="space-y-4">
                                {recipe.steps.map((step, index) => (
                                    <li key={index} className="flex">
                                        <span className="mr-3 font-bold">{index + 1}.</span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>

                    <div className="md:col-span-1">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-4">Recipe Details</h3>
                            <div className="space-y-3">
                                <p><span className="font-medium">Prep Time:</span> {recipe.prepTime} minutes</p>
                                <p><span className="font-medium">Cook Time:</span> {recipe.cookTime} minutes</p>
                                <p><span className="font-medium">Servings:</span> {recipe.servings}</p>
                                <p><span className="font-medium">Difficulty:</span> {recipe.difficulty}</p>
                                {recipe.tags && recipe.tags.length > 0 && (
                                    <div>
                                        <span className="font-medium">Tags:</span>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {recipe.tags.map((tag, index) => (
                                                <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
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
            <div className='max-w-4xl mx-auto px-4 pb-12'>
                <div className='bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>

                    {/* Comments Header */}
                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-200'>
                        <div className='flex items-center justify-between'>
                            <h2 className='text-2xl font-bold text-gray-800 flex items-center gap-3'>
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Comments
                            </h2>
                            <span className='bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm'>
                {comments.length}
              </span>
                        </div>
                    </div>

                    {/* User Profile Section */}
                    <div className='px-6 py-5 bg-gray-50 border-b border-gray-200'>
                        <div className='flex items-center gap-4'>
                            <div className='relative'>
                                <img
                                    src="vite.svg"
                                    alt="logo"
                                    className='rounded-full h-14 w-14 ring-4 ring-white shadow-md object-cover'
                                />
                                <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white'></div>
                            </div>
                            <div>
                                <h3 className='text-lg font-bold text-gray-800'>username</h3>
                                <p className='text-sm text-gray-500'>Share your thoughts</p>
                            </div>
                        </div>
                    </div>

                    {/* Add Comment Form */}
                    <div className='px-6 py-6 bg-white'>
                        <form className='flex flex-col gap-4' onSubmit={addcomment}>
                            <div className='relative'>
                <textarea
                    name='comment'
                    rows='3'
                    className='w-full border-2 border-gray-200 rounded-xl p-4 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none text-gray-700 placeholder-gray-400'
                    placeholder='Share your experience with this recipe...'
                />
                                <svg className="absolute right-4 top-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    type='submit'
                                    className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2'
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Sample Comment Display (for visual reference) */}



{/* Comments List Section */}
<div className='px-6 py-4 border-t border-gray-200'>
  {comments.length === 0 ? (
    <div className='text-sm text-gray-500 text-center py-4'>
      No comments yet — be the first to share your thoughts!
    </div>
  ) : (
    <div className='divide-y divide-gray-100'>
      {comments.map((comment) => (
        <div key={comment._id} className='py-3'>
          <div className='flex items-center justify-between'>
            <div className='text-sm font-semibold text-gray-800'>
              {comment.userId?.username || 'Anonymous'}
            </div>
            <div className='text-xs text-gray-400'>
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          </div>
          <p className='text-sm text-gray-600 mt-1'>{comment.text}</p>
        </div>
      ))}
    </div>
  )}
</div>


                  

                </div>
            </div>
        </>
    )
};

export default RecipePage;