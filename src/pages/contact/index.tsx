import { Col, Layout, Row, Typography } from 'antd';
import { ContactForm } from '../../components/contact/form/ContactForm';
import { ClinicLocation } from '../../components/contact/location/ClinicLocation';
import { ScheduleAppointment } from '../../components/shared/schedule-appointment/ScheduleAppointment';
import styles from './Contact.module.css';

const { Title } = Typography;
const { Content } = Layout;

const Contact: React.FC = () => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify="center" wrap style={{ padding: 10 }}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Content className={styles.contactForm}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Contáctenos
          </Title>
          <ContactForm />
        </Content>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Content className={styles.locationContent}>
          <Title level={2} style={{ textAlign: 'center' }}>
            ¿Cómo llegar?
          </Title>
          <ClinicLocation />
        </Content>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <ScheduleAppointment />
      </Col>
    </Row>
  );
};

export default Contact;
