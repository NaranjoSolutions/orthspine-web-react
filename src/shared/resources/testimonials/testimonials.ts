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
    patientName: 'Carlos R.',
    rating: 5,
    testimonial:
      'La atención que recibí me cambió la vida. Luché con dolor crónico de espalda durante años, y ahora estoy de vuelta haciendo senderismo sin ninguna molestia. El equipo es realmente experto.',
    condition: 'Rehabilitación Postquirúrgica',
    date: 'Octubre 2023',
  },
  {
    id: '2',
    patientName: 'María S.',
    rating: 5,
    testimonial:
      'Fisioterapeutas expertos que realmente entienden la salud de la columna. No solo trataron los síntomas, encontraron la causa raíz de mi ciática.',
    condition: 'Manejo de Dolor Crónico de Espalda',
    date: 'Septiembre 2023',
  },
  {
    id: '3',
    patientName: 'Roberto M.',
    rating: 5,
    testimonial:
      'Tratamiento profesional y efectivo. El plan personalizado marcó toda la diferencia en mi recuperación después de una lesión deportiva.',
    condition: 'Alivio de Ciática',
    date: 'Agosto 2023',
  },
  {
    id: '4',
    patientName: 'Elena P.',
    rating: 5,
    testimonial:
      'Me sentí apoyada en cada paso de mi proceso de recuperación. El personal es amable, conocedor y realmente se preocupa por tu progreso.',
    condition: 'Manejo de Escoliosis',
    date: 'Julio 2023',
  },
  {
    id: '5',
    patientName: 'Miguel B.',
    rating: 5,
    testimonial:
      'La mejor clínica ortopédica de la ciudad. Mi recuperación de una hernia discal fue más rápida de lo esperado gracias a su equipo especializado.',
    condition: 'Hernia Discal',
    date: 'Junio 2023',
  },
  {
    id: '6',
    patientName: 'Laura T.',
    rating: 5,
    testimonial:
      'Me ayudaron a regresar al deporte profesional después de una lesión grave en la columna. Su enfoque para atletas es inigualable.',
    condition: 'Recuperación de Lesión Deportiva',
    date: 'Mayo 2023',
  },
];
