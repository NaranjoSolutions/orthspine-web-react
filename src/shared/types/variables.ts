export interface ServicesCard {
  serviceId: string;
  title: string;
  shortDescription?: string;
  description?: string;
  alt: string;
  image: string;
  isPrimary?: boolean;
}

export interface ServicesCardProps {
  services: ServicesCard[];
  slidesToShow: number;
}
