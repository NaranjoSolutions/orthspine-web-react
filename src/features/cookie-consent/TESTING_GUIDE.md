# Cookie Consent Feature - Testing Guide

## 🧪 Quick Testing Guide

This guide helps you test the cookie consent feature manually in the browser.

---

## Prerequisites

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open browser: `http://localhost:5173`

3. Open Browser DevTools (F12):
   - Console tab for test utilities
   - Application/Storage tab to view localStorage
   - Network tab to verify no tracking before consent

---

## Test Scenarios

### ✅ Test 1: First Visit (Banner Appears)

**Steps:**

1. Clear localStorage:
   - Open Console
   - Run: `localStorage.removeItem('cookie-consent')`
   - Or use: `CookieConsentTestUtils.reset()`
2. Refresh the page (F5)

**Expected Result:**

- ✅ Cookie consent banner appears at bottom of page
- ✅ Banner shows cookie icon (🍪)
- ✅ Title reads "Cookie Consent"
- ✅ Description text is visible with "Cookie Policy" link
- ✅ Three buttons visible:
  - "Manage Preferences"
  - "Reject Non-Essential"
  - "Accept All"
- ✅ Banner has smooth slide-up animation

**Screenshot Checklist:**

- [ ] Banner positioned at bottom
- [ ] Cookie icon displayed
- [ ] All text readable
- [ ] Buttons properly styled
- [ ] No console errors

---

### ✅ Test 2: Accept All Cookies

**Steps:**

1. Ensure banner is visible (Test 1)
2. Click "Accept All" button

**Expected Result:**

- ✅ Banner disappears immediately
- ✅ Check localStorage:
  - Open Application > Local Storage
  - Find key: `cookie-consent`
  - Value should be:
    ```json
    {
      "hasConsented": true,
      "strictlyNecessary": true,
      "functional": true,
      "performance": true,
      "timestamp": [number]
    }
    ```
- ✅ Refresh page - banner should NOT reappear

**Console Check:**

```javascript
CookieConsentTestUtils.logState();
// Should show all categories as true
```

---

### ✅ Test 3: Reject Non-Essential Cookies

**Steps:**

1. Clear localStorage and refresh (Test 1)
2. Click "Reject Non-Essential" button

**Expected Result:**

- ✅ Banner disappears
- ✅ Check localStorage value:
  ```json
  {
    "hasConsented": true,
    "strictlyNecessary": true,
    "functional": false,
    "performance": false,
    "timestamp": [number]
  }
  ```
- ✅ Only strictlyNecessary is true
- ✅ Refresh - banner should NOT reappear

---

### ✅ Test 4: Manage Preferences (Open Modal)

**Steps:**

1. Clear localStorage and refresh
2. Click "Manage Preferences" button

**Expected Result:**

- ✅ Modal opens centered on screen
- ✅ Modal title: "Cookie Preferences"
- ✅ Close button (X) visible in top right
- ✅ Description text visible
- ✅ Three cookie categories displayed:
  1. **Strictly Necessary**
     - Toggle switch visible but DISABLED
     - "ALWAYS ACTIVE" badge shown
     - Description visible
  2. **Functional Cookies**
     - Toggle switch ENABLED and working
     - Description visible
  3. **Performance & Analytics**
     - Toggle switch ENABLED and working
     - Description visible
- ✅ Two buttons at bottom:
  - "Save Settings" (primary/blue)
  - "Accept All" (default/white)

**Interactive Checks:**

- [ ] Click outside modal - should NOT close
- [ ] Click X button - modal closes, no changes saved
- [ ] Try to toggle "Strictly Necessary" - should not work
- [ ] Toggle "Functional Cookies" - should work
- [ ] Toggle "Performance & Analytics" - should work

---

### ✅ Test 5: Save Custom Preferences

**Steps:**

1. Open Manage Preferences modal
2. Enable ONLY "Functional Cookies"
3. Keep "Performance & Analytics" disabled
4. Click "Save Settings"

**Expected Result:**

- ✅ Modal closes
- ✅ Banner disappears
- ✅ localStorage value:
  ```json
  {
    "hasConsented": true,
    "strictlyNecessary": true,
    "functional": true,
    "performance": false,
    "timestamp": [number]
  }
  ```
- ✅ Refresh page - banner doesn't reappear
- ✅ Settings are persisted

**Console Verification:**

```javascript
CookieConsentTestUtils.logState();
// functional: true
// performance: false
```

---

