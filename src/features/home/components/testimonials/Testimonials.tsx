import { Card, Col, Row, Typography, Rate, Avatar, Spin, Alert, Divider } from 'antd';

import { useTheme } from '../../../../shared/theme/ThemeContext';
import './Testimonials.scss';
import { useGetAllTestimonialsQuery } from '../../../../api/clinicApi';

const { Title, Paragraph, Text } = Typography;

export function Testimonials() {
  const { theme } = useTheme();

  const { data: testimonials, isLoading, error } = useGetAllTestimonialsQuery();

  const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="testimonials-loading" data-theme={theme}>
        <Spin size="large" />
        <Text>Cargando testimonios...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="testimonials-error" data-theme={theme}>
        <Alert
          message="Error al cargar testimonios"
          description="No pudimos cargar los testimonios en este momento. Intenta recargar la página."
          type="warning"
          showIcon
        />
      </div>
    );
  }

  if (!testimonials || testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  // Show maximum 6 testimonials for the home page
  const displayTestimonials = testimonials.slice(0, 6);

  return (
    <div className={`testimonials-section-content testimonials-section-content--${theme.mode}`} data-theme={theme}>
      <Row justify="center" className="section-header">
        <Col>
          <Title level={2} className="section-title">
            Lo que dicen nuestros pacientes
          </Title>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="testimonials-grid">
        {displayTestimonials.map((testimonial) => (
          <Col key={testimonial.testimonialId} xs={24} sm={12} lg={8} className="testimonial-col">
            <Card className={`testimonial-card testimonial-card--${theme.mode}`} bordered={false}>
              <div className="testimonial-header">
                <Avatar size={60} className={`testimonial-avatar testimonial-avatar--${theme.mode}`}>
                  {getInitials(testimonial.firstName, testimonial.lastName)}
                </Avatar>
                <div className="testimonial-info">
                  <Text strong className="testimonial-name">
                    {testimonial.firstName} {testimonial.lastName}
                  </Text>
                  <div className={`testimonial-rating testimonial-rating--${theme.mode}`}>
                    <Rate
                      disabled
                      defaultValue={testimonial.rating}
                      style={{
                        fontSize: 16,
                        color: theme.mode === 'dark' ? '#ffc53d' : '#faad14',
                      }}
                    />
                  </div>
                </div>
              </div>
              <Divider className="testimonial-divider" />

              <Paragraph className="testimonial-comment">"{testimonial.comment}"</Paragraph>
            </Card>
          </Col>
        ))}
      </Row>

      {testimonials.length > 6 && (
        <Row justify="center" className="view-more-row">
          <Col>
            <Text className="view-more-text">
              Ver más testimonios en nuestra{' '}
              <a href="/testimonials" className="view-more-link">
                página de testimonios
              </a>
            </Text>
          </Col>
        </Row>
      )}
    </div>
  );
}
