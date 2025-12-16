/*

json we are expecting   from the frontend


{
  "recipeId": "672fa321ce43c5b0f1234567",
  "userId": "672fa333f12b9b4e01234567",
  "text": "This recipe turned out amazing! I added a bit of garlic too."
}


*/



 const mongoose = require('mongoose');


 const commentschema = new mongoose.Schema({


recipeId:{

    type:mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required:true

}
,

 userId:{ // id of user who made this comment

    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true

},


text:{ // main text comment

type:String,
required:true,
trim:true

}

},{timestamps:true});  //  timestamps helps to auto assign created and updated at to the schema

const Comment = mongoose.models.Comment || mongoose.model('Comment', commentschema);
module.exports = Comment;
