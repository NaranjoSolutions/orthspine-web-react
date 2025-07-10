import { Layout, Typography } from 'antd';
import { ScheduleAppointment } from '../../components/shared/schedule-appointment/ScheduleAppointment';
import { allClinicServices } from '../../resources/services';
import { clinicInformation } from '../../resources/clinicInformation';
import { Schedule } from '../../components/home/schedule/Schedule';
import { Location } from '../../components/home/location/Location';
import { HomeCarousel } from '../../components/home/carousel/HomeCarousel';

const { Title } = Typography;
const { Content } = Layout;

const Home = () => {
  const { name } = clinicInformation;

  return (
    <Content>
      <Title level={1}>{name}</Title>
      <Title level={2}>Servicios</Title>
      <HomeCarousel services={allClinicServices} slidesToShow={3} />
      <ScheduleAppointment />
      <Schedule />
      <Location />
    </Content>
  );
};

export default Home;
