# GitHub Copilot Instructions for Orthopedic Spine Web React

This document provides guidance to GitHub Copilot for generating code that aligns with our project's standards, architecture, and best practices.

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

## Project Structure

```
src/
├── app/                    # Application bootstrap and providers
├── config/                 # Configuration layer (environment, API, theme)
├── infrastructure/         # Cross-cutting concerns (API client, cache, logger, monitoring)
├── features/               # Feature modules (auth, home, services, contact, testimonials)
│   └── [feature]/
│       ├── components/     # Feature-specific components
│       ├── hooks/          # Custom hooks
│       ├── services/       # Business logic
│       ├── api/            # RTK Query endpoints
│       ├── store/          # Redux slices
│       ├── types/          # TypeScript types
│       └── utils/          # Feature utilities
├── pages/                  # Route-level page components
├── routing/                # Route configuration
├── shared/                 # Shared components, layouts, hooks, utilities
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components
│   │   ├── layout/        # Layout components
│   │   └── widgets/       # Special widgets
│   ├── layouts/           # Page layouts
│   ├── hooks/             # Global custom hooks
│   ├── utils/             # Global utilities
│   └── resources/         # Static data and configuration
├── store/                  # Redux store configuration
└── styles/                 # Global styles and theme variables
```

## Naming Conventions

### File Naming
| Type        | Convention   | Example                         |
|-------------|-------------|---------------------------------|
| Components  | PascalCase  | `LoginForm.tsx`                 |
| Pages       | index.tsx   | `pages/home/index.tsx`          |
| Utilities   | kebab-case  | `format-date.ts`                |
| Config      | kebab-case  | `clinic-information.ts`         |
| Styles      | kebab-case  | `LoginForm.module.scss`         |
| Tests       | match file  | `LoginForm.test.tsx`            |
| Types       | kebab-case  | `auth.types.ts`                 |

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
- Keep components small and focused (Single Responsibility)
- Extract complex logic into custom hooks
- Use composition over props drilling
- Memoize expensive computations with `useMemo`
- Memoize callbacks with `useCallback` when passed to child components
- Export named exports, not default exports

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

## Accessibility

### Best Practices
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Provide alt text for images
- Maintain sufficient color contrast
- Test with screen readers
- Support responsive design for all devices

## Documentation

### Code Documentation
- Add JSDoc comments for public APIs and complex functions
- Keep README.md updated
- Document breaking changes
- Update docs/ folder for architectural decisions
- Reference docs/standards.md for detailed conventions
- Reference docs/project-tree.md for structure overview

## Common Patterns and Examples

### Custom Hooks
```typescript
// ✅ Good: Custom hook
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector(selectAuth);

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      dispatch(setAuth(response));
    } catch (error) {
      throw new Error('Login failed');
    }
  }, [dispatch]);

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

## Resources

- **Standards Documentation**: See `docs/standards.md` for detailed conventions
- **Project Structure**: See `docs/project-tree.md` for complete architecture
- **React Documentation**: https://react.dev/
- **Redux Toolkit**: https://redux-toolkit.js.org/
- **Ant Design**: https://ant.design/
- **TypeScript**: https://www.typescriptlang.org/

---

**Remember**: Write clean, maintainable, and well-documented code that follows these guidelines. When in doubt, prioritize readability and consistency with existing code.
