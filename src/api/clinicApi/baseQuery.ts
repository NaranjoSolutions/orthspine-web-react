import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

import { LoginResponse } from './types';
import { logout, refreshTokens } from '../../store/redux/slices/userSlice';
import { RootState } from '../../store/redux/store';

const baseUrl = import.meta.env.VITE_BASE_API_URL || '';
const apiVersion = import.meta.env.VITE_API_VERSION || 'api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/${apiVersion}`,
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState() as RootState;
    const access_token = user.accessToken;
    if (access_token) {
      headers.set('Authorization', `Bearer ${access_token}`);
    }
    return headers;
  },
  credentials: 'include', // Ensures cookies are sent if needed
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs, // Args can be a string (endpoint URL) or an object with method, body, etc.
  unknown, // Response type (unknown since different endpoints return different types)
  FetchBaseQueryError, // Error type from fetchBaseQuery
  object, // Extra options (not used in this case, so an empty object)
  FetchBaseQueryMeta // Metadata returned by fetchBaseQuery
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Unauthorized error: try to refresh token
    const { user } = api.getState() as RootState;
    const refreshToken = user.refreshToken;

    if (!refreshToken) {
      // No refresh token available, logout user
      api.dispatch(logout());
      return result;
    }

    try {
      // Try refreshing the token
      const refreshResponse = await baseQuery(
        {
          url: 'user/refresh-token',
          method: 'POST',
          body: { refreshToken: refreshToken },
          headers: { 'Content-Type': 'application/json' },
        },
        api,
        extraOptions,
      );

      if (refreshResponse.data) {
        // Update tokens in Redux store
        const data = refreshResponse.data as LoginResponse;
        api.dispatch(
          refreshTokens({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          }),
        );

        // Retry the original request with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh token failed, logout user
        api.dispatch(logout());
      }
    } catch {
      api.dispatch(logout());
    }
  }

  return result;
};
