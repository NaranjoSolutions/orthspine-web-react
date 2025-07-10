import { Col, Layout, List, Row, Typography } from 'antd';
import { ServicesCarousel } from '../../components/services/ServicesCarousel';
import { ScheduleAppointment } from '../../components/shared/schedule-appointment/ScheduleAppointment';
import { useState } from 'react';
import { allClinicServices } from '../../resources/services';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Content } = Layout;

const Services = () => {
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(1);
  const currentService =
    allClinicServices.length > 0 && allClinicServices[currentSlide] ? allClinicServices[currentSlide] : null;

  const onBeforeChange = (_: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };

  const onClickService = (id: number) => {
    navigate(`/services/${id}`);
  };

  return (
    <Content>
      <Title>Servicios</Title>
      <Row justify={'space-around'} align={'top'}>
        <Col xs={24} sm={24} md={8} lg={6}>
          <ServicesCarousel services={allClinicServices} slidesToShow={1} beforeChange={onBeforeChange} />
        </Col>
        <Col span={18}>
          {currentService && (
            <List
              size="small"
              bordered
              dataSource={[currentService]}
              renderItem={(item) => (
                <List.Item
                  style={{ cursor: 'pointer' }}
                  onClick={() => onClickService(item.id)}
                  aria-label={`Ver detalles del servicio ${item.title}`}
                >
                  <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>
              )}
            />
          )}
        </Col>
      </Row>
      <ScheduleAppointment />
    </Content>
  );
};

export default Services;
