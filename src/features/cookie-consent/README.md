# Cookie Consent Feature

A comprehensive cookie consent solution for the Orthopedic Spine Web React application, implementing GDPR-compliant cookie management with a user-friendly interface.

## 📋 Overview

This feature provides:

- **Cookie Consent Banner**: Fixed-position banner displayed on first visit
- **Cookie Preferences Modal**: Detailed preferences management interface
- **LocalStorage Persistence**: User preferences are stored and synchronized across tabs
- **TypeScript Support**: Full type safety with comprehensive interfaces
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation and ARIA labels
- **Responsive Design**: Mobile-friendly layouts

## 🏗️ Architecture

Following Clean Architecture principles with clear layer separation:

```
cookie-consent/
├── components/           # Presentation Layer
│   ├── CookieConsentBanner/
│   └── CookiePreferencesModal/
├── hooks/               # Application Layer
│   └── useCookieConsent.ts
├── services/            # Infrastructure Layer
│   └── cookieConsentService.ts
└── types/               # Domain Layer
    └── index.ts
```

## 🎨 Components

### CookieConsentBanner

The main banner component that appears at the bottom of the page for first-time visitors.

**Features:**

- Cookie icon (🍪) with title "Cookie Consent"
- Descriptive text with link to Cookie Policy
- Three action buttons:
  - "Manage Preferences" - Opens detailed preferences modal
  - "Reject Non-Essential" - Only enables strictly necessary cookies
  - "Accept All" - Enables all cookie categories

**Usage:**

```tsx
import { CookieConsentBanner } from '@/features/cookie-consent';

function App() {
  return (
    <>
      <YourAppContent />
      <CookieConsentBanner />
    </>
  );
}
```

### CookiePreferencesModal

A modal dialog for managing cookie preferences in detail.

**Features:**

- Three cookie categories with toggle switches
- "Strictly Necessary" is always enabled (disabled toggle with "ALWAYS ACTIVE" badge)
- "Functional Cookies" can be toggled on/off
- "Performance & Analytics" can be toggled on/off
- Two action buttons: "Save Settings" and "Accept All"

**Props:**

```tsx
interface CookiePreferencesModalProps {
  visible: boolean;
  onClose: () => void;
  initialFunctional: boolean;
  initialPerformance: boolean;
  onSavePreferences: (functional: boolean, performance: boolean) => void;
  onAcceptAll: () => void;
}
```

## 🔧 Hook API

### useCookieConsent

Custom hook for managing cookie consent state.

**Returns:**

```tsx
{
  consent: CookieConsentState;         // Current consent state
  hasConsented: boolean;               // Has user made a decision?
  acceptAll: () => void;               // Accept all cookies
  rejectNonEssential: () => void;      // Reject non-essential cookies
  savePreferences: (functional, performance) => void; // Save custom preferences
  clearConsent: () => void;            // Clear consent (testing/debugging)
}
```

**Usage:**

```tsx
import { useCookieConsent } from '@/features/cookie-consent';

function MyComponent() {
  const { consent, hasConsented, acceptAll } = useCookieConsent();

  // Conditionally load analytics
  useEffect(() => {
    if (consent.performance) {
      loadGoogleAnalytics();
    }
  }, [consent.performance]);

  return (
    <div>
      {hasConsented ? (
        <p>Thank you for your cookie preferences!</p>
      ) : (
        <button onClick={acceptAll}>Accept Cookies</button>
      )}
    </div>
  );
}
```

## 💾 Service API

### CookieConsentService

Static service class for managing cookie consent in localStorage.

**Methods:**

```tsx
// Get current consent state
CookieConsentService.getConsent(): CookieConsentState

// Save consent state
CookieConsentService.setConsent(consent: CookieConsentState): void

// Clear consent
CookieConsentService.clearConsent(): void

// Accept all cookies
CookieConsentService.acceptAll(): CookieConsentState

// Reject non-essential cookies
CookieConsentService.rejectNonEssential(): CookieConsentState

// Save custom preferences
CookieConsentService.savePreferences(functional: boolean, performance: boolean): CookieConsentState

// Check if user has consented
CookieConsentService.hasConsented(): boolean

// Check if specific category is enabled
CookieConsentService.isCategoryEnabled(category: string): boolean
```

## 📦 Types

### CookieConsentState

```tsx
interface CookieConsentState {
  hasConsented: boolean; // Has user made a decision?
  strictlyNecessary: boolean; // Always true
  functional: boolean; // Functional cookies enabled?
  performance: boolean; // Analytics cookies enabled?
  timestamp: number; // When consent was given
}
```

### CookieCategory

```tsx
interface CookieCategory {
  key: CookieCategoryType;
  title: string;
  description: string;
  isRequired: boolean;
}
```

## 🎯 Cookie Categories

### 1. Strictly Necessary (Always Enabled)

Essential cookies required for the website to function. Cannot be disabled.

**Examples:**

- Session cookies
- Authentication tokens
- Security cookies

### 2. Functional Cookies (Optional)

Enhance user experience with personalization features.

**Examples:**

- Language preferences
- Theme preferences
- Remember user choices

### 3. Performance & Analytics (Optional)

Help improve the website through usage analytics.

**Examples:**

- Google Analytics
- Heatmap tracking
- Error logging

## 💡 Usage Examples

