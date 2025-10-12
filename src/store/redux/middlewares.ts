import { authApi } from '@/features/auth/api/authApi';
import type { ConfigureStoreOptions } from '@reduxjs/toolkit';

export const middlewares = (
  getDefaultMiddleware: ConfigureStoreOptions['middleware'],
) => getDefaultMiddleware().concat(authApi.middleware);
