import React from 'react';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './PrivacyPolicyPage.module.scss';

/**
 * PrivacyPolicyPage Component
 * Privacy Policy page for the clinic website
 *
 * Features:
 * - Privacy policy content with structured sections
 * - Last updated date
 * - Contact information for privacy-related inquiries
 * - Responsive design
 */
export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className={styles.privacyPolicyPage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>Política de Privacidad</h1>
          <p className={styles.lastUpdated}>Última Actualización: 1 de febrero de 2026</p>
        </div>

        {/* Introduction */}
        <div className={styles.section}>
          <p className={styles.paragraph}>
            En Orthopedic Spine, tomamos su privacidad en serio. Esta Política de Privacidad explica cómo recopilamos,
            usamos, divulgamos y protegemos su información cuando visita nuestra clínica o utiliza nuestros servicios.
            Por favor, lea esta política de privacidad detenidamente. Si no está de acuerdo con los términos de esta
            política de privacidad, por favor no acceda al sitio.
          </p>
        </div>

        {/* Section 1: Collection of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Recopilación de su Información</h2>
          <p className={styles.paragraph}>
            Podemos recopilar información sobre usted de diversas maneras. La información que podemos recopilar en el
            sitio incluye:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Datos Personales:</strong> Información personalmente identificable, como su nombre, dirección de
              envío, dirección de correo electrónico y número de teléfono, así como información demográfica, como su
              edad, género, ciudad de origen e intereses, que usted nos proporciona voluntariamente al registrarse en el
              sitio o al participar en diversas actividades relacionadas con el sitio.
            </li>
            <li>
              <strong>Datos Derivados:</strong> Información que nuestros servidores recopilan automáticamente cuando
              accede al sitio, como su dirección IP y tipo de navegador.
            </li>
            <li>
              <strong>Información Médica:</strong> Detalles sobre su salud física o condiciones proporcionados a través
              de nuestros formularios de contacto o durante consultas.
            </li>
          </ul>
        </div>

        {/* Section 2: Use of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Uso de su Información</h2>
          <p className={styles.paragraph}>
            Tener información precisa sobre usted nos permite brindarle una experiencia fluida, eficiente y
            personalizada. Específicamente, podemos usar la información recopilada sobre usted a través del sitio para:
          </p>
          <ul className={styles.list}>
            <li>Proporcionar y gestionar servicios de salud.</li>
            <li>Responder a consultas y brindar soporte al cliente.</li>
            <li>Mejorar nuestros servicios y desarrollar nuevas funciones.</li>
          </ul>
        </div>

        {/* Section 3: Disclosure of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Divulgación de su Información</h2>
          <p className={styles.paragraph}>
            Podemos compartir la información que hemos recopilado sobre usted en ciertas situaciones. Su información
            puede ser divulgada de la siguiente manera:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Por Ley o para Proteger Derechos:</strong> Si creemos que la divulgación de información sobre
              usted es necesaria para responder a procesos legales, investigar o remediar posibles violaciones de
              nuestras políticas, o proteger los derechos, la propiedad y la seguridad de otros, podemos compartir su
              información según lo permitido o requerido por cualquier ley, norma o regulación aplicable.
            </li>
            <li>
              <strong>Proveedores de Servicios de Terceros:</strong> Podemos compartir su información con terceros que
              realizan servicios para nosotros o en nuestro nombre, incluidos análisis de datos, entrega de correos
              electrónicos, servicios de alojamiento, atención al cliente y asistencia de marketing.
            </li>
            <li>
              <strong>Asesores Profesionales:</strong> Podemos compartir su información con nuestros abogados,
              contadores y otros asesores profesionales.
            </li>
          </ul>
        </div>

        {/* Section 4: Security of Your Information */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Seguridad de su Información</h2>
          <p className={styles.paragraph}>
            Utilizamos medidas de seguridad administrativas, técnicas y físicas para ayudar a proteger su información
            personal. Aunque hemos tomado medidas razonables para asegurar la información personal que nos proporciona,
            tenga en cuenta que, a pesar de nuestros esfuerzos, ninguna medida de seguridad es perfecta o impenetrable,
            y ningún método de transmisión de datos puede garantizarse contra cualquier tipo de interceptación o uso
            indebido.
          </p>
        </div>

        {/* Section 5: Sus Derechos de Privacidad */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Sus Derechos de Privacidad</h2>
          <p className={styles.paragraph}>
            Dependiendo de su ubicación, puede tener ciertos derechos con respecto a sus datos personales, incluidos el
            derecho a acceder, corregir o eliminar la información personal que tenemos sobre usted. También puede tener
            derecho a oponerse o limitar ciertos tipos de procesamiento.
          </p>
        </div>

        {/* Section 6: Contact Us */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Contáctenos</h2>
          <p className={styles.paragraph}>
            Si tiene preguntas o comentarios sobre esta Política de Privacidad, por favor contáctenos en:
          </p>
          <div className={styles.contactInfo}>
            <p className={styles.paragraph}>
              <strong>{clinicInformation.name}</strong>
            </p>
            <p className={styles.paragraph}>{clinicInformation.location.address}</p>
            <p className={styles.paragraph}>
              Correo Electrónico:{' '}
              <a href={`mailto:${clinicInformation.contact.email}`}>{clinicInformation.contact.email}</a>
            </p>
            <p className={styles.paragraph}>
              Teléfono: <a href={`tel:${clinicInformation.contact.phones[0]}`}>{clinicInformation.contact.phones[0]}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
