import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

export type validity = {
    id: string
    fatherId: string
    validity: boolean
}

const ProvaSlice = createSlice({
    name: 'prova',
    initialState: [] as validity[],
    reducers: {

        add(state, action: PayloadAction<validity>) {
            let validity: boolean = action.payload.validity
            const haveChild: boolean = state.find((item: validity) => item.fatherId === action.payload.id) ? true : false
            console.log('haveChild', haveChild)

            if (haveChild) {
                validity = state.find((item: validity) =>
                    item.fatherId === action.payload.id &&
                    item.validity === false)
                    ?
                    false : true
                console.log('validity', validity)
            }

            state.push({ id: action.payload.id, fatherId: action.payload.fatherId, validity: validity })
            console.log(current(state))
        },

        upd(state, action: PayloadAction<validity>) {
            let validity: boolean = action.payload.validity
            const haveChild: boolean = state.find((item: validity) => item.fatherId === action.payload.id) ? true : false
            console.log('haveChild', haveChild)
            if (haveChild) {
                validity = state.find((item: validity) =>
                    item.fatherId === action.payload.id &&
                    item.validity === false)
                    ?
                    false : true
                console.log('validity', validity)
            }
            const index: number = state.findIndex((item: validity) => item.id === action.payload.id)
            state.splice(index, 1)
            state.push({ id: action.payload.id, fatherId: action.payload.fatherId, validity: validity })
        },

        get(state) {
            return current(state)
        },
        
        del(state, action: PayloadAction<string>) {
            const index: number = state.findIndex((item: validity) => item.id === action.payload)
            state.splice(index, 1)
        },
        
    },
})

export const getThunk = createAsyncThunk(
    "prova/get",
    async (arg, thunkAPI) => {
        try {
            return await thunkAPI.getState()
        } catch (err) {
            console.log(err)
        }
    }
);

export const { add, upd, del } = ProvaSlice.actions

export default ProvaSlice.reducer