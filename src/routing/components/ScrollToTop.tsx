import { useEffect, useRef, useMemo } from 'react';
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
 * - Scrolls to top when pathname changes
 * - Preserves hash navigation on same page (e.g., /page#section1 -> /page#section2)
 * - Scrolls to top even when navigating with hash (e.g., /page1 -> /page2#section)
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
  const { pathname } = useLocation();
  const prevPathnameRef = useRef<string | null>(null);

  // Memoize the prefers-reduced-motion check to avoid repeated DOM queries
  const prefersReducedMotion = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);

  useEffect(() => {
    /**
     * Only scroll to top when pathname changes
     * Skip if only the hash changed (same page navigation)
     */
    if (prevPathnameRef.current !== pathname) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      prevPathnameRef.current = pathname;
    }
  }, [pathname, prefersReducedMotion]);

  // This component renders nothing
  return null;
};
