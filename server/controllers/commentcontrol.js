// here in comment control we add comment to the backend and using models  .
const   Comment  = require('../models/comment');
const jwt = require('jsonwebtoken');



const addcomment = async (req , res)=>{

    try {

        const {recipeId, text} = req.body; // here we are destructuring the request we go  from the frontend.

        const authheader = req.headers.authorization;

        if (!authheader) {
            return res.status(401).send({message: "missing auth header envelope"});

        }

        const token = authheader.split(' ')[1];
        if (!token) {

            return res.status(401).send({message: "No token provided"});

        }

        // verify
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).send({message: "No token provided"});
        }


        const userId = decoded.id;


        if (!recipeId || !text) {
            return res.status(400).json({error: 'You must provide a comment.'});
        }


        const comment = new Comment({recipeId, userId, text});
        await comment.save();

        return res.status(201).send({message: "Comment saved"});
    }

catch(err){
        console.log(err);
}

}

//
// const deletecomment = async (req , res)=>{
//
//
//
//
//
//
// }




// const deletecomment =  async (req , res)=>{
//
//     try {
//
//
//
//     }
//     catch (err){
//
//         console.log(err);
//     }
//
//
//
//
//
//
// };
//
// const editcomment = async (req, res)=>{
//
//
//
//
//
// };
//



const getcomment = async (req, res) => {


    try {
        const { recipeId } = req.params;

        // Get all comments for this recipe and populate user details
        const comments = await Comment.find({ recipeId })
            .populate("userId")
            .sort({ createdAt: -1 });

        // If no comments found
        if (!comments || comments.length === 0) {
            return res.status(404).send({ message: "No comments found for this recipe" });
        }


        res.status(200).send({
            message: "Comments fetched successfully",
            comments: comments,
        });

    }

    catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
};

module.exports = { getcomment, addcomment };
