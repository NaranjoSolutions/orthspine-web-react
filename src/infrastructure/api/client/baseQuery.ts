import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tokenService } from '@/features/auth/services/TokenService';

/**
 * Base Query Configuration for RTK Query
 * Automatically adds auth token to requests
 */

const baseApiUrl = import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000';
const apiVersion = import.meta.env.VITE_API_VERSION || '/api/v1';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl + apiVersion,
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
