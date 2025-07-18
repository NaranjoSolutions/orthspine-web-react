import { Card, Carousel, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import './HomeCarousel.scss';
import { allClinicServices } from '../../../../shared/resources/services/services';
import { useTheme } from '../../../../shared/theme/ThemeContext';

const { Meta } = Card;
const { Content } = Layout;

export function HomeCarousel() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const principalServices = allClinicServices.filter((service) => service.isPrimary);

  const handleOnClickCarouselCard = useCallback(
    (serviceId: string) => {
      navigate(`/services/${serviceId}`);
    },
    [navigate],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, serviceId: string) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleOnClickCarouselCard(serviceId);
      }
    },
    [handleOnClickCarouselCard],
  );

  if (principalServices.length === 0) {
    return null; // or a loading/empty state component
  }

  return (
    <Content className="carousel-content" data-theme={theme}>
      <div className="carousel-wrapper">
        <Carousel
          autoplay
          arrows
          dots={{ className: 'carousel-dots' }}
          autoplaySpeed={4000}
          speed={800}
          slidesToShow={4}
          slidesToScroll={1}
          infinite
          pauseOnHover
          responsive={[
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
              },
            },
          ]}
        >
          {principalServices.map((service) => (
            <div key={service.id} className="carousel-slide">
              <div className="card-wrapper">
                <Card
                  hoverable
                  className="carousel-card"
                  cover={
                    <div className="image-wrapper">
                      <img
                        alt={service.alt}
                        src={service.image}
                        className="carousel-image"
                        loading="lazy"
                        // onError={(e) => {
                        //   e.currentTarget.src = '/images/placeholder-service.jpg';
                        // }}
                      />
                    </div>
                  }
                  onClick={() => handleOnClickCarouselCard(service.id.toString())}
                  onKeyDown={(e) => handleKeyDown(e, service.id.toString())}
                  tabIndex={0}
                  role="button"
                  aria-label={`Ver más sobre ${service.title}`}
                >
                  <Meta
                    title={<span className="card-title">{service.title}</span>}
                    description={
                      <span className="card-description">
                        {service.shortDescription || 'Conoce más sobre este servicio'}
                      </span>
                    }
                  />
                </Card>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </Content>
  );
}
