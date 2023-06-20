import { configureStore } from '@reduxjs/toolkit'
import ProvaSlice from './ProvaSlice';

const store = configureStore({
    reducer: {
        prova: ProvaSlice
    },
})

export type AppDispatch = typeof store.dispatch

export default store