import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Navbar height constant
 * Must match the height in Navbar.module.scss
 */
const NAVBAR_HEIGHT = 64;

/**
 * Additional padding to add below the navbar
 * Provides visual breathing room
 */
const SCROLL_OFFSET_PADDING = 20;

/**
 * Total scroll offset = navbar height + padding
 */
const TOTAL_SCROLL_OFFSET = NAVBAR_HEIGHT + SCROLL_OFFSET_PADDING;

/**
 * useScrollToSection Hook
 * Handles smooth scrolling to page sections with proper offset for fixed header
 *
 * Features:
 * - Automatically scrolls to hash targets on page load/navigation
 * - Accounts for fixed navbar height (64px + 20px padding)
 * - Smooth scroll behavior
 * - Delays scroll to ensure DOM is ready
 *
 * @example
 * ```tsx
 * // In a component
 * const { scrollToSection } = useScrollToSection();
 *
 * // Scroll to a section by ID
 * <button onClick={() => scrollToSection('services-section')}>
 *   Go to Services
 * </button>
 * ```
 */
export const useScrollToSection = () => {
  const location = useLocation();

  /**
   * Scrolls to a section by ID with proper offset
   *
   * @param sectionId - The ID of the section to scroll to
   * @param offset - Optional custom offset (defaults to TOTAL_SCROLL_OFFSET)
   */
  const scrollToSection = useCallback((sectionId: string, offset: number = TOTAL_SCROLL_OFFSET) => {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    }, 100);
  }, []);

  /**
   * Scrolls to top of page smoothly
   */
  const scrollToTop = useCallback(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, []);

  /**
   * Effect: Handle hash-based navigation
   * Automatically scrolls to hash target when present in URL
   */
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the '#'
      scrollToSection(sectionId);
    } else {
      // No hash, scroll to top
      scrollToTop();
    }
  }, [location, scrollToSection, scrollToTop]);

  return {
    scrollToSection,
    scrollToTop,
    NAVBAR_HEIGHT,
    SCROLL_OFFSET_PADDING,
    TOTAL_SCROLL_OFFSET,
  };
};
