import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['auth'],

  endpoints: (builder) => ({
    // User auth
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({
        url: 'user/login/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['auth'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation } = authApi;
