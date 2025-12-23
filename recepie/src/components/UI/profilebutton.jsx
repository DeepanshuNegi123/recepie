


import { Link, Navigate } from 'react-router-dom';
import { UserIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';


 

const ProfileButton = ()=>{
  function handlecheck(){
 return  navigate('/profile');
  }

  const navigate = useNavigate();
    return(
  <button 
  onClick={handlecheck}
  className="flex items-center mr-4 focus:outline-none">
  <img 
    src="chef.jpg" 
    alt="logo" 
    className=" rounded-full h-14 w-20 hover:border-2 border-gray-300 transition-all"
  />
 </button>
    )
}

export default ProfileButton;