import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastSlice";

export const store = configureStore({
    reducer: { // 必要加入 reducer
        toast: toastReducer 
    }
})

export default configureStore;