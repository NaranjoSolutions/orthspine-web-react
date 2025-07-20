import { Routes, Route } from 'react-router-dom';
import { Home } from '../features/home/Home';
import { Testimonials } from '../features/testimonials/Testimonials';
import { Login } from '../features/login';
import { ProtectedRoute } from './ProtectedRoute';
import { TestimonialsAdmin } from '../features/testimonials-admin/TestimonialsAdmin';
import { Contact } from '../features/contact/Contact';
import { AboutUs } from '../features/about-us/AboutUs';
import { NotFound } from '../shared/components/not-found/NotFound';
import { Services } from '../features/services/Services';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/services" element={<Services />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />

      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <TestimonialsAdmin />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
