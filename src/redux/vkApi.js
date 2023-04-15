import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {baseUrl, Domains, requiredParams} from "../helpers/domains";

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
                `/wall.get?domain=${Domains.subDomainVk}&count=${params.count}&offset=${params.offset}` + requiredParams
        })),
        search: (builder.query({
            query: (params) =>
                `/wall.search?domain=${Domains.subDomainVk}&query=${params.query}&count=${params.count}` + requiredParams
        }))
    }),
})

export const {useLazyGetWallQuery, useLazySearchQuery} = vkApi;