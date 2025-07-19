import { testimonialApi } from '../../api/clinicApi/testimonialApi';

import testimonialsReducer from './slices/testimonialSlice';

export const reducers = {
  [testimonialApi.reducerPath]: testimonialApi.reducer,

  testimonial: testimonialsReducer,
};
