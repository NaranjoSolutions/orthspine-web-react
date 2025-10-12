import { authApi } from '@/features/auth/api/authApi';

export const middlewares = (getDefaultMiddleware: () => any) => getDefaultMiddleware().concat(authApi.middleware);
