import authReducer from '@/features/auth/store/authSlice';
import { authApi } from '@/features/auth/api/authApi';
import adminDashboardReducer from '@/features/admin/store/adminDashboardSlice';
import { patientsReducer } from '@/features/admin/store/patientsSlice';

import uiReducer from './slices/uiSlice';

export const reducers = {
  auth: authReducer,
  ui: uiReducer,
  adminDashboard: adminDashboardReducer,
  patients: patientsReducer,

  [authApi.reducerPath]: authApi.reducer,
};
