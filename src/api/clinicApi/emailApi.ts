import { createApi } from '@reduxjs/toolkit/query/react';
import { SendVerificationCodeRequest, ContactFormRequest, AppointmentRequest, EmailResponse } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['email'],

  endpoints: (builder) => ({
    // General contact emails
    sendContactEmail: builder.mutation<EmailResponse, ContactFormRequest>({
      query: (payload) => ({
        url: 'email/contact',
        method: 'POST',
        body: payload,
      }),
    }),

    // Appointment requests
    sendAppointmentRequest: builder.mutation<EmailResponse, AppointmentRequest>({
      query: (payload) => ({
        url: 'email/appointment',
        method: 'POST',
        body: payload,
      }),
    }),

    // Verification codes
    sendVerificationCode: builder.mutation<EmailResponse, SendVerificationCodeRequest>({
      query: (payload) => ({
        url: 'email/verification-code',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const { useSendContactEmailMutation, useSendAppointmentRequestMutation, useSendVerificationCodeMutation } =
  emailApi;
