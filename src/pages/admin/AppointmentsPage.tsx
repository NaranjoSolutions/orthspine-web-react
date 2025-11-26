import React from 'react';
import { Card, Empty } from 'antd';
import styles from './PlaceholderPage.module.scss';

/**
 * AppointmentsPage Component
 * Placeholder for appointments management
 */
const AppointmentsPage: React.FC = () => {
  return (
    <div className={styles.placeholderPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Appointments Management</h1>
      </div>
      <Card bordered={false} className={styles.card}>
        <Empty
          description="Appointments management module coming soon"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    </div>
  );
};

export default AppointmentsPage;
