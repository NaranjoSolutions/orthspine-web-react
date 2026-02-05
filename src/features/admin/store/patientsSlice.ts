import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Patient, PatientState, PatientFilters, PatientPagination } from '../types/patient.types';

/**
 * Initial state for patients
 */
const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  filters: {
    search: '',
    sortBy: 'fullName',
    sortOrder: 'asc',
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
 * Patients Redux Slice
 * Manages patient data state
 *
 * Design Patterns:
 * - Redux Toolkit: Simplified state management with immer
 * - Immutable Updates: Redux Toolkit handles immutability
 * - Normalized State: Clean state structure
 */
const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    /**
     * Set patients list
     */
    setPatients(state, action: PayloadAction<Patient[]>) {
      state.patients = action.payload;
      state.error = null;
    },

    /**
     * Set selected patient
     */
    setSelectedPatient(state, action: PayloadAction<Patient | null>) {
      state.selectedPatient = action.payload;
    },

    /**
     * Add a new patient
     */
    addPatient(state, action: PayloadAction<Patient>) {
      state.patients.unshift(action.payload);
      state.pagination.total += 1;
    },

    /**
     * Update an existing patient
     */
    updatePatient(state, action: PayloadAction<Patient>) {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.patients[index] = action.payload;
      }
      if (state.selectedPatient?.id === action.payload.id) {
        state.selectedPatient = action.payload;
      }
    },

    /**
     * Delete a patient
     */
    deletePatient(state, action: PayloadAction<string>) {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
      state.pagination.total -= 1;
      if (state.selectedPatient?.id === action.payload) {
        state.selectedPatient = null;
      }
    },

    /**
     * Set filters
     */
    setFilters(state, action: PayloadAction<Partial<PatientFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * Set pagination
     */
    setPagination(state, action: PayloadAction<Partial<PatientPagination>>) {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    /**
     * Set loading state
     */
    setLoadingPatients(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    /**
     * Set error
     */
    setErrorPatients(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Clear error
     */
    clearErrorPatients(state) {
      state.error = null;
    },

    /**
     * Reset state
     */
    resetPatientsState() {
      return initialState;
    },
  },
});

// Export actions
export const {
  setPatients,
  setSelectedPatient,
  addPatient,
  updatePatient,
  deletePatient,
  setFilters,
  setPagination,
  setLoadingPatients,
  setErrorPatients,
  clearErrorPatients,
  resetPatientsState,
} = patientsSlice.actions;

// Export reducer
export const patientsReducer = patientsSlice.reducer;

// Selectors
export const selectPatients = (state: { patients: PatientState }) => state.patients.patients;
export const selectSelectedPatient = (state: { patients: PatientState }) => state.patients.selectedPatient;
export const selectFilters = (state: { patients: PatientState }) => state.patients.filters;
export const selectPagination = (state: { patients: PatientState }) => state.patients.pagination;
export const selectIsLoading = (state: { patients: PatientState }) => state.patients.isLoading;
export const selectError = (state: { patients: PatientState }) => state.patients.error;
