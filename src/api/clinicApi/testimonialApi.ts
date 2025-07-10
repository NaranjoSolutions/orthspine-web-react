import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateTestimonialRequest, Testimonial } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const testimonialApi = createApi({
  reducerPath: 'testimonialApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['testimonial'],

  endpoints: (builder) => ({
    //Testimonials
    getTestimonials: builder.query<Testimonial[], void>({
      query: () => 'testimonial/all',
      providesTags: ['testimonial'],
    }),

    createTestimonial: builder.mutation<Testimonial, CreateTestimonialRequest>({
      query: (payload) => ({
        url: 'testimonial/',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['testimonial'],
    }),
    deleteTestimonial: builder.mutation<{ success: boolean }, string>({
      query: (payload) => ({
        url: `testimonial/${payload}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['testimonial'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTestimonialsQuery, useCreateTestimonialMutation, useDeleteTestimonialMutation } = testimonialApi;
