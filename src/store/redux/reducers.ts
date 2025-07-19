import { testimonialApi } from '../../api/clinicApi/testimonialApi';

import testimonialsReducer from './slices/testimonialSlice';
import userReducer from './slices/userSlice';

export const reducers = {
  [testimonialApi.reducerPath]: testimonialApi.reducer,

  testimonial: testimonialsReducer,
  user: userReducer,
};
