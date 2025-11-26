import React from 'react';
import { Card, Empty } from 'antd';
import styles from './PlaceholderPage.module.scss';

/**
 * PatientsPage Component
 * Placeholder for patients management
 */
const PatientsPage: React.FC = () => {
  return (
    <div className={styles.placeholderPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Patients Management</h1>
      </div>
      <Card bordered={false} className={styles.card}>
        <Empty
          description="Patients management module coming soon"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    </div>
  );
};

export default PatientsPage;
