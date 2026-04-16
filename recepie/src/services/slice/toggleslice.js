import {createSlice}  from '@reduxjs/toolkit';
const toggleSlice = createSlice({

name:'toggle',
initialState:{       // starting value
    value:false
},
reducers:{                   // how state  chnages 
    toggle:(state)=>{
        state.value =!state.value;
    }
}


});


export const { toggle } = toggleSlice.actions;    // actions trigger chnages .

export default toggleSlice.reducer;


// which state exist and how do we change it is observed inside the slice .