### ✅ Test 6: Accept All from Modal

**Steps:**

1. Clear localStorage and refresh
2. Click "Manage Preferences"
3. Toggle some switches OFF
4. Click "Accept All" button in modal

**Expected Result:**

- ✅ Modal closes
- ✅ Banner disappears
- ✅ All categories set to true (even ones you toggled off)
- ✅ localStorage shows all true

---

### ✅ Test 7: Cross-Tab Synchronization

**Steps:**

1. Open app in TWO browser tabs
2. In Tab 1: Clear localStorage and refresh
3. Both tabs should show banner
4. In Tab 1: Click "Accept All"

**Expected Result:**

- ✅ Banner disappears in Tab 1
- ✅ Banner automatically disappears in Tab 2 (within 1-2 seconds)
- ✅ Both tabs have same localStorage value
- ✅ Refresh Tab 2 - no banner appears

**Note:** This tests the storage event listener implementation.

---

### ✅ Test 8: Responsive Design

#### Desktop (> 992px)

**Steps:**

1. Resize browser window to > 992px width
2. Clear localStorage and refresh

**Expected Result:**

- ✅ Banner content displayed horizontally
- ✅ Cookie icon on left
- ✅ Text in center
- ✅ Buttons on right
- ✅ All content fits without wrapping

#### Tablet (576px - 992px)

**Steps:**

1. Resize to ~768px width
2. Clear localStorage and refresh

**Expected Result:**

- ✅ Banner adjusts layout
- ✅ Buttons may wrap to next line
- ✅ Content remains readable
- ✅ No horizontal scroll

#### Mobile (< 576px)

**Steps:**

1. Resize to ~375px width (iPhone size)
2. Clear localStorage and refresh

**Expected Result:**

- ✅ Stacked vertical layout
- ✅ Icon and text stacked
- ✅ Buttons full-width and stacked
- ✅ All text readable
- ✅ Easy to tap buttons

**Modal Responsive:**

- ✅ Modal scales to fit screen
- ✅ Buttons stack on mobile
- ✅ Content scrollable if needed

---

### ✅ Test 9: Accessibility

#### Keyboard Navigation

**Steps:**

1. Clear localStorage and refresh
2. Press TAB key repeatedly

**Expected Result:**

- ✅ Focus moves to banner buttons
- ✅ Clear focus indicator visible
- ✅ Can press ENTER to activate button
- ✅ Can TAB through all interactive elements

**Modal Keyboard:**

1. Open modal with keyboard
2. Tab through elements

**Expected Result:**

- ✅ Tab cycles through toggles and buttons
- ✅ ESC key closes modal
- ✅ SPACE toggles switches
- ✅ ENTER activates buttons

#### Screen Reader

**Steps:**

1. Enable screen reader (NVDA, JAWS, VoiceOver)
2. Navigate to banner

**Expected Result:**

- ✅ Banner announced as dialog
- ✅ Title read correctly
- ✅ Description read
- ✅ Button labels clear
- ✅ Toggle states announced

---

### ✅ Test 10: Cookie Policy Link

**Steps:**

1. Banner visible
2. Click "Cookie Policy" link in description

**Expected Result:**

- ✅ Navigates to /cookie-policy
- ✅ Link styled with primary color
- ✅ Link has underline
- ✅ Link has hover state

**Note:** The /cookie-policy page may not exist yet - this is expected.

---

## Browser Console Test Utilities

### Available Commands

Open browser console and use these commands:

```javascript
// View current consent state
CookieConsentTestUtils.logState();

// Clear all consent (reset to first visit)
CookieConsentTestUtils.reset();

// Simulate first visit
CookieConsentTestUtils.simulateFirstVisit();

// Simulate user who accepted all
CookieConsentTestUtils.simulateAcceptedAll();

// Simulate user who rejected non-essential
CookieConsentTestUtils.simulateRejectedNonEssential();

// Check if localStorage works
CookieConsentTestUtils.checkLocalStorage();

// Get raw localStorage value
CookieConsentTestUtils.getRawValue();

// Validate state structure
CookieConsentTestUtils.validateState();

// Set custom state
CookieConsentTestUtils.setCustomState({
  functional: true,
  performance: false,
});
```

---

## Visual Regression Checklist

Use this checklist to verify visual appearance:

### Banner

