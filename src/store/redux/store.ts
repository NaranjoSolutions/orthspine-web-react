import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { reducers } from './reducers';
import { middlewares } from './middlewares';

export const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools only in development
});

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
