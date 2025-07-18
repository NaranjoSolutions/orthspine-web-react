import spine from '../../../assets/images/services/spine.jpg';
import knee from '../../../assets/images/services/knee.jpg';
import hip from '../../../assets/images/services/hip.jpg';
import shoulder from '../../../assets/images/services/shoulder.jpg';
import footAndHand1 from '../../../assets/images/services/foot-and-hand-1.jpg';
import rehabilitation from '../../../assets/images/services/rehabilitation.jpg';
import circulation from '../../../assets/images/services/circulation.jpg';
import sports from '../../../assets/images/services/sports.jpg';

import { ServicesCard } from '../../types/variables';

export const allClinicServices: ServicesCard[] = [
  {
    serviceId: 'spine',
    title: 'Columna',
    shortDescription:
      'Atención especializada para el tratamiento de condiciones de la columna como protusiones discales, abombamientos, hernias de disco y escoliosis.',
    description: `Brindamos servicios de rehabilitación para condiciones como protusiones discales, abombamientos, hernias de disco, espondilolistesis, radiculopatías, ciáticas, escoliosis, rectificaciones, hiperlordosis y procedimientos quirúrgicos de columna.`,
    alt: 'Columna',
    image: spine,
    isPrimary: true,
  },
  {
    serviceId: 'knee',
    title: 'Rodilla',
    shortDescription:
      'Tratamientos integrales para problemas de rodilla incluyendo lesiones de menisco, artritis y esguinces de ligamentos.',
    description: `Ofrecemos tratamientos para condiciones de rodilla como lesiones de menisco, desgaste, artritis, condromalacia, esguinces de ligamentos, quistes de Baker, derrame articular, tejserviceIdo fibroso, procedimientos quirúrgicos de rodilla y fracturas.`,
    alt: 'Rodilla',
    image: knee,
    isPrimary: true,
  },
  {
    serviceId: 'hip',
    title: 'Cadera',
    shortDescription: 'Soluciones efectivas para fracturas de cadera, bursitis y cambios mecánicos articulares.',
    description: `Nuestros servicios incluyen tratamientos para fracturas de cadera, bursitis, desgaste y cambios mecánicos articulares.`,
    alt: 'Cadera',
    image: hip,
    isPrimary: true,
  },
  {
    serviceId: 'shoulder',
    title: 'Hombro',
    shortDescription:
      'Atención experta para lesiones de hombro incluyendo problemas de manguito rotador, tendinitis y desgarros.',
    description: `Proveemos tratamientos para condiciones de hombro como fracturas, bursitis, desgaste, cambios mecánicos articulares, problemas de manguito rotador, tendinitis y desgarros.`,
    alt: 'Hombro',
    image: shoulder,
  },
  {
    serviceId: 'foot-and-hand',
    title: 'Pie Y Mano',
    shortDescription: 'Programas de rehabilitación para fracturas, tendinitis y síndrome del túnel carpiano.',
    description: `Nuestros servicios de rehabilitación abordan condiciones como fracturas, tendinitis, tejserviceIdo fibroso, esguinces, espolones calcáneos, fascitis plantar, síndrome del túnel carpiano, tendinitis de De Quervain y radiculopatías.`,
    alt: 'Pie Y Mano',
    image: footAndHand1,
    isPrimary: true,
  },
  {
    serviceId: 'rehabilitation',
    title: 'Rehabilitación',
    shortDescription: 'Fisioterapia especializada para condiciones post-cardiacas y cirugías.',
    description: `Ofrecemos programas y seguimiento para condiciones post-cardiacas, pacientes con marcapasos, cirugías de corazón abierto y afectaciones cardio-pulmonares.`,
    alt: 'Rehabilitación',
    image: rehabilitation,
  },
  {
    serviceId: 'circulation',
    title: 'Circulación',
    shortDescription: 'Tratamiento para problemas circulatorios incluyendo várices y úlceras.',
    description: `Nuestros servicios incluyen tratamientos para problemas circulatorios como várices, linfedema, problemas de circulación y úlceras.`,
    alt: 'Circulación',
    image: circulation,
  },
  {
    serviceId: 'sports',
    title: 'Deportiva',
    shortDescription: 'Rehabilitación deportiva incluyendo corrección de postura y recuperación muscular.',
    description: `Proveemos servicios de rehabilitación deportiva como masajes de recuperación muscular, corrección de postura, readaptación deportiva, crioterapia y orientación en la prescripción de calzado deportivo.`,
    alt: 'Deportiva',
    image: sports,
  },
];
