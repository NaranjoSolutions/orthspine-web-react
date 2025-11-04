import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { clinicInformation } from '@/shared/resources/clinic-information';
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
            <a href="/" className={styles.navLink}>
              Home
            </a>
            <a href="/services" className={styles.navLink}>
              Services
            </a>
            <a href="/contact" className={styles.navLink}>
              Contact
            </a>
            <a href="/about" className={styles.navLink}>
              About
            </a>
            <a href="/privacy-policy" className={styles.navLink}>
              Privacy Policy
            </a>
            <a href="/terms-of-service" className={styles.navLink}>
              Terms of Service
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
              className={styles.socialIcon}
              aria-label="Facebook"
            >
              <FacebookOutlined />
            </a>
            <a
              href={clinicInformation.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Instagram"
            >
              <InstagramOutlined />
            </a>
            <a
              href={clinicInformation.socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
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
              © {currentYear} {clinicInformation.name}. All rights reserved. - Developed by{' '}
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
