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
  condition?: string;
  date?: string;
}

export const patientTestimonials: Testimonial[] = [
  {
    id: '1',
    patientName: 'John D.',
    rating: 5,
    testimonial:
      "The care I received was life-changing. I struggled with chronic back pain for years, and now I'm back to hiking without any discomfort. The team is truly expert.",
    condition: 'Post-Surgical Rehab',
    date: 'October 2023',
  },
  {
    id: '2',
    patientName: 'Sarah M.',
    rating: 5,
    testimonial:
      "Expert physiotherapists who truly understand spine health. They didn't just treat the symptoms, they found the root cause of my sciatica.",
    condition: 'Chronic Back Pain Management',
    date: 'September 2023',
  },
  {
    id: '3',
    patientName: 'Robert K.',
    rating: 5,
    testimonial:
      'Professional and effective treatment. The personalized plan made all the difference in my recovery journey after a sports injury.',
    condition: 'Sciatica Relief',
    date: 'August 2023',
  },
  {
    id: '4',
    patientName: 'Elena P.',
    rating: 5,
    testimonial:
      'I felt supported every step of my recovery journey. The staff is friendly, knowledgeable, and genuinely cares about your progress.',
    condition: 'Scoliosis Management',
    date: 'July 2023',
  },
  {
    id: '5',
    patientName: 'Michael B.',
    rating: 5,
    testimonial:
      'Best orthopedic clinic in the city. My recovery from a herniated disc was faster than expected thanks to their specialized equipment.',
    condition: 'Disc Herniation',
    date: 'June 2023',
  },
  {
    id: '6',
    patientName: 'Linda T.',
    rating: 5,
    testimonial:
      'They helped me return to professional sports after a major spine injury. Their athlete-focused approach is unparalleled.',
    condition: 'Sports Injury Recovery',
    date: 'May 2023',
  },
];
