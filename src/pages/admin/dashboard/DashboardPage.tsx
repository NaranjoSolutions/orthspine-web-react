import React, { useEffect } from 'react';
import { Row, Col, Card, Calendar, Badge, Empty, List } from 'antd';
import { TeamOutlined, CalendarOutlined, CommentOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '@/store';
import { setDashboardStats, setRecentActivities, setLoading } from '@/features/admin/store';
import { adminDashboardService } from '@/features/admin/services';
import { StatCard, ActivityItem } from '@/features/admin/components';
import styles from './DashboardPage.module.scss';

/**
 * DashboardPage Component
 * Main admin dashboard with overview statistics and recent activities
 *
 * Features:
 * - Statistics cards (patients, appointments, testimonials)
 * - Calendar with appointment indicators
 * - Recent activity feed
 */
const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats, recentActivities, isLoading } = useAppSelector((state) => state.adminDashboard);

  /**
   * Load dashboard data on mount
   */
  useEffect(() => {
    const loadDashboardData = async () => {
      dispatch(setLoading(true));
      try {
        const [statsData, activitiesData] = await Promise.all([
          adminDashboardService.getDashboardStats(),
          adminDashboardService.getRecentActivities(),
        ]);
        dispatch(setDashboardStats(statsData));
        dispatch(setRecentActivities(activitiesData));
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadDashboardData();
  }, [dispatch]);

  /**
   * Calendar date cell render
   * Show badges for dates with appointments
   */
  const dateCellRender = (value: Dayjs) => {
    // Mock data - show indicator on specific dates
    const hasEvent = value.date() === 18 || value.date() === 9;
    return hasEvent ? <Badge status="processing" /> : null;
  };

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.header}>
        <h1 className={styles.title}>Panel de Control</h1>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} className={styles.statsRow}>
        <Col xs={24} sm={24} md={8}>
          <StatCard
            title="Total de Pacientes"
            value={stats?.totalPatients || 0}
            icon={<TeamOutlined />}
            iconColor="#1890ff"
            iconBackground="#e6f7ff"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatCard
            title="Citas Próximas"
            value={stats?.upcomingAppointments || 0}
            icon={<CalendarOutlined />}
            iconColor="#52c41a"
            iconBackground="#f6ffed"
          />
        </Col>
        <Col xs={24} sm={24} md={8}>
          <StatCard
            title="Testimonios Pendientes"
            value={stats?.pendingTestimonials || 0}
            icon={<CommentOutlined />}
            iconColor="#faad14"
            iconBackground="#fffbe6"
          />
        </Col>
      </Row>

      {/* Calendar and Recent Activity */}
      <Row gutter={[24, 24]} className={styles.contentRow}>
        <Col xs={24} lg={12}>
          <Card title="Calendario de Citas" bordered={false} className={styles.calendarCard}>
            <Calendar fullscreen={false} dateCellRender={dateCellRender} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Actividad Reciente" bordered={false} className={styles.activityCard}>
            {isLoading ? (
              <Empty description="Cargando..." />
            ) : recentActivities.length === 0 ? (
              <Empty description="No hay actividades recientes" />
            ) : (
              <List
                dataSource={recentActivities}
                renderItem={(activity) => <ActivityItem key={activity.id} activity={activity} />}
                className={styles.activityList}
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
