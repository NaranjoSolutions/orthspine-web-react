# GitHub Copilot Instructions for Orthopedic Spine Web React

This document provides guidance to GitHub Copilot for generating code that aligns with our project's standards, architecture, and best practices.

## How to Use These Instructions

**For GitHub Copilot Coding Agent:**

- Read this entire document before generating code
- Prioritize accessibility (WCAG 2.1 AA) in all UI code
- Follow existing patterns over introducing new ones
- Make minimal, surgical changes unless explicitly asked for refactoring
- Reference `/docs/standards.md` and `/docs/ui-guidelines.md` for additional context
- When in doubt, ask for clarification rather than making assumptions

**Key Principles:**

1. **Consistency**: Match existing code style and patterns
2. **Accessibility**: Never compromise WCAG 2.1 compliance
3. **Safety**: Preserve working functionality, make incremental changes
4. **Clarity**: Write readable, maintainable code over clever solutions
5. **Documentation**: Comment when logic is non-obvious, not when it's clear

## Project Overview

**Orthopedic Spine Web React** is a modern React web application for a physiotherapy clinic built with:

- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Router** for routing
- **Ant Design** for UI components
- **SCSS Modules** for styling
- **Framer Motion** for animations

## Architecture Principles

### Design Patterns

- **Feature-Based Architecture**: Domain-driven design with feature modules
- **Repository Pattern**: Business logic separation in services
- **Facade Pattern**: Simplified interfaces for complex operations
- **Strategy Pattern**: Pluggable implementations (cache, logging)
- **Singleton Pattern**: Shared instances (HttpClient, Logger)
- **Chain of Responsibility**: HTTP interceptors

### Code Organization

