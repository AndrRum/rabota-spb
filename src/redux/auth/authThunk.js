import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAccessToken = createAsyncThunk("auth/getToken", async (code) => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/getToken?code=${code}`);
    return await response.json();
})
