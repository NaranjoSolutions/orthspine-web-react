import { testimonialApi } from '../../api/clinicApi/testimonialApi';
import { authApi } from '@/features/auth/api/authApi';

export const middlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(testimonialApi.middleware, authApi.middleware);
