import { Col, Row, Card, Typography, Space, Divider, Layout } from 'antd';
import { EnvironmentOutlined, CompassOutlined } from '@ant-design/icons';
import { LocationButtons } from './LocationButtons';
import { useTheme } from '../../../../shared/theme/ThemeContext';
import './Location.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Paragraph, Title } = Typography;
const { Content } = Layout;

export const Location = () => {
  const { location } = clinicInformation;
  const { theme } = useTheme();

  return (
    <Content className="location-section">
      <Row justify="center" style={{ width: '100%' }}>
        <Col span={24}>
          <Card
            className={`location-card location-card--${theme.mode}`}
            title={
              <Space align="center" className="location-card-title">
                <EnvironmentOutlined className="location-card-icon" />
                <Title level={3} className="location-title">
                  Nuestra Ubicación
                </Title>
              </Space>
            }
            bordered={false}
            hoverable
          >
            <div className="location-card-content">
              <Space direction="vertical" size="large" className="location-info">
                <div className="location-address-section">
                  <Space align="start" size="small">
                    <CompassOutlined className="address-icon" />
                    <Paragraph className="location-address" strong>
                      {location.address}
                    </Paragraph>
                  </Space>
                </div>

                <Divider className="location-divider" />

                <div className="location-actions">
                  <Paragraph className="location-instructions" type="secondary">
                    Navega hasta nosotros usando tu aplicación favorita:
                  </Paragraph>
                  <LocationButtons latitude={location.latitude} longitude={location.longitude} />
                </div>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>
    </Content>
  );
};
