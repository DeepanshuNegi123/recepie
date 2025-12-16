import { createContext , useState , useEffect } from "react";

export const UserContext = createContext({});


const [user , setuser] = useState(null);
const checkAuth =  async ()=>{



try {


const token = localStorage.getItem('token');

if(!token){


    setError('Please log in to view your profile');
    setLoading(false);
    return;
}


const response = await fetch ('http://localhost:5003/api/auth/profile',{
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});

if(!response.ok){
if(response.status ===401 || response.status === 403){
    localStorage.removeItem('token');
    setError('Session expired. Please log in again.');
}else{
    setError('Failed to fetch profile data');
}
setLoading(false);
return;
}

const data = response.json();

setuser(prev=>({


    ...prev,
    name : data.user.username,
    email : data.user.email

}));



}catch(err){

setError(err.message);


}

};


