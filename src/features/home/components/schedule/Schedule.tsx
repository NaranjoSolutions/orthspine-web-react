import { Col, Row, Typography, Layout } from 'antd';
import './Schedule.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Paragraph, Title } = Typography;
const { Content } = Layout;

export const Schedule = () => {
  const { schedule } = clinicInformation;

  return (
    <Content className="schedule-content">
      <Row justify="center">
        <Col>
          <Title level={2} className="schedule-heading">
            Horarios de Atención
          </Title>
          {schedule.map((day, index) => (
            <Paragraph className="schedule-day" key={index}>
              {day}
            </Paragraph>
          ))}
        </Col>
      </Row>
    </Content>
  );
};
