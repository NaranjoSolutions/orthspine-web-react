/**
 * Patient Testimonials Data
 *
 * Contains testimonials from satisfied patients
 */

export interface Testimonial {
  id: string;
  patientName: string;
  rating: number;
  testimonial: string;
}

export const patientTestimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'Sarah L.',
    rating: 5,
    testimonial:
      "Thanks to their expert care, I'm now pain-free and enjoying my favorite activities again. The entire team showed compassion and professionalism throughout my treatment.",
  },
  {
    id: '2',
    patientName: 'John D.',
    rating: 5,
    testimonial:
      "The procedure was a success, and I'm now able to walk and exercise without pain. I'm so grateful for the exceptional service from the doctors and staff.",
  },
  {
    id: '3',
    patientName: 'Emily R.',
    rating: 4,
    testimonial:
      'From the friendly staff to the skilled doctors, I felt supported and cared for. I highly recommend this clinic to anyone needing orthopedic care.',
  },
];
