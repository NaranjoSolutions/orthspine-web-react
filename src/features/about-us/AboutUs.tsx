import { Card, Col, Divider, Layout, Row, Typography } from 'antd';
import { aboutUsContent, infoItems } from './content';
import { ScheduleAppointment } from '../../shared/components/schedule-appointment/ScheduleAppointment';
import { useTheme } from '../../shared/theme/ThemeContext';
import './AboutUs.scss';

const { Title, Text } = Typography;
const { Content } = Layout;

export function AboutUs() {
  const { theme } = useTheme();
  return (
    <Content>
      <Title level={1}>Sobre Nosotros</Title>

      <Content style={{ textAlign: 'left', padding: '20px' }}>
        <Row>
          <Col span={24}>
            {aboutUsContent.map((paragraphItem, index) => (
              <div key={index}>
                <Title key={paragraphItem.key} level={3}>
                  {paragraphItem.title}
                </Title>
                <Text>{paragraphItem.text}</Text>
              </div>
            ))}
          </Col>
        </Row>
        <Divider />

        <Row gutter={[16, 16]}>
          {infoItems.map((item) => (
            <Col key={item.id} xs={24} sm={24} md={12} lg={8}>
              <Card
                hoverable
                style={{ width: 240, borderRadius: 10 }}
                cover={<img alt={item.name} src={item.image} height={210} />}
              >
                <Title level={4}>{item.name}</Title>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Schedule Appointment Section */}
        <section className="schedule-appointment-section" data-theme={theme}>
          <ScheduleAppointment />
        </section>
      </Content>
    </Content>
  );
}
