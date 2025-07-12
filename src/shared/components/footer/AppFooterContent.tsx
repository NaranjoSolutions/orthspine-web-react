import { FacebookOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { AppIcon } from './types';

const ICON_SIZE = 24;

export const iconsFooter: readonly AppIcon[] = [
  {
    id: 'facebook',
    href: 'https://www.facebook.com/share/12FDcXXvESd/',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <FacebookOutlined style={{ fontSize: ICON_SIZE }} />,
    label: 'Facebook',
    ariaLabel: 'Visit our Facebook page',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/orthopedic_spine_s?igsh=bHY2cHZ2MXd4dzIz',
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <InstagramOutlined style={{ fontSize: ICON_SIZE }} />,
    label: 'Instagram',
    ariaLabel: 'Visit our Instagram profile',
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/', // Updated to orthopedicspine channel
    target: '_blank',
    rel: 'noopener noreferrer',
    icon: <YoutubeOutlined style={{ fontSize: ICON_SIZE }} />,
    label: 'YouTube',
    ariaLabel: 'Visit our YouTube channel',
  },
] as const;
