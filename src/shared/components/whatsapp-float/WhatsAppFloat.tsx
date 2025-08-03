import { WhatsAppOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { clinicInformation } from '../../resources/clinic-information';
import { useTheme } from '../../theme/ThemeContext';
import './WhatsAppFloat.scss';

export function WhatsAppFloat() {
  const { theme } = useTheme();
  const phoneNumber = clinicInformation.contact.phones[0].replace(/\D/g, ''); // Remove non-digit characters
  const whatsAppMessage =
    'Hola, tengo una consulta sobre Orthopedic Spine. Me gustaría agendar una cita o recibir más información.';
  const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <FloatButton
      shape="circle"
      type="primary"
      href={whatsAppLink}
      target="_blank"
      style={{
        insetInlineEnd: 24,
        bottom: 24,
        background: '#25d366',
        backgroundColor: '#25d366',
        borderColor: '#25d366',
      }}
      className={`whatsapp-float whatsapp-float--${theme.mode}`}
      icon={<WhatsAppOutlined style={{ color: 'white' }} />}
      aria-label="Contactanos por WhatsApp - Haz clic para abrir chat"
      data-theme={theme.mode}
    />
  );
}
