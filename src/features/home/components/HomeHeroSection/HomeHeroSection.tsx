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
          <h1 className={styles.heroTitle}>Your Path to Pain-Free Living</h1>
          <p className={styles.heroSubtitle}>
            At Orthopedic Spine, we specialize in comprehensive orthopedic care. Our expert team is dedicated to
            providing personalized treatment plans to help you regain mobility and live a healthier life.
          </p>
          <Button type="primary" size="large" className={styles.heroButton} onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </div>
      </section>
    </div>
  );
};
