import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    info: null
}
const userSlice = createSlice({
    name: "createSlice",
    initialState,
    reducers: {
        setData(state, action) {
            state.info = action.payload

        },
        removeData(state, action) {
            state.info = null
        }
    }
})

export const userActions = userSlice.actions

export default userSlice