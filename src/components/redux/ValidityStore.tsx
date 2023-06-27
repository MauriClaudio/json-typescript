import { configureStore } from '@reduxjs/toolkit'
import ValiditySlice from './ValiditySlice';

const validityStore = configureStore({
    reducer: {
        validity: ValiditySlice
    },
})

export type AppDispatch = typeof validityStore.dispatch

export default validityStore