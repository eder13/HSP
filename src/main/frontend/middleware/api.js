import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import API_ENDPOINTS from './endpoints';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_BASE,
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-XSRF-TOKEN', Cookies.get('XSRF-TOKEN'));
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getUserById: builder.query({
            query: (id) => API_ENDPOINTS.USER_INFO(id)
        }),
        getUserUploadsById: builder.query({
            query: (id, sortBy, sortDirection, page) => API_ENDPOINTS.USER_UPLOAD_INFO(id, sortBy, sortDirection, page)
        }),
        getUserDownloadsById: builder.query({
            query: (id, sortBy, sortDirection, page) => API_ENDPOINTS.USER_DOWNLOAD_INFO(id, sortBy, sortDirection, page)
        })
    })
});

export const { useGetUserByIdQuery, useGetUserUploadsByIdQuery, useGetUserDownloadsByIdQuery } = api;
