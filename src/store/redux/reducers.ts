import authReducer from '@/features/auth/store/authSlice';
import { authApi } from '@/features/auth/api/authApi';

import uiReducer from './slices/uiSlice';

export const reducers = {
  auth: authReducer,
  ui: uiReducer,

  [authApi.reducerPath]: authApi.reducer,
};
