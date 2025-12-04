import authReducer from '@/features/auth/store/authSlice';
import { authApi } from '@/features/auth/api/authApi';
import adminDashboardReducer from '@/features/admin/store/adminDashboardSlice';
import { patientsReducer } from '@/features/admin/store/patientsSlice';
import appointmentsReducer from '@/features/admin/store/appointmentsSlice';
import testimonialsReducer from '@/features/admin/store/testimonialsSlice';

import uiReducer from './slices/uiSlice';

export const reducers = {
  auth: authReducer,
  ui: uiReducer,
  adminDashboard: adminDashboardReducer,
  patients: patientsReducer,
  appointments: appointmentsReducer,
  testimonials: testimonialsReducer,

  [authApi.reducerPath]: authApi.reducer,
};