- [ ] Background: Clean white
- [ ] Shadow: Subtle shadow visible
- [ ] Border: Top border visible
- [ ] Border radius: Slight rounding on corners
- [ ] Cookie icon: Large, centered in circle background
- [ ] Title: Bold, large font
- [ ] Description: Readable, gray text
- [ ] Link: Blue, underlined
- [ ] Buttons: Proper spacing between them
- [ ] Primary button: Blue background
- [ ] Animation: Smooth slide-up on appear

### Modal

- [ ] Overlay: Semi-transparent dark background
- [ ] Modal: Centered, white background
- [ ] Title: Bold at top
- [ ] Close button: X in top right
- [ ] Category cards: Light gray background
- [ ] Hover effect: Slightly darker on hover
- [ ] "ALWAYS ACTIVE" badge: Small, gray
- [ ] Toggle switches: Ant Design style
- [ ] Disabled toggle: Grayed out
- [ ] Enabled toggle: Interactive
- [ ] Buttons: Properly aligned at bottom
- [ ] Border: Separator line above buttons

---

## Performance Checks

### Bundle Size

```bash
npm run build
# Check output for cookie consent chunks
# Should be minimal size increase
```

**Expected:**

- ✅ No significant bundle size increase
- ✅ No console warnings about chunk size from our code

### Lighthouse Audit

1. Build production version
2. Run Lighthouse audit
3. Check scores

**Expected:**

- ✅ Performance: No degradation
- ✅ Accessibility: 95+
- ✅ Best Practices: No issues from consent feature
- ✅ SEO: No impact

---

## Edge Cases to Test

### ✅ LocalStorage Disabled

**Steps:**

1. Disable localStorage in browser settings
2. Refresh page

**Expected:**

- ✅ App doesn't crash
- ✅ Banner may show repeatedly (acceptable fallback)
- ✅ Console shows error message but app continues

### ✅ Corrupted localStorage Data

**Steps:**

```javascript
localStorage.setItem('cookie-consent', 'invalid json{]');
```

**Expected:**

- ✅ App doesn't crash
- ✅ Falls back to default state
- ✅ Console warning about invalid data
- ✅ Banner appears as if first visit

### ✅ Very Long Text

Test with extreme zoom levels (200%+)

**Expected:**

- ✅ Text remains readable
- ✅ No overflow issues
- ✅ Layout adapts appropriately

---

## Automated Testing (Future)

### Unit Tests Structure

```typescript
describe('CookieConsentBanner', () => {
  test('renders when user has not consented');
  test('does not render when user has consented');
  test('calls acceptAll when Accept All clicked');
  test('calls rejectNonEssential when Reject clicked');
  test('opens modal when Manage Preferences clicked');
});

describe('CookiePreferencesModal', () => {
  test('displays all three categories');
  test('disables Strictly Necessary toggle');
  test('enables other toggles');
  test('saves preferences correctly');
  test('accepts all from modal');
});

describe('useCookieConsent', () => {
  test('reads from localStorage on mount');
  test('updates state on consent change');
  test('syncs across tabs');
});

describe('CookieConsentService', () => {
  test('saves to localStorage');
  test('reads from localStorage');
  test('handles errors gracefully');
  test('validates data structure');
});
```

---

## Success Criteria

Before marking as complete, verify:

- [ ] All 10 test scenarios pass
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build successful
- [ ] Responsive on all breakpoints
- [ ] Accessible with keyboard
- [ ] Works with screen reader
- [ ] localStorage persistence works
- [ ] Cross-tab sync works
- [ ] All test utilities work
- [ ] Visual appearance matches design
- [ ] Performance is acceptable

---

## Troubleshooting

### Banner doesn't appear

- Check localStorage is cleared
- Check browser console for errors
- Verify App.tsx imports CookieConsentBanner
- Check z-index isn't being overridden

### Modal doesn't open

- Check console for errors
- Verify button click handler
- Check Ant Design Modal is imported
- Verify modal state management

### LocalStorage not persisting

- Check browser storage settings
- Verify storage isn't full
- Check incognito/private mode limitations
- Test in regular browser window

### Styles not applied

- Verify SCSS modules compiled
- Check import paths
- Verify Vite config for SCSS
- Clear build cache and rebuild

### Test utilities not available

- Ensure in development mode
- Check console for import errors
- Verify main.tsx imports utils
- Check Window interface declaration

---

## Reporting Issues

If you find bugs, please report:

1. Browser and version
2. Steps to reproduce
3. Expected vs actual behavior
4. Console errors
5. Screenshots if visual issue

---

**Happy Testing! 🍪**
