import { configureStore } from '@reduxjs/toolkit'
import ValiditySlice from './ValiditySlice';
import ValueSlice from './ValueSlice';

const validityStore = configureStore({
    reducer: {
        validity: ValiditySlice,
        value: ValueSlice
    },
})

export type AppDispatch = typeof validityStore.dispatch

export default validityStore