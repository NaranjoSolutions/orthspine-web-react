import { Col, Image, Row, Typography, Layout } from 'antd';
import building from '../../../../assets/images/building.png';
import { LocationButtons } from './LocationButtons';
import styles from './Location.module.scss';
import { clinicInformation } from '../../../../shared/resources/clinic-information';

const { Paragraph } = Typography;
const { Content } = Layout;

export const Location = () => {
  const { location } = clinicInformation;

  return (
    <Content className={styles['location-content']}>
      <Row justify="center">
        <Col>
          <Paragraph className={styles['location-heading']} strong>
            Ubicación:
          </Paragraph>
          <Image width={150} height={110} src={building} alt="Ubicación" className={styles['location-image']} />
        </Col>
      </Row>
      <Row justify="center">
        <Paragraph className={styles['location-address']}>{location.address}</Paragraph>
      </Row>
      <LocationButtons latitude={location.latitude} longitude={location.longitude} />
    </Content>
  );
};
