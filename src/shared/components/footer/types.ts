import { ReactNode } from 'react';

export interface AppIcon {
  id: string;
  href: string;
  target: '_blank' | '_self' | '_parent' | '_top';
  rel: string;
  icon: ReactNode;
  label: string;
  ariaLabel: string;
}

export type SocialMediaPlatform = 'facebook' | 'instagram' | 'youtube';
