import { PayloadAction, createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"

export type validity = {
    id: string
    fatherId: string
    validity: boolean
}

const ValiditySlice = createSlice({
    name: 'validity',
    initialState: [] as validity[],
    reducers: {

        add(state, action: PayloadAction<validity>) {
            console.log('slice ADD',action.payload.id)
            let validity: boolean = action.payload.validity
            const haveChild: boolean = state.find((item: validity) => item.fatherId === action.payload.id) ? true : false
            //console.log('haveChild', haveChild)

            if (haveChild) {
                validity = state.find((item: validity) =>
                    item.fatherId === action.payload.id &&
                    item.validity === false)
                    ?
                    false : true
                //console.log('validity', validity)
            }

            state.push({ id: action.payload.id, fatherId: action.payload.fatherId, validity: validity })
            console.log(current(state))
        },

        upd(state, action: PayloadAction<validity>) {
            console.log('slice UPD',action.payload.id)
            let validity: boolean = action.payload.validity
            const haveChild: boolean = state.find((item: validity) => item.fatherId === action.payload.id) ? true : false
            //console.log('haveChild', haveChild)
            if (haveChild) {
                validity = state.find((item: validity) =>
                    item.fatherId === action.payload.id &&
                    item.validity === false)
                    ?
                    false : true
                //console.log('validity', validity)
            }
            const index: number = state.findIndex((item: validity) => item.id === action.payload.id)
            state.splice(index, 1)
            state.push({ id: action.payload.id, fatherId: action.payload.fatherId, validity: validity })
        },

        get(state) {
            console.log('slice GET')
            return current(state)
        },
        
        del(state, action: PayloadAction<string>) {
            console.log('slice DEL',action.payload)
            const index: number = state.findIndex((item: validity) => item.id === action.payload)
            state.splice(index, 1)
            console.log(current(state))
        },

        reset(state) {
            console.log('slice RESET')
            const lenght:number = state.length
            state.splice(0, lenght)
            console.log(current(state))
        },
        
    },
})

export const getThunk = createAsyncThunk(
    "validity/get",
    async (arg, thunkAPI) => {
        try {
            return await thunkAPI.getState()
        } catch (err) {
            console.log(err)
        }
    }
);

export const { add, upd, del, reset } = ValiditySlice.actions

export default ValiditySlice.reducer