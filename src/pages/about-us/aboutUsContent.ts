import aaronImage from '../../assets/images/aaron.png';
import colegioImage from '../../assets/images/colegio.png';
import santaPaulaImage from '../../assets/images/santaPaula.png';
import { Paragraph, InfoItem } from './types';

export const aboutUsContent: Paragraph[] = [
  {
    key: 'history',
    title: 'Nuestra Historia',
    text: `Desde nuestros inicios, en [Año de Fundación], nos hemos comprometido a brindar un servicio de
fisioterapia de alta calidad. Nuestro equipo de profesionales altamente capacitados trabaja con pasión y
dedicación para ayudar a cada paciente a recuperar su movilidad, reducir el dolor y mejorar su calidad de
vida. Creemos en un enfoque integral, combinando tecnología avanzada con técnicas terapéuticas
personalizadas.`,
  },
  {
    key: 'philosophy',
    title: 'Nuestra Filosofía',
    text: `En nuestra clínica, cada paciente es único. Nos enfocamos en diseñar tratamientos personalizados que se
adapten a sus necesidades específicas, promoviendo una recuperación efectiva y duradera. Nuestro
compromiso va más allá del tratamiento: buscamos educar a nuestros pacientes sobre la prevención de
lesiones y el mantenimiento de una vida saludable a través de ejercicios, ergonomía y hábitos posturales
adecuados.`,
  },
  {
    key: 'commitment',
    title: 'Nuestro Compromiso',
    text: `Sabemos que la salud y el bienestar no pueden esperar. Por ello, ofrecemos un ambiente cálido y
profesional, donde nuestros pacientes se sientan cómodos y acompañados en cada etapa de su recuperación.
Nos enorgullece ser un referente en el cuidado fisioterapéutico, ayudando a mejorar la vida de quienes
confían en nosotros día a día.`,
  },
];

export const infoItems: InfoItem[] = [
  {
    id: 1,
    name: 'Lic. Aaron Fallas',
    image: aaronImage,
  },
  { id: 2, name: 'Colegio de terapeutas', image: colegioImage },
  {
    id: 3,
    name: 'Universidad Santa Paula',
    image: santaPaulaImage,
  },
];
