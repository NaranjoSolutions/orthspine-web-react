import { testimonialApi } from '../../api/clinicApi/testimonialApi';

import testimonialsReducer from './slices/testimonialSlice';
import userReducer from './slices/userSlice';

import authReducer from '@/features/auth/store/authSlice';
import { authApi } from '@/features/auth/api/authApi';

export const reducers = {
  [testimonialApi.reducerPath]: testimonialApi.reducer,

  testimonial: testimonialsReducer,
  user: userReducer,

  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
};
