import { configureStore } from "@reduxjs/toolkit";
import code from "./codeSlice";

export const store = configureStore({
    reducer: { user: code }
});

export type RootState = ReturnType<typeof store.getState>