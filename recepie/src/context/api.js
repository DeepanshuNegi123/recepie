


import React from "react";

 function  getauthorisation (){

    const token  = localStorage.getItem('token');

    return  {

        'Content-Type':'application/json',
        'Authorization': `Bearer ${token}`
    }
   
    }
    export default getauthorisation;



