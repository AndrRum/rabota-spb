import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {vkApi} from "./vkApi";
import {authReducer} from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        [vkApi.reducerPath]: vkApi.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vkApi.middleware),
})

setupListeners(store.dispatch)