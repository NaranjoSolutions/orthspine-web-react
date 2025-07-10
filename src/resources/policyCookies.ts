import { PolicySection } from '../pages/privacy-and-cookies-policy/types';

export const policySectionData: PolicySection[] = [
  {
    id: 'datos-recopilados',
    title: '¿Qué datos recopilamos?',
    items: [
      'Datos identificativos: nombre, correo electrónico, comentarios, número de teléfono.',
      'Datos proporcionados voluntariamente: a través de formularios de contacto o registros.',
      'Cookies y tecnologías similares.',
    ],
  },
  {
    id: 'finalidad-datos',
    title: '¿Con qué finalidad tratamos tus datos?',
    items: [
      'Gestionar solicitudes enviadas a través de formularios.',
      'Enviar comunicaciones relacionadas con nuestros servicios (previo consentimiento).',
      'Mejorar la experiencia de usuario.',
      'Cumplir con obligaciones legales y de seguridad.',
    ],
  },
  {
    id: 'base-legal',
    title: 'Base legal para el tratamiento',
    items: ['Tu consentimiento explícito.', 'Nuestro interés legítimo.', 'Cumplimiento de obligaciones legales.'],
  },
  {
    id: 'compartir-datos',
    title: '¿Con quién compartimos tus datos?',
    items: [
      'Servicios de alojamiento y correo electrónico (por ejemplo, Google, Amazon).',
      'Proveedores externos necesarios para el funcionamiento del sitio.',
    ],
  },
  {
    id: 'uso-cookies',
    title: 'Uso de Cookies',
    items: ['Recordar tus preferencias.', 'Analizar el comportamiento del usuario.'],
  },
  {
    id: 'tipos-cookies',
    title: '',
    subTitle: 'Tipos de cookies utilizadas:',
    items: ['Cookies esenciales.', 'Cookies analíticas.', 'Cookies de terceros.'],
  },
  {
    id: 'derechos-usuario',
    title: 'Tus derechos como usuario',
    items: [
      'Acceder a tus datos personales.',
      'Rectificar datos inexactos.',
      'Solicitar la eliminación de tus datos.',
      'Retirar tu consentimiento.',
      'Oponerte al tratamiento o solicitar la portabilidad.',
    ],
  },
  {
    id: 'conservacion-datos',
    title: 'Conservación de datos',
    items: [
      'Conservamos los datos durante el tiempo necesario para cumplir con las finalidades descritas o según lo exija la ley.',
    ],
  },
  {
    id: 'seguridad-informacion',
    title: 'Seguridad de la información',
    items: [
      'Implementamos medidas técnicas y organizativas para proteger tus datos, incluyendo cifrado, controles de acceso',
    ],
  },
];
