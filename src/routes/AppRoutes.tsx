import { Routes, Route } from 'react-router-dom';
import { Home } from '../features/home/Home';
import { Testimonials } from '../features/testimonials';
import { Login } from '../features/login';
import { ProtectedRoute } from './ProtectedRoute';
import { TestimonialsAdmin } from '../features/testimonials-admin';
import { Contact } from '../features/contact/Contact';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/contact" element={<Contact />} />

      <Route
        path="/admin/testimonials"
        element={
          <ProtectedRoute>
            <TestimonialsAdmin />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
