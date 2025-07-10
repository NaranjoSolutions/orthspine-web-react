//Auth

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

//Testimonials
export interface Testimonial {
  testimonialId: string;
  firstName: string;
  lastName: string;
  rating: number;
  comment: string;
}

export type CreateTestimonialRequest = Omit<Testimonial, 'testimonialId'>;

//Email
export interface ReceiveEmailRequest {
  name: string;
  email: string;
  message: string;
}

export interface SendVerificationCodeRequest {
  email: string;
}
