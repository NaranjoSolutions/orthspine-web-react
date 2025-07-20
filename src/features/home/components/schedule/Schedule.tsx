import { Col, Row, Card, Typography, Space, List, Layout } from 'antd';
import { ClockCircleOutlined, CalendarOutlined } from '@ant-design/icons';
import { useTheme } from '../../../../shared/theme/ThemeContext';
import './Schedule.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Title } = Typography;
const { Content } = Layout;

export const Schedule = () => {
  const { schedule } = clinicInformation;
  const { theme } = useTheme();

  return (
    <Content className="schedule-section">
      <Row justify="center" style={{ width: '100%' }}>
        <Col span={24}>
          <Card
            className={`schedule-card schedule-card--${theme.mode}`}
            title={
              <Space align="center" className="schedule-card-title">
                <ClockCircleOutlined className="schedule-card-icon" />
                <Title level={3} className="schedule-title">
                  Horarios de Atención
                </Title>
              </Space>
            }
            bordered={false}
            hoverable
          >
            <div className="schedule-card-content">
              <List
                className="schedule-list"
                dataSource={schedule}
                renderItem={(day, index) => (
                  <List.Item key={index} className="schedule-item">
                    <Space align="center" size="small">
                      <CalendarOutlined className="schedule-day-icon" />
                      <span className="schedule-day-text">{day}</span>
                    </Space>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
