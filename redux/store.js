import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chantSlice from "./chantSlice";
import allPostSlice from "./allPostSlice";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer,
        chantReducer:chantSlice.reducer,
        allPostReducer: allPostSlice.reducer
    }
})
export  default store;
