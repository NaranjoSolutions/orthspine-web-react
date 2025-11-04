import React from 'react';
import { Button, Typography } from 'antd';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { clinicInformation } from '@/shared/resources/clinic-information';
import styles from './LocationMap.module.scss';

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
 * LocationMap Component
 * Displays clinic location on an interactive map
 *
 * Features:
 * - Interactive map using react-leaflet
 * - Marker with clinic location
 * - Navigation buttons (Google Maps, Waze)
 */
export const LocationMap: React.FC = () => {
  const { location, name } = clinicInformation;
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
    <div className={styles.locationMap}>
      <h2 className={styles.title}>Our Location</h2>

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

      <div className={styles.buttonGroup}>
        <Button
          type="default"
          size="large"
          onClick={handleOpenGoogleMaps}
          className={styles.navButton}
        >
          Open in Google Maps
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleOpenWaze}
          className={styles.navButton}
        >
          Open in Waze
        </Button>
      </div>
    </div>
  );
};
