import React from 'react';
import { Button } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import 'leaflet/dist/leaflet.css';
import { clinicInformation } from '@/shared/resources/clinic-information';
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
            Visit Our Clinic
          </h2>
          <p className={styles.subtitle}>
            We are conveniently located in the heart of the city, providing specialized care in a state-of-the-art
            facility.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <EnvironmentOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Address</h3>
              <div className={styles.infoContent}>
                <p className={styles.infoValue}>{location.address}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <ClockCircleOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Opening Hours</h3>
              <div className={styles.infoContent}>
                <p className={styles.infoValue}>Mon - Fri: 8:00 - 19:00</p>
                <p className={styles.infoValue}>Saturday: 9:00 - 14:00</p>
                <p className={styles.infoValue}>Sunday: Closed</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconWrapper}>
                <PhoneOutlined className={styles.infoIcon} aria-hidden />
              </div>
              <h3 className={styles.infoLabel}>Contact Info</h3>
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
              Open in Google Maps
            </Button>
            <Button
              type="default"
              size="large"
              icon={<EnvironmentOutlined />}
              className={styles.mapButton}
              onClick={handleOpenWaze}
            >
              Open in Waze
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
