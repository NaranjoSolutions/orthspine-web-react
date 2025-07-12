import { Col, Layout, Row, Space, Typography } from 'antd';
import styles from './AppFooter.module.scss';
import { iconsFooter } from './AppFooterContent';
import { clinicInformation } from '../../resources/clinic-information';

const { Footer } = Layout;
const { Text } = Typography;

export const AppFooter: React.FC = () => {
  const { name } = clinicInformation;
  const currentYear = new Date().getFullYear();

  return (
    <Footer className={styles.footer}>
      {/* Clinic Name */}
      <Row justify="center" className={styles.clinicNameRow}>
        <Col xs={24} sm={20} md={16} lg={12} className={styles.clinicNameCol}>
          <Text strong className={styles.clinicName}>
            {name}
          </Text>
        </Col>
      </Row>

      {/* Social Media Icons */}
      <Row justify="center" className={styles.socialIconsRow}>
        <Col>
          <Space size="large" className={styles.socialIcons}>
            {iconsFooter.map(({ id, href, target, rel, icon, ariaLabel }) => (
              <a
                key={id}
                href={href}
                target={target}
                rel={rel}
                aria-label={ariaLabel}
                title={ariaLabel}
                className={styles.socialLink}
              >
                {icon}
              </a>
            ))}
          </Space>
        </Col>
      </Row>

      {/* Copyright */}
      <Row justify="center" className={styles.copyrightRow}>
        <Col xs={24} className={styles.copyrightCol}>
          <Text className={styles.copyrightText}>
            Copyright © {currentYear} - Developed by{' '}
            <Text strong className={styles.developerName}>
              Naranjo Solutions
            </Text>
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};
