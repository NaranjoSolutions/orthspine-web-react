import { Button, Image, Space } from 'antd';
import wazeIcon from '../../../../assets/images/waze.png';
import mapsIcon from '../../../../assets/images/maps.png';
import styles from './LocationButtons.module.scss';

interface LocationButtonsProps {
  latitude: number;
  longitude: number;
}

const locationButtons = [
  {
    name: 'Google Maps',
    icon: mapsIcon,
    url: (lat: number, lon: number) => `https://www.google.com/maps?q=${lat},${lon}`, // Google Maps URL
  },
  {
    name: 'Waze',
    icon: wazeIcon,
    url: (lat: number, lon: number) => `https://waze.com/ul?q=${lat},${lon}`, // Waze URL
  },
];

export const LocationButtons: React.FC<LocationButtonsProps> = ({ latitude, longitude }) => {
  return (
    <Space className={styles.space}>
      {locationButtons.map((button) => (
        <Button
          className={styles.button}
          key={button.name}
          size="large"
          aria-label={`Abrir ubicación en ${button.name}`}
          onClick={() => window.open(button.url(latitude, longitude), '_blank')}
        >
          <Image className={styles.icons} src={button.icon} alt={button.name} preview={false} />
        </Button>
      ))}
    </Space>
  );
};