### Basic Integration

```tsx
// src/app/App.tsx
import { CookieConsentBanner } from '@/features/cookie-consent';

export const App: React.FC = () => {
  return (
    <>
      <YourRoutes />
      <CookieConsentBanner />
    </>
  );
};
```

### Conditional Feature Loading

```tsx
import { useCookieConsent } from '@/features/cookie-consent';

function AnalyticsProvider({ children }) {
  const { consent } = useCookieConsent();

  useEffect(() => {
    // Only load analytics if user consented
    if (consent.performance) {
      window.gtag('config', 'GA_TRACKING_ID');
    }
  }, [consent.performance]);

  return <>{children}</>;
}
```

### Manual Consent Management

```tsx
import { CookieConsentService } from '@/features/cookie-consent';

// Check if user has consented
if (!CookieConsentService.hasConsented()) {
  // Show banner or modal
}

// Check specific category
if (CookieConsentService.isCategoryEnabled('performance')) {
  // Load analytics scripts
}

// Programmatically accept all
CookieConsentService.acceptAll();
```

## 🎨 Styling

All components use SCSS modules with design tokens from the project's design system:

- **Colors**: Primary, gray scale, semantic colors
- **Spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography**: Font sizes and weights from design system
- **Shadows**: Standard shadow utilities
- **Border Radius**: Consistent border radius values
- **Transitions**: Smooth animations

Styles can be customized by modifying the SCSS module files:

- `CookieConsentBanner.module.scss`
- `CookiePreferencesModal.module.scss`

## 📱 Responsive Design

The feature is fully responsive with breakpoints:

- **Mobile** (< 576px): Stacked buttons, full-width actions
- **Tablet** (576px - 992px): Adjusted layout for medium screens
- **Desktop** (> 992px): Optimal horizontal layout

## ♿ Accessibility

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **ARIA Labels**: Proper ARIA labels for screen readers
- **Focus Management**: Clear focus indicators
- **Semantic HTML**: Proper use of semantic elements
- **Color Contrast**: WCAG AA compliant color contrast ratios

## 🧪 Testing

### Manual Testing Checklist

1. **First Visit**

   - [ ] Banner appears at bottom of page
   - [ ] All three buttons are visible
   - [ ] Cookie Policy link works

2. **Accept All**

   - [ ] Banner disappears
   - [ ] All preferences set to true in localStorage
   - [ ] Banner doesn't reappear on refresh

3. **Reject Non-Essential**

   - [ ] Banner disappears
   - [ ] Only strictly necessary set to true
   - [ ] Banner doesn't reappear on refresh

4. **Manage Preferences**

   - [ ] Modal opens
   - [ ] Strictly Necessary is disabled with "ALWAYS ACTIVE" badge
   - [ ] Other toggles work correctly
   - [ ] Save Settings saves preferences
   - [ ] Accept All in modal works

5. **Cross-Tab Sync**

   - [ ] Open app in two tabs
   - [ ] Accept in one tab
   - [ ] Banner disappears in both tabs

6. **Clear and Retest**
   ```js
   localStorage.removeItem('cookie-consent');
   ```

### Automated Testing (Future)

```tsx
// Example test structure
describe('CookieConsentBanner', () => {
  it('should render when user has not consented', () => {
    // Test implementation
  });

  it('should not render when user has consented', () => {
    // Test implementation
  });

  it('should call acceptAll when Accept All clicked', () => {
    // Test implementation
  });
});
```

## 🔄 State Flow

```
User First Visit
    ↓
Banner Appears (hasConsented = false)
    ↓
User Action (Accept All / Reject / Manage Preferences)
    ↓
State Saved to localStorage
    ↓
Banner Disappears (hasConsented = true)
    ↓
State Persists Across Sessions
```

## 🗂️ LocalStorage Structure

```json
{
  "cookie-consent": {
    "hasConsented": true,
    "strictlyNecessary": true,
    "functional": true,
    "performance": false,
    "timestamp": 1706875234567
  }
}
```

## 🔒 Privacy Compliance

This implementation provides the foundation for GDPR compliance:

✅ **Consent Before Processing**: Banner shown before any non-essential cookies are set
✅ **Granular Control**: Users can choose specific cookie categories
✅ **Easy to Withdraw**: Users can change preferences at any time
✅ **Clear Information**: Detailed descriptions of each cookie category
✅ **Persistence**: Consent choices are remembered

**Note**: Full GDPR compliance requires:

- Proper Cookie Policy page
- Cookie audit and categorization
- Technical implementation of cookie blocking based on consent
- Privacy Policy updates

## 🚀 Future Enhancements

Potential improvements:

- [ ] Add consent expiration (e.g., re-prompt after 12 months)
- [ ] Add cookie audit trail
- [ ] Integrate with analytics platforms (Google Analytics, etc.)
- [ ] Add cookie scanning/detection
- [ ] Multi-language support
- [ ] Export consent data (GDPR right to data portability)
- [ ] Admin dashboard for consent analytics

## 📚 References

- [GDPR Article 7](https://gdpr-info.eu/art-7-gdpr/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Ant Design Components](https://ant.design/components/overview/)

## 👥 Maintainers

This feature follows the project's Clean Architecture principles and coding standards.

For questions or contributions, please refer to the main project README.

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**License**: MIT
