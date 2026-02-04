import React from 'react';
import { List, Avatar, Typography } from 'antd';
import { UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined, CommentOutlined } from '@ant-design/icons';
import { RecentActivity, ActivityType } from '@/features/admin/types';
import { formatRelativeTime } from '@/shared/utils/dateUtils';
import styles from './ActivityItem.module.scss';

const { Text } = Typography;

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
 * Displays a single activity item in the recent activities list using AntD List.Item
 */
export const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const { icon, color, background } = getActivityIconAndColor(activity.type);

  return (
    <List.Item className={styles.activityItem}>
      <List.Item.Meta
        avatar={
          <Avatar
            icon={icon}
            style={{
              backgroundColor: background,
              color: color,
            }}
            size={48}
            className={styles.avatar}
          />
        }
        title={<Text strong>{activity.title}</Text>}
        description={<Text type="secondary">{activity.description}</Text>}
      />
      <Text type="secondary" className={styles.time}>
        {formatRelativeTime(activity.timestamp)}
      </Text>
    </List.Item>
  );
};
