import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { JsonStructure } from "../../types/ConfigAll"

export type value = {
    id: string
    fatherId: string
    value: JsonStructure
}

const ValueSlice = createSlice({
    name: 'value',
    initialState: [] as value[],
    reducers: {

        addValue(state, action: PayloadAction<value>) {
            console.log('slice ADD', action.payload.id)
            let js: JsonStructure = action.payload.value
            const index: number = state.findIndex((item: value) => item.id === action.payload.id)
            if (index !== -1)
                state.splice(index, 1)
            const haveChild: boolean = state.find((item: value) => item.fatherId === action.payload.id) ? true : false
            if (haveChild) {
                const value: JsonStructure[] = []
                state.forEach((item: value) => {
                    if (item.fatherId === action.payload.id) {
                        value.push(item.value)
                    }
                })
                js = {name:js.name, id:js.id, elements:value}
            }
            state.push({id:action.payload.id, fatherId:action.payload.fatherId, value:js})
            console.log(current(state))
        },

        resetValue(state) {
            console.log('slice RESET')
            const lenght:number = state.length
            state.splice(0, lenght)
            console.log(current(state))
        },
    },
})

export const getThunkValue = createAsyncThunk(
    "value/get",
    async (arg, thunkAPI) => {
        try {
            return await thunkAPI.getState()
        } catch (err) {
            console.log(err)
        }
    }
);

export const { addValue, resetValue } = ValueSlice.actions

export default ValueSlice.reducer