import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    chantInfo: {
        id: 0,
        count: 0,
        date: "0",
        time: "0"
    },
    allCount: []
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
        },
        setAllCount(state, action) {
            state.allCount = action.payload
        },
        removeAllCount(state, action) {
            state.allCount = []
        }
    }
})

export const chantActions = chantSlice.actions

export default chantSlice