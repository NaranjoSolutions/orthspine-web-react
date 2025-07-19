import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginRequest, LoginResponse, RegisterRequest, User } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['auth', 'user'],

  endpoints: (builder) => ({
    // Authentication endpoints
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({
        url: 'user/login',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['auth'],
    }),

    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (payload) => ({
        url: 'user/register',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['auth'],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'user/logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth', 'user'],
    }),

    refreshToken: builder.mutation<LoginResponse, { refreshToken: string }>({
      query: (payload) => ({
        url: 'user/refresh-token',
        method: 'POST',
        body: payload,
      }),
    }),

    // User profile endpoints
    getProfile: builder.query<User, void>({
      query: () => 'user/profile',
      providesTags: ['user'],
    }),

    updateProfile: builder.mutation<User, Partial<User>>({
      query: (payload) => ({
        url: 'user/profile',
        method: 'PUT',
        body: payload,
      }),
      invalidatesTags: ['user'],
    }),

    // Password management
    changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
      query: (payload) => ({
        url: 'user/change-password',
        method: 'POST',
        body: payload,
      }),
    }),

    requestPasswordReset: builder.mutation<void, { email: string }>({
      query: (payload) => ({
        url: 'user/reset-password-request',
        method: 'POST',
        body: payload,
      }),
    }),

    resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
      query: (payload) => ({
        url: 'user/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useRequestPasswordResetMutation,
  useResetPasswordMutation,
} = authApi;
