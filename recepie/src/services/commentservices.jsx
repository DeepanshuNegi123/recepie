import getauthorisation from "../context/api.js";
const host = "http://localhost:5003";

const  commentservice = async ({ recipeId, text })=> {
    try {
        const headers = getauthorisation();
   console.log({recipeId, text});
        const response = await fetch(`${host}/api/comment/add`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ recipeId, text }),
        });

        console.log(headers);
        const data = await response.json();

        if (!response.ok) {
            console.log('Error:', data);
            return { success: false, error: data.error || 'Something went wrong' };
        }

        console.log('Success:', data);
        return { success: true, data };

    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}


const fcomments = async ({ recipeId }) => {
  try {
    const response = await fetch(`${host}/api/comment/get/${recipeId}`, {
      method: 'GET'
    });

    if (!response.ok) {
      const error = await response.text();
      console.log('Error:', error);
      return { success: false, error: error || 'Something went wrong' };
    }

    const data = await response.json();
    console.log('Fetched comments:', data);
   
    return { success: true, ...data }; 
  } catch (error) {
    console.log(error.message);
    return { success: false, error: error.message };
  }
};

export { commentservice, fcomments };