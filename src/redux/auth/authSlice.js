import {createSlice} from "@reduxjs/toolkit";
import {getAccessToken} from "./authThunk";

export const LoadState = {
    firstLoad: "firstLoad",
    pending: "pending",
    success: "success",
    error: "error"
}

const authInitialState = {
    accessToken: "",
    loadState: LoadState.firstLoad
}

const authSlice = createSlice({
    name: "auth",
    initialState: authInitialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAccessToken.pending, getTokenPending)
            .addCase(getAccessToken.fulfilled, getTokenFulfilled)
            .addCase(getAccessToken.rejected, getTokenRejected)
    }
})

const getTokenPending = (state) => {
    return {
        ...state,
        loadState: LoadState.pending
    }
}

const getTokenFulfilled = (state, {payload}) => {
    return {
        ...state,
        accessToken: payload,
        loadState: LoadState.success
    }
}

const getTokenRejected = (state) => {
    return {
        ...state,
        loadState: LoadState.error
    }
}

export const {reducer: authReducer} = authSlice