import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const paymentApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://securepay.tinkoff.ru/v2',
    }),
    endpoints: (builder) => ({
        pay: builder.mutation({
            query: (paymentData) => ({
                url: '', // TODO URL SUBDOMEN
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: paymentData,
            }),
        }),
    }),
});

export const {usePayMutation} = paymentApi;