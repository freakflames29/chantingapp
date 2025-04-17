import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer
    }
})
export  default store;
