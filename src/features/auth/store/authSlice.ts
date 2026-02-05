import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, AuthTokens } from '../types';

/**
 * Authentication State Slice
 * Manages global authentication state
 */
const initialState: AuthState = {
  user: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Set user data
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    /**
     * Set tokens
     */
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
    },

    /**
     * Clear authentication data (logout)
     */
    clearAuth: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    /**
     * Set authentication error
     */
    setAuthError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Clear error
     */
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, setTokens, clearAuth, setAuthError, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
