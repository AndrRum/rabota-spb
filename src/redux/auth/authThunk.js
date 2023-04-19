import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAccessToken = createAsyncThunk("auth/getToken", async () => {
    const url = `https://oauth.vk.com/authorize?client_id=51604244&display=page&redirect_uri=https://rabotaspb.online&scope=wall&response_type=token&v=5.131`;
    const response = await fetch(url);
    return response.json();
})

//https://rabotaspb.online
