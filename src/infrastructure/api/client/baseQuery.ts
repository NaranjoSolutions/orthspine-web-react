import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenService } from '@/features/auth/services/TokenService';

/**
 * Base Query Configuration for RTK Query
 * Automatically adds auth token to requests
 */
export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_API_VERSION || 'http://localhost:8000/api/v1',
  prepareHeaders: (headers) => {
    // Get token from TokenService (Singleton)
    const token = tokenService.getAccessToken();

    // Add authorization header if token exists
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    headers.set('Content-Type', 'application/json');

    return headers;
  },
});
