import { Col, Layout, Row, Typography } from 'antd';
import { clinicInformation } from '../../shared/resources/clinic-information';
import { HomeCarousel } from './components/carousel/HomeCarousel';
import { Schedule } from './components/schedule/Schedule';
import { Location } from './components/location/Location';
import './Home.scss';
import { useTheme } from '../../shared/theme/ThemeContext';
import { ScheduleAppointment } from './components/schedule-appointment/ScheduleAppointment';
import { Testimonials } from './components/testimonials/Testimonials';

const { Title } = Typography;
const { Content } = Layout;

export function Home() {
  const { theme } = useTheme();
  const { name } = clinicInformation;

  return (
    <Content className="home-content" data-theme={theme}>
      {/* Hero Section */}
      <section className="hero-section" data-theme={theme}>
        <Row justify="center" align="middle" className="hero-row">
          <Col xs={24} sm={20} md={16} lg={12} className="hero-content">
            <Title level={1} className="clinic-name">
              {name}
            </Title>
            <Title level={2} className="services-title">
              Servicios Especializados
            </Title>
          </Col>
        </Row>
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
