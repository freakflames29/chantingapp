import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chantInfo: {
        id: 0,
        count: 1,
        date: ""
    }
}

const chantSlice = createSlice({
    name: "chantSlice", initialState, reducers: {
        setChant(state, action) {
            state.chantInfo = action.payload
        },
        increase(state) {
            state.chantInfo.count += 1
        }, decrease(state) {
            state.chantInfo.count -= 1
        }
    }
})

export const chantActions = chantSlice.actions

export default chantSlice