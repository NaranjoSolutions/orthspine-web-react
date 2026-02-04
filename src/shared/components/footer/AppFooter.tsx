import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { clinicInformation } from '@/shared/resources/clinic-information';
import { ROUTE_PATHS } from '@/routing/config/routePaths';
import styles from './AppFooter.module.scss';

const { Footer } = Layout;
const { Text } = Typography;

/**
 * AppFooter Component
 * Footer for public pages
 */
export const AppFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer className={styles.footer}>
      <div className={styles.container}>
        {/* Navigation Links */}
        <Row justify="center" className={styles.navRow}>
          <Col xs={24} className={styles.navCol}>
            <a href={ROUTE_PATHS.HOME} className={styles.navLink}>
              Inicio
            </a>
            <a href={ROUTE_PATHS.SERVICES} className={styles.navLink}>
              Servicios
            </a>
            <a href={ROUTE_PATHS.CONTACT} className={styles.navLink}>
              Contacto
            </a>
            <a href={ROUTE_PATHS.ABOUT} className={styles.navLink}>
              Sobre Nosotros
            </a>
            <a href={ROUTE_PATHS.PRIVACY_POLICY} className={styles.navLink}>
              Política de Privacidad
            </a>
            <a href={ROUTE_PATHS.TERMS_OF_SERVICE} className={styles.navLink}>
              Términos de Servicio
            </a>
          </Col>
        </Row>

        {/* Social Media Icons */}
        <Row justify="center" className={styles.socialRow}>
          <Col xs={24} className={styles.socialCol}>
            <a
              href={clinicInformation.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} facebook`}
              aria-label="Facebook"
            >
              <FacebookOutlined />
            </a>
            <a
              href={clinicInformation.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} instagram`}
              aria-label="Instagram"
            >
              <InstagramOutlined />
            </a>
            <a
              href={clinicInformation.socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.socialIcon} youtube`}
              aria-label="YouTube"
            >
              <YoutubeOutlined />
            </a>
          </Col>
        </Row>

        {/* Copyright */}
        <Row justify="center" className={styles.copyrightRow}>
          <Col xs={24} className={styles.copyrightCol}>
            <Text className={styles.copyrightText}>
              © {currentYear} {clinicInformation.name}. Todos los derechos reservados. - Desarrollado por{' '}
              <Text strong className={styles.developerName}>
                Naranjo Solutions
              </Text>
            </Text>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};
