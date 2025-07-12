import { Col, Layout, Row, Space, Typography } from 'antd';
import './AppFooter.scss';
import { iconsFooter } from './AppFooterContent';
import { clinicInformation } from '../../resources/clinic-information';

const { Footer } = Layout;
const { Text } = Typography;

export const AppFooter: React.FC = () => {
  const { name } = clinicInformation;
  const currentYear = new Date().getFullYear();

  return (
    <Footer className="footer">
      {/* Clinic Name */}
      <Row justify="center" className="clinic-name-row">
        <Col xs={24} sm={20} md={16} lg={12} className="clinic-name-col">
          <Text strong className="clinic-name">
            {name}
          </Text>
        </Col>
      </Row>

      {/* Social Media Icons */}
      <Row justify="center" className="social-icons-row">
        <Col>
          <Space size="large" className="social-icons">
            {iconsFooter.map(({ id, href, target, rel, icon, ariaLabel }) => (
              <a
                key={id}
                href={href}
                target={target}
                rel={rel}
                aria-label={ariaLabel}
                title={ariaLabel}
                className="social-link"
              >
                {icon}
              </a>
            ))}
          </Space>
        </Col>
      </Row>

      {/* Copyright */}
      <Row justify="center" className="copyright-row">
        <Col xs={24} className="copyright-col">
          <Text className="copyright-text">
            Copyright © {currentYear} - Developed by{' '}
            <Text strong className="developer-name">
              Naranjo Solutions
            </Text>
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};
