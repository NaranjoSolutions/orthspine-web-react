# Scroll Behavior Fix - Implementation Documentation

## Overview
This document describes the implementation of the fix for incorrect anchor offsets and scroll behavior on the Home Page.

## Problem Statement
The Home Page exhibited inconsistent scroll behavior:
- Service Carousel clicks navigated to service detail pages but didn't scroll to top properly
- Testimonials Carousel navigation had similar issues
- 'Learn More' button navigated away from the page instead of scrolling to sections
- Fixed navbar (64px) obscured content when scrolling to sections

## Solution

### 1. Custom Hook: `useScrollToSection`
**Location:** `src/shared/hooks/useScrollToSection.ts`

**Features:**
- Handles smooth scrolling with proper offset for fixed navbar (64px + 20px padding = 84px total)
- Automatically processes URL hash fragments (e.g., `/#services-section`)
- Scrolls to top when navigating to pages without hash
- Provides utility functions for programmatic scrolling

**Usage:**
```tsx
import { useScrollToSection } from '@/shared/hooks';

const MyComponent = () => {
  const { scrollToSection, scrollToTop } = useScrollToSection();
  
  // Scroll to a specific section
  const handleClick = () => {
    scrollToSection('services-section');
  };
  
  // Or scroll to top
  const handleReset = () => {
    scrollToTop();
  };
};
```

### 2. Section IDs Added
To enable anchor navigation, the following section IDs were added:

| Section | ID | Location |
|---------|----|----|
| Services Carousel | `services-section` | `ServicesCarousel.tsx` line 82 |
| Testimonials Carousel | `testimonials-section` | `TestimonialsCarousel.tsx` line 83 |
| Visit Our Clinic | `contact-section` | Already existed |

### 3. Behavior Changes

#### RecoveryJourney Component
**Before:**
- "Conocer Más" button navigated to `/services` page

**After:**
- "Conocer Más" button scrolls to `services-section` within the Home Page
- Provides better user experience by keeping users on the same page

#### All Pages
**Before:**
- No automatic scroll handling on page navigation
- Browser might maintain scroll position from previous page

**After:**
- Pages using `useScrollToSection` automatically scroll to top on navigation
- Hash-based URLs (e.g., `/#services-section`) automatically scroll to target with proper offset

### 4. Pages Updated

The following pages now use `useScrollToSection`:
- `HomePage` - Handles hash-based navigation
- `ServicesPage` - Scrolls to top on navigation
- `ServiceDetailPage` - Scrolls to top on navigation
- `TestimonialsPage` - Scrolls to top on navigation

## Technical Details

### Scroll Offset Calculation
```typescript
const NAVBAR_HEIGHT = 64;           // From Navbar.module.scss
const SCROLL_OFFSET_PADDING = 20;   // Visual breathing room
const TOTAL_SCROLL_OFFSET = 84;     // Total offset
```

### Scroll Implementation
```typescript
const elementPosition = element.getBoundingClientRect().top;
const offsetPosition = elementPosition + window.pageYOffset - offset;

window.scrollTo({
  top: offsetPosition,
  behavior: 'smooth',
});
```

### Timing
- 100ms delay before scrolling to ensure DOM is ready
- Necessary for React's rendering and layout calculations

## Testing Scenarios

### Manual Testing Required
1. **Home Page Hash Navigation:**
   - Navigate to `/#services-section` → Should scroll to Services section with navbar visible
   - Navigate to `/#testimonials-section` → Should scroll to Testimonials section
   - Navigate to `/#contact-section` → Should scroll to Visit Our Clinic section

2. **RecoveryJourney "Learn More":**
   - Click "Conocer Más" button → Should smoothly scroll up to Services section
   - Navbar should not obscure the section title

3. **Service Card Navigation:**
   - Click "Saber Más" on any service card → Should navigate to detail page and scroll to top
   - Page should load with content visible below navbar

4. **Testimonials Navigation:**
   - Click "Ver más" on testimonials carousel → Should navigate to testimonials page and scroll to top

5. **Cross-Page Navigation:**
   - Navigate from Services page to Home page → Should scroll to top
   - Navigate with hash from any page (e.g., `/services` to `/#testimonials-section`) → Should scroll to section

## Browser Compatibility
- Uses `window.scrollTo` with `behavior: 'smooth'` (supported in all modern browsers)
- Uses `getBoundingClientRect` for position calculation (universal support)
- Fallback: If smooth scroll not supported, will still scroll (just not smoothly)

## Performance Considerations
- Hook uses `useCallback` for memoized functions
- Minimal re-renders (only when location changes)
- 100ms delay is negligible for user experience
- No performance impact on pages not using the hook

## Future Enhancements
Potential improvements for future iterations:
1. Add `prefers-reduced-motion` media query support for accessibility
2. Add configurable offset per section
3. Add scroll completion callbacks
4. Add scroll-spy functionality to highlight active section in navigation
5. Add unit tests when testing infrastructure is added

## Files Changed
- ✅ `src/shared/hooks/useScrollToSection.ts` (new)
- ✅ `src/shared/hooks/index.ts` (new)
- ✅ `src/pages/home/HomePage.tsx`
- ✅ `src/features/home/components/ServicesCarousel/ServicesCarousel.tsx`
- ✅ `src/features/home/components/TestimonialsCarousel/TestimonialsCarousel.tsx`
- ✅ `src/features/home/components/RecoveryJourney/RecoveryJourney.tsx`
- ✅ `src/pages/services/ServicesPage.tsx`
- ✅ `src/pages/service-detail/ServiceDetailPage.tsx`
- ✅ `src/pages/testimonials/TestimonialsPage.tsx`

## Compliance
- ✅ TypeScript compilation passes
- ✅ ESLint checks pass (for changed files)
- ✅ Build succeeds
- ✅ No breaking changes to existing functionality
- ✅ Follows existing code patterns and conventions
- ✅ Maintains accessibility standards
- ✅ Minimal, surgical changes as required
