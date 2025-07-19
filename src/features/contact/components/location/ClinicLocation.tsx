import { Card, Layout, Row, Col, Typography, Space } from 'antd';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

import { useTheme } from '../../../../shared/theme/ThemeContext';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

import './ClinicLocation.scss';
import 'leaflet/dist/leaflet.css';

const { Title, Text } = Typography;
const { Content } = Layout;

export function ClinicLocation() {
  const { theme } = useTheme();
  const { name, location, contact } = clinicInformation;
  const position: [number, number] = [location.latitude, location.longitude];

  return (
    <Content className="clinic-location" data-theme={theme.mode}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="location-container"
      >
        <Row justify="center" gutter={[24, 24]}>
          {/* Map Section */}
          <Col xs={24} lg={14} xl={14}>
            <Card
              className="map-card"
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
              <div className="map-wrapper">
                <MapContainer
                  className="map-container"
                  center={position || [0, 0]}
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
                    <Popup closeButton={true} className="custom-popup">
                      <div className="popup-content">
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
          </Col>

          {/* Contact Information Section */}
          <Col xs={24} lg={10} xl={10}>
            <Card
              className="contact-card"
              title={
                <Space>
                  <PhoneOutlined />
                  <span>Información de Contacto</span>
                </Space>
              }
              bordered={false}
            >
              <div className="contact-section">
                {/* Clinic Name and Address */}
                <div style={{ marginBottom: 24 }}>
                  <Title level={4} className="clinic-name">
                    {name}
                  </Title>
                  <Text className="clinic-address">
                    <HomeOutlined className="contact-icon" />
                    {location.address}
                  </Text>
                </div>

                {/* Phone Numbers */}
                <div style={{ marginBottom: 24 }}>
                  <Title level={5} className="section-title">
                    <PhoneOutlined className="contact-icon" />
                    Teléfonos
                  </Title>
                  <Space direction="vertical" size="small">
                    {contact.phones.map((phone, index) => (
                      <a key={index} href={`tel:${phone}`} className="contact-link phone-link">
                        {phone}
                      </a>
                    ))}
                  </Space>
                </div>

                {/* Email */}
                <div>
                  <Title level={5} className="section-title">
                    <MailOutlined className="contact-icon" />
                    Correo Electrónico
                  </Title>
                  <a href={`mailto:${contact.email}`} className="contact-link email-link">
                    {contact.email}
                  </a>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </Content>
  );
}
