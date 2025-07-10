import { createApi } from '@reduxjs/toolkit/query/react';
import { ReceiveEmailRequest, SendVerificationCodeRequest } from './types';
import { baseQueryWithReAuth } from './baseQuery';

export const emailApi = createApi({
  reducerPath: 'emailApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['email'],

  endpoints: (builder) => ({
    receiveEmail: builder.mutation<void, ReceiveEmailRequest>({
      query: (payload) => ({
        url: 'email/receive-email/',
        method: 'POST',
        body: payload,
      }),
    }),
    sendVerificationCodeEmail: builder.mutation<void, SendVerificationCodeRequest>({
      query: (payload) => ({
        url: `email/send-verification-code-email?email=${payload.email}`,
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useReceiveEmailMutation, useSendVerificationCodeEmailMutation } = emailApi;
