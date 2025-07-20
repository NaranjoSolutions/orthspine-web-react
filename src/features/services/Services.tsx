import { Row, Col, Card, Typography, Space, Button, Image, Divider, Layout } from 'antd';
import {
  MedicineBoxOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useTheme } from '../../shared/theme/ThemeContext';
import { allClinicServices } from '../../shared/resources/services/services';
import { clinicInformation } from '../../shared/resources/clinic-information';
import './Services.scss';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export function Services() {
  const { theme } = useTheme();

  const handleContactClick = () => {
    // Navigate to contact page or open contact modal
    window.location.href = '/contact';
  };

  const handleScheduleClick = () => {
    // Navigate to appointment scheduling
    window.location.href = '/book-appointment';
  };

  return (
    <Content className={`services-page services-page--${theme.mode}`}>
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <Space direction="vertical" size="large" className="services-hero-text">
            <MedicineBoxOutlined className="services-hero-icon" />
            <Title level={1} className="services-hero-title">
              Nuestros Servicios
            </Title>
            <Paragraph className="services-hero-description">
              En Orthopedic Spine ofrecemos atención médica especializada y rehabilitación integral para ayudarte a
              recuperar tu movilidad y calidad de vida. Nuestro equipo de profesionales está comprometido con tu
              bienestar.
            </Paragraph>
            <Space size="middle" wrap>
              <Button
                type="primary"
                size="large"
                icon={<PhoneOutlined />}
                onClick={handleContactClick}
                className="services-cta-primary"
              >
                Contactar Ahora
              </Button>
              <Button
                size="large"
                icon={<ClockCircleOutlined />}
                onClick={handleScheduleClick}
                className="services-cta-secondary"
              >
                Agendar Cita
              </Button>
            </Space>
          </Space>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="services-container">
          <Title level={2} className="services-section-title">
            Especialidades Médicas
          </Title>
          <Paragraph className="services-section-description">
            Descubre nuestras especialidades diseñadas para tratar una amplia gama de condiciones ortopédicas
          </Paragraph>

          <Row gutter={[24, 24]} className="services-grid">
            {allClinicServices.map((service) => (
              <Col xs={24} sm={12} lg={8} xl={6} key={service.serviceId}>
                <Card
                  className={`service-card service-card--${theme.mode}`}
                  cover={
                    <div className="service-image-container">
                      <img alt={service.alt} src={service.image} className="service-image" />
                    </div>
                  }
                  actions={[
                    <Button type="text" key="contact" onClick={handleContactClick} className="service-action-btn">
                      Más Información
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Title level={4} className="service-title">
                        {service.title}
                      </Title>
                    }
                    description={
                      <Space direction="vertical" size="small" className="service-content">
                        <Paragraph className="service-short-description">{service.shortDescription}</Paragraph>
                        <Divider className="service-divider" />
                        <Paragraph className="service-description" ellipsis={{ rows: 3, expandable: true }}>
                          {service.description}
                        </Paragraph>
                      </Space>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="services-contact-section">
        <div className="services-container">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} lg={12}>
              <Space direction="vertical" size="large" className="contact-info">
                <Title level={3} className="contact-title">
                  ¿Necesitas Atención Especializada?
                </Title>
                <Paragraph className="contact-description">
                  Nuestro equipo de profesionales está listo para ayudarte. Contáctanos para agendar una cita o resolver
                  tus dudas.
                </Paragraph>
                <Space direction="vertical" size="middle">
                  <Space align="center">
                    <PhoneOutlined className="contact-icon" />
                    <Text strong className="contact-text">
                      {clinicInformation.contact.phones[0]}
                    </Text>
                  </Space>
                  <Space align="center">
                    <EnvironmentOutlined className="contact-icon" />
                    <Text className="contact-text">{clinicInformation.location.address}</Text>
                  </Space>
                  <Space align="center">
                    <ClockCircleOutlined className="contact-icon" />
                    <Space direction="vertical" size="small">
                      {clinicInformation.schedule.map((time, index) => (
                        <Text key={index} className="contact-text">
                          {time}
                        </Text>
                      ))}
                    </Space>
                  </Space>
                </Space>
              </Space>
            </Col>
            <Col xs={24} lg={12}>
              <div className="contact-actions">
                <Space direction="vertical" size="large" className="contact-buttons">
                  <Button
                    type="primary"
                    size="large"
                    icon={<UserOutlined />}
                    onClick={handleContactClick}
                    className="contact-primary-btn"
                    block
                  >
                    Contactar Especialista
                  </Button>
                  <Button
                    size="large"
                    icon={<ClockCircleOutlined />}
                    onClick={handleScheduleClick}
                    className="contact-secondary-btn"
                    block
                  >
                    Agendar Cita
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </Content>
  );
}
