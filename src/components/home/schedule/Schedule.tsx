import { Col, Row, Typography, Layout } from 'antd';
import styles from './Schedule.module.css';
import { clinicInformation } from '../../../resources/clinicInformation';

const { Paragraph } = Typography;
const { Content } = Layout;

export const Schedule = () => {
  const { schedule } = clinicInformation;

  return (
    <Content className={styles['schedule-content']}>
      <Row justify="center">
        <Col>
          <Paragraph className={styles['schedule-heading']} strong>
            Nuestro Horario:
          </Paragraph>
          {schedule.map((day, index) => (
            <Paragraph className={styles['schedule-day']} key={index}>
              {day}
            </Paragraph>
          ))}
        </Col>
      </Row>
    </Content>
  );
};
