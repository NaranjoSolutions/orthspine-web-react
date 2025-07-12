import { Link } from 'react-router-dom';
import { Button } from 'antd';

import logo from './images/clinic-icon.png';
import styles from './Menu.module.scss';

export const menuItems = [
  {
    key: 'clinic-icon',
    label: (
      <Link to="/">
        <img src={logo} alt="Clinic Logo" className={styles.clinicLogo} />
      </Link>
    ),
  },
  { key: 'home', label: <Link to="/">Inicio</Link> },
  { key: 'services', label: <Link to="/services">Servicios</Link> },
  { key: 'testimonials', label: <Link to="/testimonials">Testimonios</Link> },
  { key: 'contact', label: <Link to="/contact">Contacto</Link> },
  { key: 'about-us', label: <Link to="/about-us">Acerca de</Link> },
  {
    key: 'book-appointment',
    label: (
      <Link to="/book-appointment">
        <Button type="primary" className={styles.bookAppointmentButton}>
          Agendar cita
        </Button>
      </Link>
    ),
  },
];
