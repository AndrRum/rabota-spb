import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {vkApi} from "./vkApi";
import {authReducer} from "./auth/authSlice";
import {persistReducer, persistStore} from 'redux-persist';
import {createLogger} from "redux-logger";
import storage from 'redux-persist/lib/storage';
import {paymentApi} from "./paymentApi";

const rootReducer = combineReducers({
    [vkApi.reducerPath]: vkApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    auth: authReducer
})

const options = {
    diff: true,
    collapsed: true,
};

const logger = createLogger(options);

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    timeout: 2000,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistReducer(persistConfig, persistedReducer),
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }).concat(vkApi.middleware).concat(paymentApi.middleware).concat(logger),
})

export const persistor = persistStore(store);

setupListeners(store.dispatch)