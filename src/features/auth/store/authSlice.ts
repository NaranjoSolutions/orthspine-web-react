import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, AuthTokens } from '../types';
// import { authApi } from '../api/authApi';

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
  //   extraReducers: (builder) => {
  //     // Handle login mutation
  //     builder
  //       .addMatcher(authApi.endpoints.login.matchPending, (state) => {
  //         state.isLoading = true;
  //         state.error = null;
  //       })
  //       .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
  //         state.user = action.payload.user;
  //         state.tokens = action.payload.tokens;
  //         state.isAuthenticated = true;
  //         state.isLoading = false;
  //         state.error = null;
  //       })
  //       .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
  //         state.isLoading = false;
  //         state.error = action.error.message || 'Login failed';
  //       });

  //     // Handle logout mutation
  //     builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
  //       state.user = null;
  //       state.tokens = null;
  //       state.isAuthenticated = false;
  //       state.error = null;
  //     });
  //   },
});

export const { setUser, setTokens, clearAuth, setAuthError, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
