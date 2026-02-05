import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import styles from './HomeHeroSection.module.scss';
import { ROUTE_PATHS } from '@/routing';

export const HomeHeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    navigate(ROUTE_PATHS.BOOK_APPOINTMENT);
  };
  return (
    <div className={styles.homePage}>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Su Camino Hacia una Vida sin Dolor</h1>
          <p className={styles.heroSubtitle}>
            En Orthopedic Spine, nos especializamos en atención ortopédica integral. Nuestro equipo de expertos está
            dedicado a proporcionar planes de tratamiento personalizados para ayudarle a recuperar su movilidad y vivir
            una vida más saludable.
          </p>
          <Button type="primary" size="large" className={styles.heroButton} onClick={handleBookAppointment}>
            Reservar Cita
          </Button>
        </div>
      </section>
    </div>
  );
};
