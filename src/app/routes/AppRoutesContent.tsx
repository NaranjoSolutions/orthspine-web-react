import AboutUs from '../../pages/about-us';
import Contact from '../../pages/contact';
import Home from '../../pages/home';
import Login from '../../pages/login';
import NotFound from '../../pages/not-found-page';
import PrivacyAndCookiesPolicy from '../../pages/privacy-and-cookies-policy';
import { SearchResults } from '../../pages/search-results';
import { ServiceDetail } from '../../pages/service-detail';
import Services from '../../pages/services';
import Testimonials from '../../pages/testimonials';
import { RouteItem } from './types';

export const routes: RouteItem[] = [
  { path: '/', element: <Home /> },
  { path: 'services', element: <Services /> },
  { path: 'services/:id', element: <ServiceDetail /> },
  { path: 'testimonials', element: <Testimonials /> },
  { path: 'contact', element: <Contact /> },
  { path: 'about-us', element: <AboutUs /> },
  { path: 'search', element: <SearchResults /> },
  { path: 'privacy-and-cookies-policy', element: <PrivacyAndCookiesPolicy /> },
  { path: 'login', isPublicOnly: true, element: <Login /> },
  { path: 'logout', isPrivate: true, element: <div>Logout</div> },
  { path: 'admin', isPrivate: true, element: <h1>Adming page</h1> },

  { path: '*', element: <NotFound /> },
];
