import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminDashboardState, DashboardStats, RecentActivity } from '../types';

/**
 * Admin Dashboard State Slice
 * Manages admin dashboard data state
 */
const initialState: AdminDashboardState = {
  stats: null,
  recentActivities: [],
  isLoading: false,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState,
  reducers: {
    /**
     * Set dashboard statistics
     */
    setDashboardStats: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
      state.error = null;
    },

    /**
     * Set recent activities
     */
    setRecentActivities: (state, action: PayloadAction<RecentActivity[]>) => {
      state.recentActivities = action.payload;
      state.error = null;
    },

    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    /**
     * Set error
     */
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Clear error
     */
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setDashboardStats, setRecentActivities, setLoading, setError, clearError } = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;
