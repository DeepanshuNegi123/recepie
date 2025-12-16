


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
    src="vite.svg" 
    alt="logo" 
    className="border-2 rounded-full h-12 w-12 hover:border-gray-300 transition-all"
  />
 </button>
    )
}

export default ProfileButton;