import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Domains} from "../helpers/domains";

const baseUrl = "https://api.vk.com/method";

export const vkApi = createApi({
    reducerPath: "vkApi",
    baseQuery: fetchBaseQuery(
        {
            baseUrl,
            method: "GET",
        }),
    endpoints: (builder) => ({
        getWall: (builder.query({
            query: (params) =>
                `/wall.get?domain=${Domains.subDomainVk}&count=${params.count}&offset=${params.offset}&access_token=${params.token}&v=${process.env.REACT_APP_VK_V}`
        })),
        search: (builder.query({
            query: (params) =>
                `/wall.search?domain=${Domains.subDomainVk}&query=${params.query}&count=${params.count}&access_token=${params.token}&v=${process.env.REACT_APP_VK_V}`
        }))
    }),
})

export const {useLazyGetWallQuery, useLazySearchQuery} = vkApi;