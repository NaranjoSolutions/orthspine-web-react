import { Col, Row, Typography, Layout, Button } from 'antd';
import './ScheduleAppointment.scss';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../../shared/theme/ThemeContext';

const { Title } = Typography;
const { Content } = Layout;

export const ScheduleAppointment = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavigateToAppointment = () => {
    navigate('/appointment');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigateToAppointment();
    }
  };

  return (
    <Content className="schedule-content" data-theme={theme}>
      <div className="schedule-wrapper">
        <Row justify="center" align="middle" gutter={[0, 16]}>
          <Col xs={24} sm={20} md={16} lg={14} xl={12}>
            <Title level={2} className="schedule-title">
              ¿Necesitas una Consulta?
            </Title>
            <p className="schedule-subtitle">Programa tu cita con nuestro especialista en ortopedia y rehabilitación</p>
          </Col>
        </Row>
        <Row justify="center">
          <Col>
            <Button
              type="primary"
              size="large"
              className="cta-button"
              onClick={handleNavigateToAppointment}
              onKeyDown={handleKeyDown}
              aria-label="Agendar una cita"
            >
              Agendar Cita
            </Button>
          </Col>
        </Row>
      </div>
    </Content>
  );
};
