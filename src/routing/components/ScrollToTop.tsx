import { useEffect, useRef } from 'react';
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
 * - Does not scroll on initial page load/mount
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
  // Initialize with current pathname to avoid scrolling on mount
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    /**
     * Only scroll to top when pathname changes
     * Skip if only the hash changed (same page navigation)
     * Skip if this is the first render (prevPathnameRef === pathname)
     */
    if (prevPathnameRef.current !== pathname) {
      // Check for reduced motion preference for accessibility
      // Checked on each navigation to respect runtime preference changes
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      prevPathnameRef.current = pathname;
    }
  }, [pathname]);

  // This component renders nothing
  return null;
};
