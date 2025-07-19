import { Col, Layout, Row, Typography } from 'antd';

import { useTheme } from '../../shared/theme/ThemeContext';
import { ContactForm } from './components/form/ContactForm';
import { ClinicLocation } from './components/location/ClinicLocation';

import './Contact.scss';

const { Title } = Typography;
const { Content } = Layout;

export function Contact() {
  const { theme } = useTheme();

  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24 }} justify="center" wrap style={{ padding: 10 }}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <Content>
          <Title level={2} style={{ textAlign: 'center' }}>
            Contáctenos
          </Title>
          <ContactForm />
        </Content>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <Content>
          <Title level={2} style={{ textAlign: 'center' }}>
            ¿Cómo llegar?
          </Title>
          <ClinicLocation />
        </Content>
      </Col>
    </Row>
  );
}
