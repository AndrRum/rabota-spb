import {createAsyncThunk} from "@reduxjs/toolkit";

export const getAccessToken = createAsyncThunk("auth/getToken", async (code) => {
    //return {access_token: "vk1.a.LZHAIcQgypocw1W2NKYXYzTM4NFRi4WlqAM_BzXduafs9Tb1VQ8d8fSEA-fNXlkasL8MDqC4Miptu2xIkdeTEdB7CmaTPLXp_v5xPursY8rltpUyDwXHhBDbcG4zQW8avIDuVcjeiGczuDqZPqOstQS0cZs6ONU6qJtsjy01guDssuVKWAUKDuXfhQOInET5nHCBIqRX3Qeuo8uxZiHbYw"}
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/token/?code=${code}`);
    return await response.json();
})
