import { Link } from 'react-router-dom';

import './MainMenu.scss';

export const mainMenuItems = [
  { key: 'home', label: <Link to="/">Inicio</Link> },
  { key: 'services', label: <Link to="/services">Servicios</Link> },
  { key: 'testimonials', label: <Link to="/testimonials">Testimonios</Link> },
  { key: 'contact', label: <Link to="/contact">Contacto</Link> },
  { key: 'about-us', label: <Link to="/about-us">Acerca de</Link> },
];
