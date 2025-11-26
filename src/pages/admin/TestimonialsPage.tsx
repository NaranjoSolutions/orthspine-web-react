import React from 'react';
import { Card, Empty } from 'antd';
import styles from './PlaceholderPage.module.scss';

/**
 * TestimonialsPage Component
 * Placeholder for testimonials management
 */
const TestimonialsPage: React.FC = () => {
  return (
    <div className={styles.placeholderPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Testimonials Management</h1>
      </div>
      <Card bordered={false} className={styles.card}>
        <Empty
          description="Testimonials management module coming soon"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </Card>
    </div>
  );
};

export default TestimonialsPage;
