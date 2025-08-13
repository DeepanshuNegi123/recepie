import { Link }from "react-router-dom";
const Card = (props)=>{
    return(

<div className="max-w-xs bg-white rounded-lg shadow-md 
overflow-hidden hover:shadow duration-300 hover:scale-105">
  {/* here i will have image of the recepie  */}
  <link to={}>

  <img src={} alt={} className="w-full h-48 object-cover"/>

</link>  
  <div className="p-4">
    <Link to={}>
    <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-yellow-600 ">
        {props.title}
    </h3>
    </Link>
  </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span className="mr-3">{props.prepTime + props.cookTime} mins</span>
          <UserGroupIcon className="h-4 w-4 mr-1" />
          <span>{props.servings} servings</span>
        </div>

 <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src={props.author?.avatar || '/default-avatar.png'} 
              alt={props.author?.username} 
              className="h-8 w-8 rounded-full mr-2"
            />
            <span className="text-sm text-gray-600">{props.author?.username}</span>
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <HeartIcon className="h-6 w-6" />
          </button>
        </div>

  </div>   
        
    )
}





















module.exports = { Card};