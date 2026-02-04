import React from 'react';
import { UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined, CommentOutlined } from '@ant-design/icons';
import { RecentActivity, ActivityType } from '../types';
import { formatRelativeTime } from '@/shared/utils/dateUtils';
import styles from './ActivityItem.module.scss';

interface ActivityItemProps {
  activity: RecentActivity;
}

/**
 * Get icon and color based on activity type
 */
const getActivityIconAndColor = (type: ActivityType): { icon: React.ReactNode; color: string; background: string } => {
  switch (type) {
    case ActivityType.PATIENT_REGISTERED:
      return {
        icon: <UserAddOutlined />,
        color: '#52c41a',
        background: '#f6ffed',
      };
    case ActivityType.APPOINTMENT_CONFIRMED:
      return {
        icon: <CheckCircleOutlined />,
        color: '#1890ff',
        background: '#e6f7ff',
      };
    case ActivityType.APPOINTMENT_CANCELLED:
      return {
        icon: <CloseCircleOutlined />,
        color: '#ff4d4f',
        background: '#fff1f0',
      };
    case ActivityType.TESTIMONIAL_SUBMITTED:
      return {
        icon: <CommentOutlined />,
        color: '#faad14',
        background: '#fffbe6',
      };
    default:
      return {
        icon: <CommentOutlined />,
        color: '#8c8c8c',
        background: '#fafafa',
      };
  }
};

/**
 * ActivityItem Component
 * Displays a single activity item in the recent activities list
 */
export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { icon, color, background } = getActivityIconAndColor(activity.type);

  return (
    <div className={styles.activityItem}>
      <div className={styles.iconContainer} style={{ backgroundColor: background }}>
        <span className={styles.icon} style={{ color }}>
          {icon}
        </span>
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{activity.title}</p>
        <p className={styles.description}>{activity.description}</p>
      </div>
      <span className={styles.time}>{formatRelativeTime(activity.timestamp)}</span>
    </div>
  );
};
