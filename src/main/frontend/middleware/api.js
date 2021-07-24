import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from "js-cookie";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.API_BASE, 
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-XSRF-TOKEN', Cookies.get('XSRF-TOKEN'))
            return headers
          } 
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => `/users/${id}`
        }),
    })
});

export const { useGetUserByIdQuery } = api;
