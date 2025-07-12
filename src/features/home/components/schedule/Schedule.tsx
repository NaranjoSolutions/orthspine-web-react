import { Col, Row, Typography, Layout } from 'antd';
import './Schedule.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Paragraph } = Typography;
const { Content } = Layout;

export const Schedule = () => {
  const { schedule } = clinicInformation;

  return (
    <Content className="schedule-content">
      <Row justify="center">
        <Col>
          <Paragraph className="schedule-heading" strong>
            Nuestro Horario:
          </Paragraph>
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