- **Separation of Concerns**: Clear boundaries between UI, business logic, and infrastructure
- **DRY (Don't Repeat Yourself)**: Centralized configurations and constants
- **SOLID Principles**: Single responsibility, dependency inversion
- **Colocation**: Keep related files together (components, styles, tests)
- **Feature-Based Architecture**: Each feature is self-contained
  - Feature components stay in `features/[feature]/components/`
  - Shared components go in `shared/components/` only if used by 2+ features
  - Don't create shared components prematurely

### Modular Architecture Principles

- **Prefer modular, feature-based organization** over monolithic files
- **Follow existing patterns** rather than introducing new architectural styles
- **Scale features independently** rather than creating cross-cutting changes
- **Isolate concerns**: Admin features separate from public features
- **Avoid large files**: Split large modules into focused, single-purpose files

## Project Structure

```
src/
├── app/                    # Application bootstrap and providers
├── config/                 # Configuration layer (environment, API, theme)
├── infrastructure/         # Cross-cutting concerns (API client, cache, logger, monitoring)
├── features/               # Feature modules (auth, home, services, contact, testimonials, admin)
│   ├── [feature]/
│   │   ├── components/     # Feature-specific components
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Business logic
│   │   ├── api/            # RTK Query endpoints
│   │   ├── store/          # Redux slices
│   │   ├── types/          # TypeScript types
│   │   └── utils/          # Feature utilities
│   └── admin/              # Admin-specific features (separate from public)
├── pages/                  # Route-level page components
│   ├── [public-pages]/     # Public-facing pages (home, about, services, etc.)
│   └── admin/              # Admin pages (separate from public pages)
├── routing/                # Route configuration
│   ├── config/             # Route paths and constants
│   ├── guards/             # Route protection (auth, roles)
│   └── hooks/              # Routing hooks
├── shared/                 # Shared components, layouts, hooks, utilities
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components (buttons, inputs, wrappers)
│   │   ├── layout/        # Layout components (header, footer, navigation)
│   │   └── widgets/       # Special widgets (forms, cards)
│   ├── layouts/           # Page layouts (public, admin, auth)
│   ├── hooks/             # Global custom hooks
│   ├── utils/             # Global utilities
│   └── resources/         # Static data and configuration
├── store/                  # Redux store configuration
└── styles/                 # Global styles and theme variables
```

### Key Structure Principles

- **Features are domain-driven**: Each feature is self-contained with its own components, logic, and state
- **Pages are thin wrappers**: Pages compose feature components and handle routing
- **Shared is truly shared**: Only put components in `shared/` if used by 2+ features
- **Admin is separated**: Admin features and pages are isolated from public-facing code
- **Colocation**: Keep related files together (component + style + test)

## Naming Conventions

### File Naming

| Type       | Convention | Example                 |
| ---------- | ---------- | ----------------------- |
| Components | PascalCase | `LoginForm.tsx`         |
| Pages      | index.tsx  | `pages/home/index.tsx`  |
| Utilities  | kebab-case | `format-date.ts`        |
| Config     | kebab-case | `clinic-information.ts` |
| Styles     | kebab-case | `LoginForm.module.scss` |
| Tests      | match file | `LoginForm.test.tsx`    |
| Types      | kebab-case | `auth.types.ts`         |

### Code Naming

- **Components**: PascalCase (`LoginForm`, `HeroSection`)
- **Functions/Variables**: camelCase (`handleSubmit`, `userData`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `ROUTE_PATHS`)
- **Interfaces/Types**: PascalCase with descriptive names (`User`, `AuthState`, `ServiceCardProps`)
- **Enums**: PascalCase (`LogLevel`, `UserRole`)
- **CSS Classes**: kebab-case (`.hero-section`, `.login-form`)

## TypeScript Guidelines

### Type Safety

- Always use explicit types for function parameters and return values
- Prefer `interface` for object shapes, `type` for unions/intersections
- Use `as const` for literal types and readonly arrays
- Avoid `any`; use `unknown` if type is truly unknown
- Use generic types for reusable components and functions

### Type Definitions

```typescript
// ✅ Good: Explicit types
interface UserData {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<UserData> {
  // implementation
}

// ✅ Good: Const assertion
export const ROUTE_PATHS = {
  HOME: '/',
  ABOUT: '/about',
} as const;

// ❌ Bad: Implicit any
function getData(id) {
  return fetch(`/api/users/${id}`);
}
```

## Component Patterns

### Component Structure

```tsx
import React from 'react';
import styles from './ComponentName.module.scss';

interface ComponentNameProps {
  title: string;
  onAction?: () => void;
}

/**
 * ComponentName - Brief description
 *
 * @param title - Description of title prop
 * @param onAction - Optional callback for action
 */
export const ComponentName: React.FC<ComponentNameProps> = ({ title, onAction }) => {
  // State
  const [state, setState] = useState<StateType>(initialValue);

  // Hooks
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectData);

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  // Handlers
  const handleClick = () => {
    // Handler logic
  };

  // Render
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
};
```

### Component Best Practices

- Use functional components with hooks
- **Keep components small and focused** (Single Responsibility)
  - Aim for < 200 lines per component
  - If a component exceeds this, consider splitting it
  - Extract repeated JSX patterns into sub-components
- Extract complex logic into custom hooks
- Use composition over props drilling
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when passed to child components
- Export named exports, not default exports
- **Prefer multiple small components over one large component**

### Component Size Guidelines

```tsx
// ❌ Bad: Large component doing too much (300+ lines)
export const UserDashboard: React.FC = () => {
  // Lots of state
  // Lots of effects
  // Lots of handlers
  // Complex rendering logic
  // Form handling
  // Data fetching
  // ...
};

// ✅ Good: Split into focused components
export const UserDashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <UserProfile />
      <ActivityFeed />
      <StatisticsPanel />
      <QuickActions />
    </DashboardLayout>
  );
};
```

## State Management

### Redux Toolkit

- Use Redux Toolkit for global state
- Create feature-based slices in `features/[feature]/store/`
- Use RTK Query for API calls
- Keep slices small and focused

```typescript
// ✅ Good: Feature-based slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
```

### Local State

- Use `useState` for simple component state
- Use `useReducer` for complex state logic
- Keep state as local as possible
- Lift state only when needed

## Styling Guidelines

### SCSS Modules

- Use SCSS modules for component-specific styles
- Follow BEM-like naming within modules: `.container`, `.container__element`, `.container--modifier`
- Import as `styles` object: `import styles from './Component.module.scss'`
- Use CSS variables for theming (defined in `src/styles/`)

```scss
// ✅ Good: SCSS Module
.loginForm {
  padding: var(--spacing-lg);
  background: var(--color-bg-primary);

  &__input {
    margin-bottom: var(--spacing-md);
    border-radius: var(--border-radius-sm);
  }

  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }
}
```

### Styling Best Practices

- Prefer CSS Modules over inline styles
- Use Ant Design components for UI consistency
- Customize Ant Design theme in `config/theme.config.ts`
- Use responsive design with mobile-first approach
- Follow accessibility guidelines (ARIA labels, semantic HTML)

## API and Data Fetching

### RTK Query

- Define API endpoints in `features/[feature]/api/`
- Use tags for cache invalidation
- Handle loading, error, and success states

```typescript
// ✅ Good: RTK Query API
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/infrastructure/api/client';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation } = authApi;
```

### HTTP Client

- Use the singleton HttpClient from `infrastructure/api/client/HttpClient.ts`
- Don't directly use axios; use the configured HttpClient
- Interceptors handle auth tokens, errors, and logging automatically

## Testing

### Testing Strategy

- Write unit tests for utilities and business logic
- Write integration tests for components
- Test file naming: `ComponentName.test.tsx`
- Use descriptive test names: `should render login form with email and password fields`

### Testing Best Practices

- Test user behavior, not implementation details
- Mock external dependencies (API calls, browser APIs)
- Keep tests focused and independent
- Aim for high coverage on critical paths

## Code Quality

### Linting and Formatting

- ESLint configuration: `eslint.config.js`
- Prettier configuration: `.prettierrc.json`
- Run `npm run lint` before committing
- Run `npm run format` to auto-format code

### Code Review Guidelines

- Keep PRs small and focused
- Write descriptive commit messages
- Add JSDoc comments for complex functions
- Update documentation when changing behavior

## Routing

### Route Configuration

- Define routes in `src/routing/config/routePaths.ts`
- Use centralized route constants: `ROUTE_PATHS.HOME`, `ROUTE_PATHS.AUTH.LOGIN`
- Never hardcode route strings in components
- Use `buildRoute()` helper for parameterized routes

```typescript
// ✅ Good: Using route constants
import { ROUTE_PATHS } from '@/routing/config/routePaths';

const navigate = useNavigate();
navigate(ROUTE_PATHS.AUTH.LOGIN);

// ❌ Bad: Hardcoded routes
navigate('/login');
```

## Environment Configuration

### Environment Variables

- Development: `.env.development`
- Local dev: `.env.localdev`
- Production: `.env.production`
- Access via `import.meta.env.VITE_*`
- Never commit sensitive credentials

### Build Commands

- Development: `npm run dev`
- Local dev: `npm run localdev`
- Build: `npm run build`
- Production build: `npm run build:production`

## Error Handling

### Best Practices

- Use try-catch for async operations
- Provide user-friendly error messages
- Log errors for debugging: `Logger.error('message', context)`
- Show error boundaries for component crashes
- Handle network errors gracefully

```typescript
// ✅ Good: Error handling
try {
  const response = await authService.login(credentials);
  dispatch(setAuth(response));
} catch (error) {
  Logger.error('Login failed', { error });
  notification.error({
    message: 'Login Failed',
    description: 'Invalid email or password. Please try again.',
  });
}
```

## Performance Optimization

### Best Practices

- Lazy load routes: `const Home = lazy(() => import('./pages/home'))`
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback`
- Use React.memo for pure components
- Optimize images (use WebP, lazy loading)
- Code split by route and feature
- Monitor bundle size: `npm run analyze-bundle` (if configured)

## Security

### Best Practices

- Sanitize user inputs
- Use HTTPS for all API calls
- Store tokens securely (httpOnly cookies preferred)
- Implement CSRF protection
- Validate data on both client and server
- Follow OWASP security guidelines
- Never expose sensitive data in client code

## Accessibility (WCAG 2.1 Compliance)

**Critical**: All generated UI code MUST comply with WCAG 2.1 Level AA standards unless explicitly instructed otherwise.

### Semantic HTML

- **Always** use appropriate semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`, `<aside>`
- Use heading hierarchy correctly (`<h1>` through `<h6>`) without skipping levels
- Use `<button>` for actions, `<a>` for navigation
- Use `<ul>`/`<ol>` for lists, not `<div>` wrappers

### Forms and Input Accessibility

- **Every form input MUST have an associated label**:

  ```tsx
  // ✅ Good: Associated label
  <Form.Item label="Email" name="email">
    <Input type="email" />
  </Form.Item>

  // ❌ Bad: Missing label
  <Input placeholder="Enter email" />
  ```

- Use Ant Design's `Form.Item` with `label` prop for automatic associations
- Include `htmlFor` attribute when using native `<label>` elements
- Provide helpful error messages that are programmatically associated with inputs
- Use `aria-describedby` for helper text and instructions
- Mark required fields clearly: use both visual indicators and `aria-required="true"`

### Keyboard Accessibility

- **All interactive elements MUST be keyboard accessible**
- Ensure logical tab order (use `tabIndex` sparingly, prefer natural DOM order)
- Provide visible focus indicators (never use `outline: none` without replacement)
- Support standard keyboard shortcuts:
  - `Enter`/`Space` for buttons
  - `Escape` to close modals/dropdowns
  - Arrow keys for navigation in menus/lists
- Implement keyboard traps for modals and dialogs (users can't tab outside)

### Focus Management

```tsx
// ✅ Good: Focus management in modal
const MyModal: React.FC = ({ isOpen, onClose }) => {
  const firstInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onCancel={onClose}>
      <Input ref={firstInputRef} />
    </Modal>
  );
};
```

- Return focus to trigger element when closing modals/drawers
- Set focus to first interactive element when opening overlays
- Provide skip links for repetitive navigation

### Color and Contrast

- **Minimum contrast ratio**: 4.5:1 for normal text, 3:1 for large text (18pt+)
- **Never rely solely on color** to convey information
- Use CSS variables from theme for consistent, accessible colors
- Test color combinations with contrast checkers

### ARIA Usage

- **Only use ARIA when semantic HTML is insufficient**
- Common valid uses:
  - `aria-label` for icon-only buttons
  - `aria-describedby` for additional context
  - `aria-live` for dynamic content updates
  - `role="alert"` for error messages
  - `aria-expanded` for collapsible sections
- **Never**:
  - Override semantic HTML roles unnecessarily
  - Use ARIA as a substitute for proper semantic markup
  - Apply incorrect ARIA attributes

### Images and Media

- Provide descriptive `alt` text for all meaningful images
- Use empty `alt=""` for decorative images
- Include captions or transcripts for video/audio content

### Accessible Messaging

```tsx
// ✅ Good: Accessible notifications
notification.error({
  message: 'Login Failed',
  description: 'Invalid email or password. Please try again.',
  role: 'alert',
});

// ✅ Good: Form error with association
<Form.Item name="email" label="Email" validateStatus="error" help="Please enter a valid email address">
  <Input type="email" />
</Form.Item>;
```

- Error messages must be clear, specific, and actionable
- Success messages should confirm what action was completed
- Use appropriate ARIA live regions for dynamic updates

### Responsive and Mobile Accessibility

- Touch targets must be at least 44×44 pixels
- Support pinch-to-zoom (never disable)
- Test with screen magnification
- Ensure content reflows properly at 200% zoom

### Testing Requirements

- Test keyboard navigation for all interactive features
- Verify screen reader compatibility (test with NVDA, JAWS, or VoiceOver)
- Check color contrast with browser DevTools
- Test with browser zoom at 200%

## UI & Design System

### Design System Adherence

- **Follow** `/docs/ui-guidelines.md` for component selection guidance
- **Prefer Ant Design components** for data-driven, interactive, and stateful UI
- **Prefer custom HTML/CSS** for marketing content and branding
- **Never recreate** existing Ant Design functionality manually

### When to Use Ant Design

Always use AntD for:

- Forms and validation (`Form`, `Input`, `Select`, `DatePicker`)
- Data display and CRUD (`Table`, `Pagination`, `Tag`)
- Overlays and modals (`Modal`, `Drawer`, `Popconfirm`)
- Admin layouts (`Layout`, `Menu`, `Breadcrumb`)
- Notifications (`notification`, `message`)

### When to Use Custom HTML/CSS

Prefer custom markup for:

- Marketing sections (hero, testimonials, features)
- Static informational pages (privacy, terms)
- Branded/unique visual elements
- Landing pages and content sections

### Mixed Approach

It's expected to mix AntD with custom styles:

```tsx
// ✅ Good: Mix AntD components with custom layout
<section className={styles.heroSection}>
  <Typography.Title level={1}>Welcome</Typography.Title>
  <Button type="primary" size="large">
    Get Started
  </Button>
</section>
```

### Anti-Patterns

- ❌ Using AntD `Card` for purely static content
- ❌ Recreating form validation when `Form` exists
- ❌ Deep overrides of AntD internal classes
- ❌ Using AntD for marketing pages that need unique branding

### Customization

- Theme customization goes in `config/theme.config.ts`
- Create wrapper components (`/shared/components/ui/`) for repeated customizations
- Keep overrides minimal and maintainable

## Documentation

### Code Documentation

- Add JSDoc comments **only** for public APIs and complex functions
- **Avoid redundant or obvious comments** (e.g., `// Set loading to true`)
- Keep documentation concise and relevant
- Update README.md for major feature changes
- Document breaking changes in commit messages
- Update docs/ folder for architectural decisions
- Reference docs/standards.md for detailed conventions
- Reference docs/ui-guidelines.md for UI component guidelines

### Comment Guidelines

```tsx
// ❌ Bad: Obvious comment
// Set the user state
setUser(userData);

// ❌ Bad: Implementation leak
// Using setTimeout because React's state is async
setTimeout(() => setLoading(false), 0);

// ✅ Good: Non-obvious business logic
// Apply discount only for orders over $100 placed before 2PM
if (orderTotal > 100 && currentHour < 14) {
  applyDiscount(orderTotal * 0.1);
}
```

## Common Patterns and Examples

### Custom Hooks

```typescript
// ✅ Good: Custom hook
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(selectAuth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await authService.login(credentials);
        dispatch(setAuth(response));
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    [dispatch],
  );

  return { user, isAuthenticated, login };
};
```

### Form Handling

```typescript
// ✅ Good: Form with Ant Design
import { Form, Input, Button } from 'antd';

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const { login, isLoading } = useLogin();

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
    } catch (error) {
      form.setFields([{
        name: 'password',
        errors: ['Invalid credentials'],
      }]);
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isLoading}>
        Login
      </Button>
    </Form>
  );
};
```

## Anti-Patterns to Avoid

### ❌ Don't Do This

```typescript
// ❌ Default exports
export default MyComponent;

// ❌ Inline styles everywhere
<div style={{ color: 'red', padding: '10px' }}>Content</div>

// ❌ Prop drilling
<ComponentA data={data}>
  <ComponentB data={data}>
    <ComponentC data={data} />
  </ComponentB>
</ComponentA>

// ❌ Hardcoded routes
navigate('/admin/testimonials');

// ❌ Direct DOM manipulation
document.getElementById('myElement').style.display = 'none';

// ❌ Mutating state directly
state.users.push(newUser); // Redux state

// ❌ Any types
function processData(data: any) { }
```

### ✅ Do This Instead

```typescript
// ✅ Named exports
export const MyComponent: React.FC = () => { };

// ✅ SCSS Modules
<div className={styles.content}>Content</div>

// ✅ Context or Redux
const data = useAppSelector(selectData);

// ✅ Route constants
navigate(ROUTE_PATHS.ADMIN.TESTIMONIALS);

// ✅ React refs and state
const [isVisible, setIsVisible] = useState(true);

// ✅ Immutable updates
dispatch(addUser(newUser)); // Redux Toolkit handles immutability

// ✅ Proper types
function processData(data: UserData) { }
```

## Git Workflow

### Commit Messages

- Use conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- Write clear, concise messages
- Reference issue numbers when applicable

### Branch Naming

- Feature: `feature/feature-name`
- Bug fix: `fix/bug-description`
- Hotfix: `hotfix/critical-issue`

## Safety & Constraints

### Code Preservation

**CRITICAL**: Preserve existing functionality unless explicitly instructed to change it

- **Never delete or modify working code** without explicit instruction
- Make **minimal, surgical changes** to achieve the goal
- Respect existing patterns and conventions
- Test changes thoroughly before considering them complete
- If unsure about a change's impact, ask for clarification

### Incremental Changes

- Make **small, reviewable changes** that are easy to understand
- Each change should address a single concern
- Changes should be easy to revert if needed
- Avoid large refactoring unless specifically requested
- Test after each change, not just at the end

### Forbidden Actions

**NEVER** do the following without explicit instruction:

- ❌ Introduce new dependencies (npm packages)
- ❌ Upgrade or downgrade existing dependencies
- ❌ Change authentication or authorization logic
- ❌ Modify security-related code (token handling, validation)
- ❌ Change existing API endpoints or contracts
- ❌ Remove or bypass accessibility features
- ❌ Modify environment configuration files
- ❌ Change build or deployment scripts
- ❌ Delete existing tests
- ❌ Disable linting rules

### Dependency Management

- **Always use existing dependencies** when possible
- If a new dependency seems necessary:
  1. Check if existing dependencies can solve the problem
  2. Check if native JavaScript/TypeScript can solve it
  3. Ask for permission before adding
- Prefer small, focused libraries over large frameworks
- Check for security vulnerabilities before suggesting new packages

### Security Constraints

- **Never** expose sensitive data in client code
- **Never** commit API keys, tokens, or credentials
- **Never** disable CORS or security headers
- **Never** remove input validation
- **Never** introduce SQL injection or XSS vulnerabilities
- **Always** sanitize user inputs
- **Always** use HTTPS for API calls
- **Always** follow OWASP security guidelines

### Architecture Preservation

- Respect the feature-based architecture
- Keep pages, features, and shared boundaries clear
- Don't move files between features/shared without good reason
- Maintain separation of concerns (UI, business logic, infrastructure)
- Follow existing patterns for state management, API calls, routing

### Admin vs Public Separation

- Admin pages live in `src/pages/admin/` and `src/features/admin/`
- Public pages use marketing/content patterns
- Admin features use Ant Design extensively
- Don't mix admin patterns into public pages
- Keep authentication boundaries clear

## Existing Functionality

### Preservation Rules

When working with existing code:

- **Default to preserving behavior** unless change is requested
- **Avoid "improvements" not asked for** (Don't fix what isn't broken)
- **Respect existing abstractions** (Don't add unnecessary layers)
- **Keep existing test coverage** (Don't remove passing tests)
- **Match surrounding code style** (Consistency over personal preference)

### When Refactoring is Appropriate

Only refactor when:

- Explicitly requested in the task
- Fixing a bug requires the change
- Adding a feature requires restructuring
- Code violates security or accessibility standards

### Avoiding Unnecessary Abstractions

```tsx
// ❌ Bad: Unnecessary abstraction
const useButtonHandler = (onClick: () => void) => {
  return useCallback(() => onClick(), [onClick]);
};

// ✅ Good: Direct, clear implementation
<Button onClick={handleSubmit}>Submit</Button>;
```

Don't add:

- Unused generic types
- Premature optimizations
- Over-engineered patterns
- Abstractions with single use cases

## Resources

### Internal Documentation

- **Standards Documentation**: See `docs/standards.md` for detailed conventions and file naming
- **UI Guidelines**: See `docs/ui-guidelines.md` for Ant Design vs custom HTML/CSS guidance
- **Project Structure**: See project tree above for complete architecture

### External Resources

- **React Documentation**: https://react.dev/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Ant Design**: https://ant.design/
- **TypeScript**: https://www.typescriptlang.org/
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Web Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

### Tools and Commands

- Lint: `npm run lint`
- Format: `npm run format`
- Type Check: `npm run type-check`
- Dev Server: `npm run dev` or `npm run localdev`
- Build: `npm run build`
- Production Build: `npm run build:production`

---

## Summary Checklist

Before generating code, ensure you:

- ✅ Understand the feature's place in the architecture (feature/shared/page)
- ✅ Know whether to use Ant Design or custom HTML/CSS (check `/docs/ui-guidelines.md`)
- ✅ Will preserve existing functionality unless explicitly asked to change
- ✅ Will follow WCAG 2.1 AA accessibility standards
- ✅ Will make minimal, surgical changes
- ✅ Will follow existing naming conventions and patterns
- ✅ Will keep components small and focused (< 200 lines)
- ✅ Won't introduce new dependencies without permission
- ✅ Will add comments only for non-obvious logic
- ✅ Will test keyboard navigation and screen reader compatibility for UI changes

---

**Remember**: Write clean, maintainable, and well-documented code that follows these guidelines. When in doubt, prioritize readability, accessibility, and consistency with existing code.
