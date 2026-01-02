


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
  className="flex items-center mr-4 ">
  <img 
    src="chef.jpg" 
    alt="logo" 
    className=" p-0 rounded-full h-14 w-18 "
  />
 </button>
    )
}

export default ProfileButton;