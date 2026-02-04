import React from 'react';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './TermsOfServicePage.module.scss';

/**
 * TermsOfServicePage Component
 * Terms of Service page for the clinic website
 *
 * Features:
 * - Terms of Service content with structured sections
 * - Effective date
 * - Contact information for terms-related inquiries
 * - Responsive design
 */
export const TermsOfServicePage: React.FC = () => {
  return (
    <div className={styles.termsOfServicePage}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.effectiveDate}>FECHA DE VIGENCIA - 1 DE ENERO DE 2025</p>
          <h1 className={styles.title}>Términos de Servicio</h1>
          <p className={styles.subtitle}>
            Por favor, lea estos términos detenidamente antes de utilizar nuestros servicios. Su acuerdo con Orthopedic
            Spine comienza aquí.
          </p>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Aceptación de Términos</h2>
          <p className={styles.paragraph}>
            Al acceder, visitar o utilizar este sitio web o aplicación móvil (la "Plataforma") propiedad de Orthopedic
            Spine ("nosotros"), y/o al programar una cita o recibir nuestros servicios clínicos, usted acepta estos
            Términos de Servicio y todas las leyes y regulaciones aplicables. Si no está de acuerdo con alguno de estos
            términos, tiene prohibido utilizar o acceder a esta Plataforma o recibir nuestros servicios clínicos. Los
            materiales contenidos en esta Plataforma están protegidos por las leyes de derechos de autor y marcas
            registradas aplicables. Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
            cambios serán efectivos inmediatamente después de su publicación en este sitio. Su uso continuo de la
            Plataforma o recepción de nuestros servicios clínicos después de dichos cambios constituye su aceptación de
            los nuevos términos.
          </p>
        </div>

        {/* Section 2: Services Provided */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Servicios Proporcionados</h2>
          <p className={styles.paragraph}>
            Orthopedic Spine proporciona servicios especializados de fisioterapia, que incluyen, entre otros, alineación
            espinal, manejo del dolor, rehabilitación de lesiones deportivas y tratamiento de dolor crónico cuando sea
            necesario.
          </p>
          <ul className={styles.list}>
            <li>Evaluaciones físicas completas y diagnóstico</li>
            <li>Planificación de tratamientos y establecimiento de metas</li>
            <li>Terapia manual, ejercicios terapéuticos y educación</li>
            <li>Referencia a otros profesionales de la salud cuando sea necesario</li>
          </ul>
        </div>

        {/* Section 3: Patient Responsibilities */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Responsabilidades del Paciente</h2>
          <p className={styles.paragraph}>
            Un tratamiento efectivo requiere un esfuerzo colaborativo. Como paciente de Orthopedic Spine, usted acepta:
          </p>
          <ul className={styles.list}>
            <li>Proporcionar información precisa y completa sobre su historial médico y condiciones actuales</li>
            <li>Seguir el plan de tratamiento prescrito y los programas de ejercicios en casa lo mejor posible</li>
            <li>
              Informar a su fisioterapeuta de inmediato sobre cualquier cambio inesperado en su condición o si algún
              tratamiento prescrito empeora sus síntomas o causa molestias significativas
            </li>
            <li>Respetar el entorno de la clínica y a otros pacientes</li>
          </ul>
        </div>

        {/* Section 4: Cancellation Policy */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Política de Cancelación</h2>
          <p className={styles.paragraph}>
            Dado que tenemos un número limitado de citas disponibles, hemos establecido la siguiente política:
          </p>
          <div className={styles.policySection}>
            <p className={styles.policyLabel}>Período de Aviso:</p>
            <p className={styles.paragraph}>
              Se requiere un aviso mínimo de 24 horas para cualquier cancelación o reprogramación de citas.
            </p>
          </div>
          <div className={styles.policySection}>
            <p className={styles.policyLabel}>Cargos:</p>
            <p className={styles.paragraph}>
              Las cancelaciones realizadas con menos de 24 horas de aviso o la falta de asistencia a una cita programada
              resultarán en un cargo por cancelación o cita perdida, equivalente al costo total de la cita programada,
              el cual deberá pagarse antes de su próxima cita.
            </p>
          </div>
        </div>

        {/* Section 5: Privacy & Data Protection */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Privacidad y Protección de Datos</h2>
          <p className={styles.paragraph}>
            Su privacidad es de suma importancia para nosotros. Toda la información personal de salud se maneja en
            estricta conformidad con las regulaciones de privacidad de la atención médica. Por favor, consulte nuestra{' '}
            <a href="/privacy-policy" className={styles.link}>
              Política de Privacidad
            </a>{' '}
            para obtener información detallada sobre cómo recopilamos, usamos y protegemos sus datos.
          </p>
        </div>

        {/* Section 6: Limitation of Liability */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>6. Limitación de Responsabilidad</h2>
          <p className={styles.paragraph}>
            En la máxima medida permitida por la ley, Orthopedic Spine y nuestros empleados no serán responsables por
            daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso de nuestros
            servicios o sitio web.
          </p>
        </div>

        {/* Footer - Contact Information */}
        <div className={styles.footer}>
          <p className={styles.paragraph}>
            Si tiene alguna pregunta sobre estos Términos de Servicio, por favor contáctenos en:{' '}
            <a href={`mailto:${clinicInformation.contact.email}`} className={styles.link}>
              {clinicInformation.contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
