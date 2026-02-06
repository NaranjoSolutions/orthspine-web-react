import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 *
 * Automatically scrolls to the top of the page on route changes.
 * This component ensures a consistent user experience by resetting
 * the scroll position when navigating between different routes.
 *
 * Design Principles:
 * - Single Responsibility: Only handles scroll restoration on navigation
 * - Zero UI: Renders nothing, purely behavioral
 * - Accessibility: Respects user's reduced motion preferences
 *
 * Architecture:
 * - Uses React Router's useLocation to detect route changes
 * - Runs on every route change (location.pathname change)
 * - Skips scroll reset when only hash changes (for anchor links)
 *
 * @example
 * ```tsx
 * // In AppProviders or App component
 * <BrowserRouter>
 *   <ScrollToTop />
 *   <App />
 * </BrowserRouter>
 * ```
 */
export const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    /**
     * Only scroll to top when pathname changes
     * Skip if navigation is to a hash anchor (same page section)
     */
    if (!hash) {
      // Check for reduced motion preference for accessibility
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [pathname, hash]);

  // This component renders nothing
  return null;
};
