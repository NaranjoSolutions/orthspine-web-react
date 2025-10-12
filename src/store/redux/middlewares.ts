import { authApi } from '@/features/auth/api/authApi';

export const middlewares = (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware);
