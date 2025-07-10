import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import uiReducer from './slices/uiSlice';
import testimonialsReducer from './slices/testimonialSlice';
import { authApi, emailApi, testimonialApi } from '../../api/clinicApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [testimonialApi.reducerPath]: testimonialApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,

    user: userReducer,
    ui: uiReducer,
    testimonial: testimonialsReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, testimonialApi.middleware, emailApi.middleware),
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools only in development
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
