import {
  Row,
  Col,
  Card,
  Typography,
  Rate,
  Avatar,
  Spin,
  Alert,
  Button,
  Space,
  Pagination,
  Empty,
  Modal,
  Form,
  Input,
  message,
  Layout,
  Statistic,
  Divider,
} from 'antd';
import { StarOutlined, PlusOutlined, CommentOutlined, TeamOutlined, TrophyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useTheme } from '../../shared/theme/ThemeContext';
import { useGetAllTestimonialsQuery, useCreateTestimonialMutation } from '../../api/clinicApi';
import type { CreateTestimonialRequest } from '../../api/clinicApi/types';
import './Testimonials.scss';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { TextArea } = Input;

export function Testimonials() {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const pageSize = 9;

  const { data: testimonials, isLoading, error } = useGetAllTestimonialsQuery();
  const [createTestimonial, { isLoading: isSubmitting }] = useCreateTestimonialMutation();

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleSubmitTestimonial = async (values: CreateTestimonialRequest) => {
    try {
      await createTestimonial(values).unwrap();
      message.success('¡Gracias por tu testimonio! Será revisado antes de publicarse.');
      setIsModalVisible(false);
      form.resetFields();
    } catch {
      message.error('Error al enviar tu testimonio. Por favor intenta de nuevo.');
    }
  };

  const getFilteredTestimonials = () => {
    if (!testimonials) return [];
    // TODO Only show approved testimonials
    // return testimonials.filter((t) => t.status === 'approved');
    return testimonials;
  };

  const filteredTestimonials = getFilteredTestimonials();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  const averageRating =
    filteredTestimonials.length > 0
      ? filteredTestimonials.reduce((acc, t) => acc + t.rating, 0) / filteredTestimonials.length
      : 0;

  if (isLoading) {
    return (
      <Content className={`testimonials-page testimonials-page--${theme.mode}`}>
        <div className="testimonials-loading">
          <Spin size="large" />
          <Text className="loading-text">Cargando testimonios...</Text>
        </div>
      </Content>
    );
  }

  if (error) {
    return (
      <Content className={`testimonials-page testimonials-page--${theme.mode}`}>
        <div className="testimonials-error">
          <Alert
            message="Error al cargar testimonios"
            description="No pudimos cargar los testimonios en este momento. Intenta recargar la página."
            type="warning"
            showIcon
          />
        </div>
      </Content>
    );
  }

  return (
    <Content className={`testimonials-page testimonials-page--${theme.mode}`}>
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="testimonials-hero-content">
          <Space direction="vertical" size="large" className="hero-text">
            <CommentOutlined className="hero-icon" />
            <Title level={1} className="hero-title">
              Testimonios de Nuestros Pacientes
            </Title>
            <Paragraph className="hero-description">
              Conoce las experiencias reales de quienes han confiado en nosotros para su recuperación y bienestar. Tu
              satisfacción es nuestro mayor logro.
            </Paragraph>
          </Space>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="testimonials-stats">
        <div className="testimonials-container">
          <Row gutter={[24, 24]} justify="center">
            <Col xs={24} sm={8} className="stat-col">
              <Card className={`stat-card stat-card--${theme.mode}`} bordered={false}>
                <Statistic
                  title="Pacientes Satisfechos"
                  value={filteredTestimonials.length}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: theme.mode === 'dark' ? '#9bc53d' : '#667eea' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8} className="stat-col">
              <Card className={`stat-card stat-card--${theme.mode}`} bordered={false}>
                <Statistic
                  title="Calificación Promedio"
                  value={averageRating}
                  precision={1}
                  prefix={<StarOutlined />}
                  suffix="/ 5"
                  valueStyle={{ color: theme.mode === 'dark' ? '#9bc53d' : '#667eea' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8} className="stat-col">
              <Card className={`stat-card stat-card--${theme.mode}`} bordered={false}>
                <Statistic
                  title="Años de Experiencia"
                  value={15}
                  prefix={<TrophyOutlined />}
                  suffix="+"
                  valueStyle={{ color: theme.mode === 'dark' ? '#9bc53d' : '#667eea' }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid-section">
        <div className="testimonials-container">
          <Row justify="space-between" align="middle" className="section-header">
            <Col>
              <Title level={2} className="section-title">
                Experiencias Reales
              </Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => setIsModalVisible(true)}
                className="add-testimonial-btn"
              >
                Compartir Mi Experiencia
              </Button>
            </Col>
          </Row>

          {filteredTestimonials.length === 0 ? (
            <Empty description="No hay testimonios disponibles" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          ) : (
            <>
              <Row gutter={[24, 24]} className="testimonials-grid">
                {currentTestimonials.map((testimonial) => (
                  <Col xs={24} sm={12} lg={8} key={testimonial.testimonialId}>
                    <Card className={`testimonial-card testimonial-card--${theme.mode}`} bordered={false}>
                      <div className="testimonial-header">
                        <Avatar size={56} className="testimonial-avatar">
                          {getInitials(testimonial.firstName, testimonial.lastName)}
                        </Avatar>
                        <div className="testimonial-info">
                          <Text strong className="testimonial-name">
                            {testimonial.firstName} {testimonial.lastName}
                          </Text>
                          <div className="testimonial-rating">
                            <Rate
                              disabled
                              defaultValue={testimonial.rating}
                              style={{
                                fontSize: 16,
                                color: theme.mode === 'dark' ? '#ffc53d' : '#faad14',
                              }}
                            />
                          </div>
                          <Text type="secondary" className="testimonial-date">
                            {new Date(testimonial.createdAt).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Text>
                        </div>
                      </div>

                      <Divider className="testimonial-divider" />

                      <Paragraph className="testimonial-comment">"{testimonial.comment}"</Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filteredTestimonials.length > pageSize && (
                <Row justify="center" className="pagination-row">
                  <Pagination
                    current={currentPage}
                    total={filteredTestimonials.length}
                    pageSize={pageSize}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                    showQuickJumper
                    showTotal={(total, range) => `${range[0]}-${range[1]} de ${total} testimonios`}
                    className="testimonials-pagination"
                  />
                </Row>
              )}
            </>
          )}
        </div>
      </section>

      {/* Add Testimonial Modal */}
      <Modal
        title="Compartir Tu Experiencia"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        className={`testimonial-modal testimonial-modal--${theme.mode}`}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitTestimonial} className="testimonial-form">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="firstName"
                rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
              >
                <Input placeholder="Tu nombre" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Apellido"
                name="lastName"
                rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
              >
                <Input placeholder="Tu apellido" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Calificación"
            name="rating"
            rules={[{ required: true, message: 'Por favor selecciona una calificación' }]}
          >
            <Rate
              defaultValue={5}
              style={{
                fontSize: 24,
                color: '#ffc53d',
              }}
            />
          </Form.Item>

          <Form.Item
            label="Tu Experiencia"
            name="comment"
            rules={[
              { required: true, message: 'Por favor comparte tu experiencia' },
              { min: 20, message: 'El comentario debe tener al menos 20 caracteres' },
            ]}
          >
            <TextArea rows={4} placeholder="Comparte tu experiencia con nosotros..." maxLength={500} showCount />
          </Form.Item>

          <Form.Item name="isPublic" initialValue={true} hidden>
            <Input type="hidden" />
          </Form.Item>

          <Row justify="end" gutter={16}>
            <Col>
              <Button onClick={() => setIsModalVisible(false)}>Cancelar</Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit" loading={isSubmitting} className="submit-btn">
                Enviar Testimonio
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Content>
  );
}
