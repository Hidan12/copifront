import { configureStore } from "@reduxjs/toolkit";
import { reducerTheme } from "./reducer/themeReducer";

export const store = configureStore({
    reducer:{
        reducerTheme: reducerTheme 
    }
})