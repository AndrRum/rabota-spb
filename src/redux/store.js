import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {vkApi} from "./vkApi";

export const store = configureStore({
    reducer: {
        [vkApi.reducerPath]: vkApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(vkApi.middleware),
})

setupListeners(store.dispatch)