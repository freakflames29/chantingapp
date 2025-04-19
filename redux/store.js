import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chantSlice from "./chantSlice";

const store = configureStore({
    reducer:{
        userReducer:userSlice.reducer,
        chantReducer:chantSlice.reducer
    }
})
export  default store;
