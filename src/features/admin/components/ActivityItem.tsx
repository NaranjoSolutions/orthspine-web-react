import React from 'react';
import {
  UserAddOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { RecentActivity, ActivityType } from '../types';
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
 * Format timestamp to relative time
 */
const formatRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const activityTime = new Date(timestamp);
  const diffInMs = now.getTime() - activityTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return activityTime.toLocaleDateString();
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
