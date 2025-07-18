import { Col, Image, Row, Typography, Layout } from 'antd';
import building from '../../../../assets/images/building.png';
import { LocationButtons } from './LocationButtons';
import './Location.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Paragraph, Title } = Typography;
const { Content } = Layout;

export const Location = () => {
  const { location } = clinicInformation;

  return (
    <Content className="location-content">
      <Row justify="center">
        <Col>
          <Title level={2} className="location-heading">
            Nuestra Ubicación:
          </Title>
          <Image width={150} height={110} src={building} alt="Ubicación" className="location-image" />
        </Col>
      </Row>
      <Row justify="center">
        <Paragraph className="location-address">{location.address}</Paragraph>
      </Row>
      <LocationButtons latitude={location.latitude} longitude={location.longitude} />
    </Content>
  );
};
