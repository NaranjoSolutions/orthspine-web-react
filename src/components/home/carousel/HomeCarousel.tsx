import { Card, Carousel, Col, Layout, Row } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSiderMenuSelectedKey } from '../../../store/redux/slices/uiSlice';
import { useCallback } from 'react';
import styles from './HomeCarousel.module.css';
import { ServicesCardProps } from '../../services/types';

const { Meta } = Card;
const { Content } = Layout;

export const HomeCarousel: React.FC<ServicesCardProps> = ({ services, slidesToShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const principalServices = services.filter((service) => service.isPrimary);

  const handleOnClickCarouselCard = useCallback(
    (serviceId: string) => {
      dispatch(setSiderMenuSelectedKey('/services'));
      navigate(`/services/${serviceId}`);
    },
    [dispatch, navigate],
  );

  return (
    <Content className={styles['carousel-content']}>
      <Carousel
        autoplay
        arrows
        slidesToShow={slidesToShow}
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {principalServices.map((service) => (
          <div key={service.id}>
            <Row justify="center" gutter={24}>
              <Col span={24}>
                <Card
                  hoverable
                  className={styles['carousel-card']}
                  cover={<img alt={service.alt} src={service.image} className={styles['carousel-image']} />}
                  onClick={() => handleOnClickCarouselCard(service.id.toString())}
                >
                  <Meta title={service.title} description={service.shortDescription || ''} />
                </Card>
              </Col>
            </Row>
          </div>
        ))}
      </Carousel>
    </Content>
  );
};
