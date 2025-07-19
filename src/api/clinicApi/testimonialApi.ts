import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateTestimonialRequest, Testimonial, UpdateTestimonialRequest, TestimonialFilters } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const testimonialApi = createApi({
  reducerPath: 'testimonialApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['testimonial'],

  endpoints: (builder) => ({
    // Admin testimonials (auth required)
    getAllTestimonials: builder.query<Testimonial[], TestimonialFilters | void>({
      query: (filters) => ({
        url: 'testimonial/all',
        params: filters,
      }),
      providesTags: ['testimonial'],
    }),

    getTestimonialById: builder.query<Testimonial, string>({
      query: (id) => `testimonial/${id}`,
      providesTags: (result, error, id) => [{ type: 'testimonial', id }],
    }),

    createTestimonial: builder.mutation<Testimonial, CreateTestimonialRequest>({
      query: (payload) => ({
        url: 'testimonial',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['testimonial'],
    }),

    updateTestimonial: builder.mutation<Testimonial, { id: string; data: UpdateTestimonialRequest }>({
      query: ({ id, data }) => ({
        url: `testimonial/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'testimonial', id }, 'testimonial'],
    }),

    deleteTestimonial: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `testimonial/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'testimonial', id }, 'testimonial'],
    }),

    // Approve/reject testimonials (admin)
    approveTestimonial: builder.mutation<Testimonial, string>({
      query: (id) => ({
        url: `testimonial/${id}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['testimonial'],
    }),

    rejectTestimonial: builder.mutation<Testimonial, string>({
      query: (id) => ({
        url: `testimonial/${id}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: ['testimonial'],
    }),
  }),
});

export const {
  useGetAllTestimonialsQuery,
  useGetTestimonialByIdQuery,
  useCreateTestimonialMutation,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
  useApproveTestimonialMutation,
  useRejectTestimonialMutation,
} = testimonialApi;
