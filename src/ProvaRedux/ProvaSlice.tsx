import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

const ProvaSlice = createSlice({
    name: "prova",
    initialState: [] as string[],
    reducers: {
        add(state, action: PayloadAction<string>) {
            state.push(action.payload) 
        },
        del(state) {
            state.pop()
        },
        get(state) {
            return current(state)
        }
    },
})

export const provaAsync = createAsyncThunk(
    "prova/get",
    async (arg, thunkAPI) => {
        try {
            return await thunkAPI.getState()
        } catch (err) {
            console.log(err)
        }
    }
);

export const { add, del } = ProvaSlice.actions

export default ProvaSlice.reducer