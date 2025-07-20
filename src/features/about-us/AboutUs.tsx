import { Card, Col, Divider, Layout, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import { UserOutlined, BookOutlined, TrophyOutlined } from '@ant-design/icons';
import { aboutUsContent, infoItems, InfoItem } from './content';
import { ScheduleAppointment } from '../../shared/components/schedule-appointment/ScheduleAppointment';
import { useTheme } from '../../shared/theme/ThemeContext';
import './AboutUs.scss';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

export function AboutUs() {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const getIconForItem = (item: InfoItem) => {
    switch (item.type) {
      case 'professional':
        return <UserOutlined className="card-icon" />;
      case 'certification':
        return <TrophyOutlined className="card-icon" />;
      case 'institution':
        return <BookOutlined className="card-icon" />;
      default:
        return <UserOutlined className="card-icon" />;
    }
  };

  return (
    <Content className="about-us-page" data-theme={theme.mode}>
      <motion.div className="about-us-container" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header Section */}
        <motion.div className="header-section" variants={itemVariants}>
          <Title level={1} className="page-title">
            Sobre Nosotros
          </Title>
          <Text type="secondary" className="page-subtitle">
            Conoce más sobre nuestro equipo, historia y compromiso con tu bienestar
          </Text>
        </motion.div>

        {/* Content Section */}
        <motion.div className="content-section" variants={itemVariants}>
          <Row justify="center">
            <Col xs={24} sm={22} md={20} lg={18} xl={16}>
              <div className="content-wrapper">
                {aboutUsContent.map((paragraphItem) => (
                  <motion.div key={paragraphItem.key} className="content-item" variants={itemVariants}>
                    <Title level={3} className="content-title">
                      {paragraphItem.title}
                    </Title>
                    <Paragraph className="content-text">{paragraphItem.text}</Paragraph>
                  </motion.div>
                ))}
              </div>
            </Col>
          </Row>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <Divider className="section-divider">
            <TrophyOutlined className="divider-icon" />
          </Divider>
        </motion.div>

        {/* Info Cards Section */}
        <motion.div className="info-cards-section" variants={itemVariants}>
          <div className="cards-header">
            <Title level={2} className="section-title">
              Nuestro Equipo y Certificaciones
            </Title>
            <Text type="secondary" className="section-subtitle">
              Profesionales certificados comprometidos con la excelencia
            </Text>
          </div>

          <Row gutter={[24, 24]} justify="center">
            {infoItems.map((item) => (
              <Col key={item.id} xs={24} sm={12} md={8} lg={8}>
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Card
                    className="info-card"
                    hoverable
                    cover={
                      <div className="card-image-wrapper">
                        <img alt={item.name} src={item.image} className="card-image" />
                        <div className="card-overlay">{getIconForItem(item)}</div>
                      </div>
                    }
                    bordered={false}
                  >
                    <div className="card-content">
                      <Title level={4} className="card-title">
                        {item.name}
                      </Title>
                      {item.description && (
                        <Text type="secondary" className="card-description">
                          {item.description}
                        </Text>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>

        {/* Schedule Appointment Section */}
        <motion.section className="schedule-appointment-section" variants={itemVariants} data-theme={theme.mode}>
          <ScheduleAppointment />
        </motion.section>
      </motion.div>
    </Content>
  );
}
