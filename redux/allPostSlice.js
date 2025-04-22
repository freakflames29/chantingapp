import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    allPost:[]
}

const allPostSlice = createSlice({
    name:"allPostSlice",
    initialState,
    reducers:{
        setAllPost(state,action){
            state.allPost = action.payload
        },
        removeAllPost(state){
            state.allPost = []
        }
    }
})
export  const allPostActions = allPostSlice.actions

export  default  allPostSlice