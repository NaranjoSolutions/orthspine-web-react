import { testimonialApi } from '../../api/clinicApi/testimonialApi';

export const middlewares = (getDefaultMiddleware) => getDefaultMiddleware().concat(testimonialApi.middleware);
