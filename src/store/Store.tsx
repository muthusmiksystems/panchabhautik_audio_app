import { configureStore } from "@reduxjs/toolkit";
import audioServiceReducer from './services/AudioService'
const store = configureStore({
    reducer: {
        audioService: audioServiceReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    })

})
export default store;
