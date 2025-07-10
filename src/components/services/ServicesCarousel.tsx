import { Card, Carousel, Layout } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import styles from './ServicesCarousel.module.css';
import { ServicesCardProps } from './types';

const { Meta } = Card;
const { Content } = Layout;

interface ServicesCarouselProps extends ServicesCardProps {
  beforeChange?: (oldIndex: number, newIndex: number) => void;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ services, slidesToShow, beforeChange }) => {
  const navigate = useNavigate();

  const onClickCarouselCard = useCallback(
    (serviceId: string) => {
      navigate(`/services/${serviceId}`);
    },
    [navigate],
  );

  return (
    <Content className={styles.content}>
      <Carousel autoplay arrows slidesToShow={slidesToShow} beforeChange={beforeChange}>
        {services.map((service) => (
          <div key={service.id}>
            <Card
              hoverable
              style={{ width: '100%' }}
              cover={<img className={styles.card_image} alt={service.alt} src={service.image} height={320} />}
              onClick={() => onClickCarouselCard(service.id.toString())}
            >
              <Meta title={service.title} />
            </Card>
          </div>
        ))}
      </Carousel>
    </Content>
  );
};
