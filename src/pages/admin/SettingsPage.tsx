import React from 'react';
import { Card, Empty } from 'antd';
import styles from './PlaceholderPage.module.scss';

/**
 * SettingsPage Component
 * Placeholder for settings
 */
const SettingsPage: React.FC = () => {
  return (
    <div className={styles.placeholderPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
      </div>
      <Card bordered={false} className={styles.card}>
        <Empty description="Settings module coming soon" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Card>
    </div>
  );
};

export default SettingsPage;
