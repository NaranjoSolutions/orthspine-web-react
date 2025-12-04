import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type {
  Testimonial,
  TestimonialState,
  TestimonialFilters,
  TestimonialPagination,
} from '../types/testimonial.types';

/**
 * Initial state for testimonials
 */
const initialState: TestimonialState = {
  testimonials: [],
  selectedTestimonial: null,
  filters: {
    search: '',
    status: 'all',
    sortBy: 'dateAdded',
    sortOrder: 'desc',
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
  isLoading: false,
  error: null,
};

/**
 * Testimonials Slice
 * Manages testimonial state in the admin section
 *
 * Design Principles:
 * - Single Responsibility: Handles testimonial state only
 * - Immutable Updates: Redux Toolkit handles immutability
 * - Type Safety: Fully typed with TypeScript
 *
 * State Structure:
 * - testimonials: List of all testimonials
 * - selectedTestimonial: Currently selected testimonial for editing
 * - filters: Search and filter criteria
 * - pagination: Pagination state
 * - isLoading: Loading state for async operations
 * - error: Error message if any
 */
const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    /**
     * Set testimonials list
     */
    setTestimonials(state, action: PayloadAction<Testimonial[]>) {
      state.testimonials = action.payload;
      state.error = null;
    },

    /**
     * Set selected testimonial
     */
    setSelectedTestimonial(state, action: PayloadAction<Testimonial | null>) {
      state.selectedTestimonial = action.payload;
    },

    /**
     * Add new testimonial
     */
    addTestimonial(state, action: PayloadAction<Testimonial>) {
      state.testimonials.unshift(action.payload);
      state.pagination.total += 1;
    },

    /**
     * Update existing testimonial
     */
    updateTestimonial(state, action: PayloadAction<Testimonial>) {
      const index = state.testimonials.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.testimonials[index] = action.payload;
      }
      if (state.selectedTestimonial?.id === action.payload.id) {
        state.selectedTestimonial = action.payload;
      }
    },

    /**
     * Delete testimonial
     */
    deleteTestimonial(state, action: PayloadAction<string>) {
      state.testimonials = state.testimonials.filter((t) => t.id !== action.payload);
      state.pagination.total -= 1;
      if (state.selectedTestimonial?.id === action.payload) {
        state.selectedTestimonial = null;
      }
    },

    /**
     * Set filters
     */
    setTestimonialFilters(state, action: PayloadAction<Partial<TestimonialFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },

    /**
     * Set pagination
     */
    setTestimonialPagination(state, action: PayloadAction<Partial<TestimonialPagination>>) {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    /**
     * Set loading state
     */
    setLoadingTestimonials(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    /**
     * Set error
     */
    setErrorTestimonials(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoading = false;
    },

    /**
     * Clear error
     */
    clearTestimonialError(state) {
      state.error = null;
    },

    /**
     * Reset testimonials state
     */
    resetTestimonialsState() {
      return initialState;
    },
  },
});

/**
 * Actions
 */
export const {
  setTestimonials,
  setSelectedTestimonial,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  setTestimonialFilters,
  setTestimonialPagination,
  setLoadingTestimonials,
  setErrorTestimonials,
  clearTestimonialError,
  resetTestimonialsState,
} = testimonialsSlice.actions;

/**
 * Selectors
 */
export const selectTestimonials = (state: RootState) => state.testimonials.testimonials;
export const selectSelectedTestimonial = (state: RootState) => state.testimonials.selectedTestimonial;
export const selectTestimonialFilters = (state: RootState) => state.testimonials.filters;
export const selectTestimonialPagination = (state: RootState) => state.testimonials.pagination;
export const selectTestimonialIsLoading = (state: RootState) => state.testimonials.isLoading;
export const selectTestimonialError = (state: RootState) => state.testimonials.error;

/**
 * Reducer
 */
export default testimonialsSlice.reducer;
