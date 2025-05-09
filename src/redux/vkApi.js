import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Domains } from "../helpers/domains";

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/`;
const VK_VERSION = process.env.REACT_APP_VK_V;
const DOMAIN = Domains.subDomainVk;

const buildVkQuery = (endpoint, params) => {
    const queryParams = new URLSearchParams({
        domain: DOMAIN,
        access_token: params.token,
        v: VK_VERSION,
        ...params,
    });

    delete queryParams.token;

    return `/${endpoint}?${queryParams.toString()}`;
};

export const vkApi = createApi({
    reducerPath: "vkApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getWall: builder.query({
            query: ({ count, offset, token }) =>
                buildVkQuery("wall", { count, offset, token }),
        }),
        search: builder.query({
            query: ({ query, count, token }) =>
                buildVkQuery("search", { query, count, token }),
        }),
    }),
});

export const { useLazyGetWallQuery, useLazySearchQuery } = vkApi;
