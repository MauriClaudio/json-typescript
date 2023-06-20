import { PayloadAction, createSlice, current } from "@reduxjs/toolkit"

interface props {
    name:string
    type:any
}

const ProvaDynamicSlice = ({name, type}:props) => {

    const ProvaSlice = createSlice({
        name: name,
        initialState: [] as typeof type[],
        reducers: {
            add(state, action: PayloadAction<typeof type>) {
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
}