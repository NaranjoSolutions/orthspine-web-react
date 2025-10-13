import React from 'react';
import { Button, Card, Space, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './ContactSection.module.scss';

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

const { Text, Title } = Typography;

/**
 * ContactSection Component
 * Displays clinic contact information and location with navigation buttons
 *
 * Features:
 * - Contact information (phone, email, address)
 * - Interactive map using react-leaflet
 * - Google Maps and Waze navigation buttons
 * - Responsive design
 */
export const ContactSection: React.FC = () => {
  const { location, contact, name } = clinicInformation;
  const position: [number, number] = [location.latitude, location.longitude];

  const handleOpenGoogleMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleOpenWaze = () => {
    const url = `https://www.waze.com/ul?ll=${location.latitude},${location.longitude}&navigate=yes`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            We're here to help you on your journey to better health. Contact us today to schedule an appointment or
            learn more about our services.
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Phone</h3>
              <p className={styles.infoValue}>{contact.phones[0]}</p>
            </div>

            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Email</h3>
              <p className={styles.infoValue}>{contact.email}</p>
            </div>

            <div className={styles.infoItem}>
              <h3 className={styles.infoLabel}>Address</h3>
              <p className={styles.infoValue}>{location.address}</p>
            </div>
          </div>

          <div className={styles.mapCard}>
            <Card
              title={
                <Space>
                  <EnvironmentOutlined />
                  <span>Nuestra Ubicación</span>
                </Space>
              }
              bordered={false}
            >
              <div style={{ marginBottom: 16 }}>
                <Text strong>{name}</Text>
                <br />
                <Text type="secondary">{location.address}</Text>
              </div>
              <div className={styles.mapWrapper}>
                <MapContainer
                  className={styles.mapContainer}
                  center={position}
                  zoom={16}
                  scrollWheelZoom={true}
                  zoomControl={true}
                  attributionControl={true}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup closeButton={true}>
                      <div className={styles.popupContent}>
                        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
                          {name}
                        </Title>
                        <Text>{location.address}</Text>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </Card>
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
