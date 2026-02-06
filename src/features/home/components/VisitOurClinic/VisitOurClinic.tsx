import React from 'react';
import { Button } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import { clinicInformation, parseScheduleEntry } from '@/shared/resources/clinic-information';
import styles from './VisitOurClinic.module.scss';

// Fix for default marker icon in react-leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

/**
 * VisitOurClinic Component
 * Displays clinic contact information and location with navigation buttons
 *
 * Features:
 * - Contact information (phone, email, address)
 * - Interactive map using react-leaflet
 * - Google Maps and Waze navigation buttons
 * - Responsive design
 */
export const VisitOurClinic: React.FC = () => {
  const { location, contact } = clinicInformation;

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWaze = () => {
    const url = `https://www.waze.com/ul?ll=${location.latitude},${location.longitude}&navigate=yes`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact-section" className={styles.visitOurClinic} aria-labelledby="visit-our-clinic-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 id="visit-our-clinic-title" className={styles.title}>
            Visite Nuestra Clínica
          </h2>
          <p className={styles.subtitle}>
            Estamos convenientemente ubicados en el corazón de la ciudad, brindando atención especializada en una
            instalación de última generación.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <EnvironmentOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Dirección</h3>
              <div className={styles.infoContent}>
                <p className={styles.infoValue}>{location.address}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <ClockCircleOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Horario de Atención</h3>
              <div className={styles.infoContent}>
                {clinicInformation.schedule.map((scheduleItem, index) => {
                  const { hours } = parseScheduleEntry(scheduleItem);
                  return (
                    <p key={index} className={styles.infoValue}>
                      {hours}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <PhoneOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Información de Contacto</h3>
              <div className={styles.infoContent}>
                <a href={`tel:${contact.phones[0]}`} className={styles.infoLink}>
                  {contact.phones[0]}
                </a>
                <a href={`mailto:${contact.email}`} className={styles.infoLink}>
                  {contact.email}
                </a>
              </div>
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="default"
              size="large"
              icon={<EnvironmentOutlined />}
              className={styles.mapButton}
              onClick={handleOpenGoogleMaps}
            >
              Abrir en Google Maps
            </Button>
            <Button
              type="default"
              size="large"
              icon={<EnvironmentOutlined />}
              className={styles.mapButton}
              onClick={handleOpenWaze}
            >
              Abrir en Waze
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
