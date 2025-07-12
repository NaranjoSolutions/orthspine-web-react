import { Layout, Typography } from 'antd';

import { clinicInformation } from '../../shared/resources/clinic-information';
import { HomeCarousel } from './components/carousel/HomeCarousel';
import { Schedule } from './components/schedule/Schedule';
import { Location } from './components/location/Location';

const { Title } = Typography;
const { Content } = Layout;

export function Home() {
  const { name } = clinicInformation;

  return (
    <Content>
      <Title level={1}>{name}</Title>
      <Title level={2}>Servicios</Title>
      <HomeCarousel slidesToShow={3} />
      <Schedule />
      <Location />
    </Content>
  );
}
