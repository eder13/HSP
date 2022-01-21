import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import API_ENDPOINTS, { HTTP_METHOD } from './APIHelper';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_BASE,
        prepareHeaders: (headers, { getState }) => {
            headers.set('X-XSRF-TOKEN', Cookies.get('XSRF-TOKEN'));
            return headers;
        },
        credentials: 'include' // this allows to send cookies with fetch
    }),
    tagTypes: ['UserData'],
    endpoints: builder => ({
        getUserById: builder.query({
            query: id => API_ENDPOINTS.USER_INFO(id)
        }),
        getUserUploadsById: builder.query({
            query: ({ id, sortBy, sortDirection, page }) =>
                API_ENDPOINTS.USER_UPLOAD_INFO(id, sortBy, sortDirection, page),
            providesTags: ['UserData']
        }),

        patchUserUploadsById: builder.mutation({
            query: ({ id, body }) => ({
                url: id.includes('http') ? id : `/uploads/${id}`,
                method: HTTP_METHOD.PATCH,
                body,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }),
            transformResponse: response => response.data,
            invalidatesTags: ['UserData'],

            async onQueryStarted(
                { id, body },
                { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
            ) {
                const patchResult = dispatch(
                    api.util.updateQueryData('getUserUploadsById', id, draft => {
                        Object.assign(draft, body);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    // TODO: Dispatch Update Cache failed - reload try reloading the page (click here Button)
                    patchResult.undo();
                }
            },

            async onCacheEntryAdded(
                arg,
                { dispatch, getState, extra, requestId, cacheEntryRemoved, cacheDataLoaded, getCacheEntry }
            ) {
                // do things that should happen after update
            }
        }),

        getUserDownloadsById: builder.query({
            query: (id, sortBy, sortDirection, page) =>
                API_ENDPOINTS.USER_DOWNLOAD_INFO(id, sortBy, sortDirection, page)
        })
    })
});

export const {
    useGetUserByIdQuery,
    useGetUserUploadsByIdQuery,
    useGetUserDownloadsByIdQuery,
    usePatchUserUploadsByIdMutation
} = api;
