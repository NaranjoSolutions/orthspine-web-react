import { Col, Layout, Row, Typography, Space, Button } from 'antd';
import { PhoneOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { clinicInformation } from '../../shared/resources/clinic-information';
import { HomeCarousel } from './components/carousel/HomeCarousel';
import { Schedule } from './components/schedule/Schedule';
import { Location } from './components/location/Location';
import './Home.scss';
import { useTheme } from '../../shared/theme/ThemeContext';
import { ScheduleAppointment } from '../../shared/components/schedule-appointment/ScheduleAppointment';
import { Testimonials } from './components/testimonials/Testimonials';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export function Home() {
  const { theme } = useTheme();
  const { name } = clinicInformation;

  const handleContactClick = () => {
    // Navigate to contact page
    window.location.href = '/contact';
  };

  const handleScheduleClick = () => {
    // Scroll to schedule appointment section
    const scheduleSection = document.querySelector('.schedule-appointment-section');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Content className={`home-content home-content--${theme.mode}`} data-theme={theme}>
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <Space direction="vertical" size="large" className="home-hero-text">
            <Title level={1} className="home-hero-title">
              {name}
            </Title>
            <Paragraph className="home-hero-description">
              Atención médica especializada en ortopedia y columna vertebral. Nuestro equipo de profesionales está
              dedicado a brindarte el mejor cuidado para tu recuperación y bienestar integral.
            </Paragraph>
            <Space size="middle" wrap>
              <Button
                type="primary"
                size="large"
                icon={<PhoneOutlined />}
                onClick={handleContactClick}
                className="home-cta-primary"
              >
                Contactar Ahora
              </Button>
              <Button
                size="large"
                icon={<ClockCircleOutlined />}
                onClick={handleScheduleClick}
                className="home-cta-secondary"
              >
                Agendar Cita
              </Button>
            </Space>
          </Space>
        </div>
      </section>

      {/* Services Carousel */}
      <section className="services-section" data-theme={theme}>
        <HomeCarousel />
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" data-theme={theme}>
        <Testimonials />
      </section>

      {/* Schedule and Location Section */}
      <section className="schedule-location-section" data-theme={theme}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} lg={12}>
            <Location />
          </Col>
          <Col xs={24} lg={12}>
            <Schedule />
          </Col>
        </Row>
      </section>

      {/* Schedule Appointment Section */}
      <section className="schedule-appointment-section" data-theme={theme}>
        <ScheduleAppointment />
      </section>
    </Content>
  );
}
