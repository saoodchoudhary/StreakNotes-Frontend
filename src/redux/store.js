import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import noteReducer from "./slice/noteSlice"

export const store = configureStore({
    reducer: {
        user : userReducer,
        note : noteReducer
    }
})



