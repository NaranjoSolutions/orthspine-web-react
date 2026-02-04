import React from 'react';
import { Card } from 'antd';
import styles from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconColor?: string;
  iconBackground?: string;
}

/**
 * StatCard Component
 * Displays a statistic with an icon in a card format
 *
 * @param title - The title/label for the statistic
 * @param value - The numeric or string value to display
 * @param icon - React node for the icon
 * @param iconColor - Color for the icon (default: inherit)
 * @param iconBackground - Background color for the icon container
 */
export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconColor, iconBackground }) => {
  return (
    <Card className={styles.statCard} bordered={false}>
      <div className={styles.content}>
        <div className={styles.iconContainer} style={{ backgroundColor: iconBackground }}>
          <span className={styles.icon} style={{ color: iconColor }}>
            {icon}
          </span>
        </div>
        <div className={styles.stats}>
          <p className={styles.title}>{title}</p>
          <h2 className={styles.value}>{value}</h2>
        </div>
      </div>
    </Card>
  );
};
