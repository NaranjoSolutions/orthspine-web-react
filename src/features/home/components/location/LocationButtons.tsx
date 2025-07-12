import { Button, Image, Space } from 'antd';
import wazeIcon from '../../../../assets/images/waze.png';
import mapsIcon from '../../../../assets/images/maps.png';
import './LocationButtons.scss';

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
    <Space className="location-buttons-space">
      {locationButtons.map((button) => (
        <Button
          className="location-button"
          key={button.name}
          size="large"
          aria-label={`Abrir ubicación en ${button.name}`}
          onClick={() => window.open(button.url(latitude, longitude), '_blank')}
        >
          <Image className="location-button-icon" src={button.icon} alt={button.name} preview={false} />
        </Button>
      ))}
    </Space>
  );
};
