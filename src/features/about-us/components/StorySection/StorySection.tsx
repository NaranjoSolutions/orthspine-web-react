import React from 'react';
import santaPaulaImage from '@/assets/images/about-us/room.png';
import styles from './StorySection.module.scss';

/**
 * StorySection Component
 * Displays the clinic's story with image and text in a two-column layout
 * @returns React component with story content
 */
export const StorySection: React.FC = () => {
  return (
    <section className={styles.storySection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.imageColumn}>
            <img src={santaPaulaImage} alt="Orthopedic Spine Clinic" className={styles.storyImage} />
          </div>
          <div className={styles.textColumn}>
            <h2 className={styles.sectionHeading}>Nuestra Historia</h2>
            <p className={styles.storyText}>
              Fundada con la misión de brindar atención especializada para problemas complejos de columna vertebral,
              Orthopedic Spine se ha convertido en una clínica líder en rehabilitación, llenando un vacío en la
              comunidad para atención espinal altamente especializada que combina experiencia y apoyo clínico compasivo.
            </p>
            <p className={styles.storyText}>
              Nuestro enfoque centrado en el paciente garantiza que cada persona reciba un plan de recuperación
              personalizado. Durante la última década, hemos ayudado a miles de pacientes a recuperar su calidad de vida
              a través de experiencia dedicada y excelencia clínica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
