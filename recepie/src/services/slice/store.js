import { configureStore } from "@reduxjs/toolkit";


import toggleReducer from "./toggleslice";



export const store = configureStore({

  reducer: {
    toggle: toggleReducer
  }

});