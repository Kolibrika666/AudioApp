import { configureStore } from "@reduxjs/toolkit"
import { userReducer } from "../user/userSlice";

export const store = configureStore({
    reducer: {
        User: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: true, serializableCheck: false })
});

export type RootState = ReturnType<typeof store.getState>;



