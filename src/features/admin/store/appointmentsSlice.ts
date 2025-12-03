import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AdminAppointment,
  AppointmentState,
  AppointmentFilters,
  AppointmentPagination,
} from '../types/appointment.types';

/**
 * Initial state for appointments
 */
const initialState: AppointmentState = {
  appointments: [],
  selectedAppointment: null,
  filters: {
    search: '',
    doctorId: undefined,
    status: 'all',
    dateRange: undefined,
    sortBy: 'dateTime',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    pageSize: 5,
    total: 0,
  },
  isLoading: false,
  error: null,
};

/**
 * Appointments Redux Slice
 * Manages appointment data state
 *
 * Design Patterns:
 * - Redux Toolkit: Simplified state management with immer
 * - Immutable Updates: Redux Toolkit handles immutability
 * - Normalized State: Clean state structure
 */
const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    /**
     * Set appointments list
     */
    setAppointments(state, action: PayloadAction<AdminAppointment[]>) {
      state.appointments = action.payload;
      state.error = null;
    },

    /**
     * Set selected appointment
     */
    setSelectedAppointment(state, action: PayloadAction<AdminAppointment | null>) {
      state.selectedAppointment = action.payload;
    },

    /**
     * Add a new appointment
     */
    addAppointment(state, action: PayloadAction<AdminAppointment>) {
      state.appointments.unshift(action.payload);
      state.pagination.total += 1;
    },

    /**
     * Update an existing appointment
     */
    updateAppointment(state, action: PayloadAction<AdminAppointment>) {
      const index = state.appointments.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
      if (state.selectedAppointment?.id === action.payload.id) {
        state.selectedAppointment = action.payload;
      }
    },

    /**
     * Delete an appointment
     */
    deleteAppointment(state, action: PayloadAction<string>) {
      state.appointments = state.appointments.filter((a) => a.id !== action.payload);
      state.pagination.total -= 1;
      if (state.selectedAppointment?.id === action.payload) {
        state.selectedAppointment = null;
      }
    },

    /**
     * Set filters
     */
    setFilters(state, action: PayloadAction<Partial<AppointmentFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * Clear filters
     */
    clearFilters(state) {
      state.filters = initialState.filters;
    },

    /**
     * Set pagination
     */
    setPagination(state, action: PayloadAction<Partial<AppointmentPagination>>) {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    /**
     * Set loading state
     */
    setLoadingAppointments(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    /**
     * Set error state
     */
    setErrorAppointments(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Reset state
     */
    resetAppointmentsState(state) {
      Object.assign(state, initialState);
    },
  },
});

// Export actions
export const {
  setAppointments,
  setSelectedAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  setFilters,
  clearFilters,
  setPagination,
  setLoadingAppointments,
  setErrorAppointments,
  resetAppointmentsState,
} = appointmentsSlice.actions;

// Export selectors
export const selectAppointments = (state: { appointments: AppointmentState }) => state.appointments.appointments;
export const selectSelectedAppointment = (state: { appointments: AppointmentState }) =>
  state.appointments.selectedAppointment;
export const selectFilters = (state: { appointments: AppointmentState }) => state.appointments.filters;
export const selectPagination = (state: { appointments: AppointmentState }) => state.appointments.pagination;
export const selectIsLoading = (state: { appointments: AppointmentState }) => state.appointments.isLoading;
export const selectError = (state: { appointments: AppointmentState }) => state.appointments.error;

// Export reducer
export default appointmentsSlice.reducer;
