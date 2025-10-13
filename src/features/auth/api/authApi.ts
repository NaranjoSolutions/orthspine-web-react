import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/infrastructure/api/client/baseQuery';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

/**
 * Authentication API - RTK Query
 * Handles all authentication-related API calls
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    /**
     * Login endpoint
     */
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * Register endpoint
     */
    register: builder.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials: RegisterCredentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * Logout endpoint
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth'],
    }),

    /**
     * Get current user endpoint
     */
    getCurrentUser: builder.query<AuthResponse['user'], void>({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    /**
     * Refresh token endpoint
     */
    refreshToken: builder.mutation<AuthResponse, { refreshToken: string }>({
      query: (body) => ({
        url: '/auth/refresh',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useRefreshTokenMutation,
} = authApi;
