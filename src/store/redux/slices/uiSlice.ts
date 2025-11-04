import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * UI State Slice
 * Manages global UI state (loading, modals, notifications, etc.)
 */
interface UIState {
  isSidebarOpen: boolean;
  isLoading: boolean;
  notification: {
    message: string;
    type: 'success' | 'error' | 'info' | 'warning' | null;
  } | null;
}

const initialState: UIState = {
  isSidebarOpen: true,
  isLoading: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
      }>,
    ) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { toggleSidebar, setLoading, showNotification, clearNotification } = uiSlice.actions;

export default uiSlice.reducer;
