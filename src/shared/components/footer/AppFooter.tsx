import React from 'react';
import { Layout } from 'antd';
import styles from './AppFooter.module.scss';

const { Footer } = Layout;

/**
 * AppFooter Component
 * Footer for public pages
 */
export const AppFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>© 2024 Orthopedic Spine. All rights reserved.</p>
      </div>
    </Footer>
  );
};
