```
```
template-web-react/
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logo.svg
│   │   │   ├── hero-banner.jpg
│   │   │   ├── placeholder-avatar.png
│   │   │   └── icons/
│   │   │       └── users.svg
│   │   ├── fonts/
│   │   │   ├── Inter-Regular.woff2
│   │   │   └── Inter-Bold.woff2
│   │   └── favicon.ico
│
├── src/
│   │
│   ├── app/
│   │   ├── tbd
│   ├── features/                           # Feature-based modules (domain-driven)
│   │   ├── auth/                           # 🔐 Authentication & Authorization
│   │   │   ├── components/
│   │   │   │   ├── LoginForm/
│   │   │   │   │   ├── LoginForm.tsx
│   │   │   │   │   ├── LoginForm.module.scss
│   │   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── RegisterForm/
│   │   │   │   │   ├── RegisterForm.tsx
│   │   │   │   │   ├── RegisterForm.module.scss
│   │   │   │   │   ├── RegisterForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── PasswordReset/
│   │   │   │   │   ├── PasswordResetRequest.tsx
│   │   │   │   │   ├── PasswordResetConfirm.tsx
│   │   │   │   │   ├── PasswordReset.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── authApi.ts              # ⭐ RTK Query API slice for auth
│   │   │   │                                # Endpoints: login, register, logout, refresh
│   │   │   │
│   │   │   ├── store/
│   │   │   │   ├── authSlice.ts            # Traditional slice for user state/permissions
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts              # Facade: combines RTK Query + authSlice
│   │   │   │   ├── usePermissions.ts       # RBAC permission checks
│   │   │   │   ├── useRequireAuth.ts       # Route protection hook
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── guards/
│   │   │   │   ├── PermissionGuard.tsx     # Component-level RBAC guard
│   │   │   │   ├── RoleGuard.tsx           # Role-based guard wrapper
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts           # User, Credentials, AuthResponse
│   │   │   │   ├── roles.types.ts          # Role, Permission enums
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── validators/
│   │   │   │   ├── authValidation.ts       # Zod/Yup schemas
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts                    # Public API exports
│   │   ├── contact/                        # 📧 Contact Form
│   │   │   ├── components/
│   │   │   │   ├── ContactForm/
│   │   │   │   │   ├── ContactForm.tsx
│   │   │   │   │   ├── ContactForm.module.scss
│   │   │   │   │   ├── ContactForm.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ContactInfo/
│   │   │   │   │   ├── ContactInfo.tsx
│   │   │   │   │   ├── ContactInfo.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── api/
│   │   │   │   └── contactApi.ts           # ⭐ RTK Query API slice
│   │   │   │                                # Mutation: submitContactForm
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useContactForm.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── contact.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── validators/
│   │   │   │   ├── contactValidation.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   ├── admin/                          # 👨‍💼 Admin Dashboard & Management
│   │   │   ├── components/
│   │   │   │   ├── Dashboard/
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── Dashboard.module.scss
│   │   │   │   │   ├── DashboardStats/
│   │   │   │   │   │   ├── DashboardStats.tsx
│   │   │   │   │   │   ├── DashboardStats.module.scss
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── UserManagement/
│   │   │   │   │   ├── UserManagement.tsx
│   │   │   │   │   ├── UserManagement.module.scss
│   │   │   │   │   ├── UserTable.tsx
│   │   │   │   │   ├── UserForm.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Analytics/
│   │   │   │   │   ├── Analytics.tsx
│   │   │   │   │   ├── Analytics.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── api/
│   │   │   │   ├── adminApi.ts             # ⭐ RTK Query API slice
│   │   │   │   └── analyticsApi.ts         # ⭐ RTK Query for analytics
│   │   │   │
│   │   │   ├── hooks/
│   │   │   │   ├── useAdminDashboard.ts
│   │   │   │   ├── useUserManagement.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── admin.types.ts
│   │   │   │   ├── analytics.types.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   └── theme/                          # 🎨 Theme Management (Dark Mode)
│   │       ├── components/
│   │       │   ├── ThemeToggle/
│   │       │   │   ├── ThemeToggle.tsx
│   │       │   │   ├── ThemeToggle.module.scss
│   │       │   │   └── index.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── hooks/
│   │       │   ├── useTheme.ts
│   │       │   └── index.ts
│   │       │
│   │       ├── store/
│   │       │   ├── themeSlice.ts           # Traditional slice (UI state)
│   │       │   └── index.ts
│   │       │
│   │       └── index.ts
│   │
│   ├── shared/                             # Shared/common code across features
│   │   │
│   │   ├── components/                     # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.module.scss
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Card/
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Card.module.scss
│   │   │   │   ├── Card.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── Modal.module.scss
│   │   │   │   ├── Modal.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Drawer/
│   │   │   │   ├── Drawer.tsx
│   │   │   │   ├── Drawer.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── Table/
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── Table.module.scss
│   │   │   │   ├── Table.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Form/
│   │   │   │   ├── FormField/
│   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   ├── FormField.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FormSelect/
│   │   │   │   │   ├── FormSelect.tsx
│   │   │   │   │   ├── FormSelect.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FormDatePicker/
│   │   │   │   │   ├── FormDatePicker.tsx
│   │   │   │   │   ├── FormDatePicker.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FormTextArea/
│   │   │   │   │   ├── FormTextArea.tsx
│   │   │   │   │   ├── FormTextArea.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── Loading/
│   │   │   │   ├── Spinner/
│   │   │   │   │   ├── Spinner.tsx
│   │   │   │   │   ├── Spinner.module.scss
│   │   │   │   │   ├── Spinner.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Skeleton/
│   │   │   │   │   ├── Skeleton.tsx
│   │   │   │   │   ├── Skeleton.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ProgressBar/
│   │   │   │   │   ├── ProgressBar.tsx
│   │   │   │   │   ├── ProgressBar.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── ErrorBoundary/
│   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   ├── ErrorBoundary.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── Alert/
│   │   │   │   ├── Alert.tsx
│   │   │   │   ├── Alert.module.scss
│   │   │   │   ├── Alert.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Badge/
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Badge.module.scss
│   │   │   │   ├── Badge.stories.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Tooltip/
│   │   │   │   ├── Tooltip.tsx
│   │   │   │   ├── Tooltip.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── Pagination/
│   │   │   │   ├── Pagination.tsx
│   │   │   │   ├── Pagination.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── EmptyState/
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   ├── EmptyState.module.scss
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── layouts/                        # Layout components
│   │   │   ├── MainLayout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── MainLayout.module.scss
│   │   │   │   ├── Header/
│   │   │   │   │   ├── Header.tsx
│   │   │   │   │   ├── Header.module.scss
│   │   │   │   │   ├── UserMenu.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Footer/
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   ├── Footer.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Navbar/
│   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   ├── Navbar.module.scss
│   │   │   │   │   ├── NavItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── AuthLayout/
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   ├── AuthLayout.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── AdminLayout/
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── AdminLayout.module.scss
│   │   │   │   ├── Sidebar/
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── Sidebar.module.scss
│   │   │   │   │   ├── SidebarItem.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                          # Global custom hooks
│   │   │   ├── useDebounce.ts
│   │   │   ├── useMediaQuery.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useSessionStorage.ts
│   │   │   ├── useToggle.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useOnClickOutside.ts
│   │   │   ├── useWindowSize.ts
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                          # Helper functions
│   │   │   ├── formatters/
│   │   │   │   ├── dateFormatter.ts
│   │   │   │   ├── currencyFormatter.ts
│   │   │   │   ├── phoneFormatter.ts
│   │   │   │   ├── nameFormatter.ts
│   │   │   │   └── index.ts
│   │   │   ├── validators/
│   │   │   │   ├── emailValidator.ts
│   │   │   │   ├── phoneValidator.ts
│   │   │   │   ├── passwordValidator.ts
│   │   │   │   ├── validationStrategy.ts   # Strategy pattern
│   │   │   │   └── index.ts
│   │   │   ├── transforms/
│   │   │   │   ├── apiTransforms.ts        # Transform API responses
│   │   │   │   └── index.ts
│   │   │   ├── constants.ts
│   │   │   ├── helpers.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── types/                          # Global TypeScript types
│   │   │   ├── common.types.ts
│   │   │   ├── api.types.ts
│   │   │   ├── pagination.types.ts
│   │   │   ├── forms.types.ts
│   │   │   └── index.ts
│   │   │
│   │   └── styles/                         # ⭐ Global styles & theming system
│   │       ├── themes/
│   │       │   ├── _tokens.scss            # Design tokens (single source of truth)
│   │       │   ├── _light-theme.scss       # Light theme semantic colors
│   │       │   ├── _dark-theme.scss        # Dark theme semantic colors
│   │       │   └── index.scss
│   │       │
│   │       ├── abstracts/
│   │       │   ├── _variables.scss         # Derived variables from tokens
│   │       │   ├── _mixins.scss            # Reusable SCSS mixins
│   │       │   ├── _functions.scss         # SCSS utility functions
│   │       │   └── index.scss
│   │       │
│   │       ├── base/
│   │       │   ├── _reset.scss             # CSS reset/normalize
│   │       │   ├── _typography.scss        # Global typography
│   │       │   └── index.scss
│   │       │
│   │       ├── utilities/
│   │       │   ├── _spacing.scss           # Spacing utilities
│   │       │   ├── _animations.scss        # Keyframe animations
│   │       │   └── index.scss
│   │       │
│   │       ├── global.scss                 # Global styles entry point
│   │       ├── antd-overrides.scss         # Ant Design customizations
│   │       └── theme.ts                    # Ant Design theme config (TypeScript)
│   │
│   ├── services/                           # ⭐ Infrastructure services (non-feature)
│   │   │
│   │   ├── api/
│   │   │   ├── baseQuery.ts                # ⭐ RTK Query custom base query
│   │   │   │                                # - JWT token injection
│   │   │   │                                # - Token refresh on 401
│   │   │   │                                # - Mutex for concurrent refresh
│   │   │   ├── baseQueryWithReauth.ts      # Enhanced base query with retry
│   │   │   ├── endpoints.ts                # API endpoint constants
│   │   │   ├── errorHandler.ts             # Centralized error handling
│   │   │   ├── rtkQueryErrorLogger.ts      # Middleware for logging API errors
│   │   │   └── index.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── tokenManager.ts             # Singleton: Token storage/retrieval
│   │   │   ├── jwtService.ts               # JWT decode, validate, parse
│   │   │   ├── permissionService.ts        # RBAC logic (Strategy pattern)
│   │   │   └── index.ts
│   │   │
│   │   ├── storage/
│   │   │   ├── localStorage.ts             # Type-safe localStorage wrapper
│   │   │   ├── sessionStorage.ts           # Type-safe sessionStorage wrapper
│   │   │   ├── storageFactory.ts           # Factory pattern for storage
│   │   │   └── index.ts
│   │   │
│   │   ├── logger/
│   │   │   ├── logger.ts                   # Frontend logging service
│   │   │   ├── loggerConfig.ts             # Logger configuration
│   │   │   └── index.ts
│   │   │
│   │   └── analytics/
│   │       ├── analytics.ts                # Analytics service (Google Analytics, etc.)
│   │       ├── events.ts                   # Event tracking constants
│   │       └── index.ts
│   │
│   ├── routing/
│   │   ├── routes.tsx                      # All route definitions
│   │   ├── PrivateRoute.tsx                # Auth-protected routes
│   │   ├── RoleRoute.tsx                   # RBAC-protected routes
│   │   ├── routeConfig.ts                  # Route metadata (roles, permissions)
│   │   ├── routePaths.ts                   # Centralized route paths
│   │   └── index.ts
│   │
│   ├── config/
│   │   ├── env.ts                          # Environment variables with validation
│   │   ├── app.config.ts                   # App-wide configuration
│   │   ├── roles.config.ts                 # Role and permission definitions
│   │   └── index.ts
│   │
│   ├── pages/                              # Page-level components (route handlers)
│   │   ├── Home/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.module.scss
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── ServicesOverview.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── Contact/
│   │   │   ├── ContactPage.tsx
│   │   │   ├── ContactPage.module.scss
│   │   │   └── index.ts
│   │   ├── About/
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AboutPage.module.scss
│   │   │   └── index.ts
│   │   ├── Auth/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── LoginPage.module.scss
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── RegisterPage.module.scss
│   │   │   ├── ForgotPasswordPage.tsx
│   │   │   ├── ForgotPasswordPage.module.scss
│   │   │   └── index.ts
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminDashboard.module.scss
│   │   │   ├── UsersPage.tsx
│   │   │   ├── AnalyticsPage.tsx
│   │   │   └── index.ts
│   │   ├── NotFound/
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── NotFoundPage.module.scss
│   │   │   └── index.ts
│   │   └── Unauthorized/
│   │       ├── UnauthorizedPage.tsx
│   │       ├── UnauthorizedPage.module.scss
│   │       └── index.ts
│   │
│   ├── App.tsx                             # Root component
│   ├── App.module.scss                     # App-level styles
│   ├── main.tsx                            # Entry point
│   └── vite-env.d.ts                       # Vite type definitions
│
├── tests/                                  # Test utilities and setup
│   ├── setup.ts                            # Test environment setup (Vitest)
│   ├── mocks/
│   │   ├── handlers/                       # MSW handlers for API mocking
│   │   │   ├── authHandlers.ts
│   │   │   ├── appointmentsHandlers.ts
│   │   │   ├── servicesHandlers.ts
│   │   │   ├── testimonialsHandlers.ts
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── mockUsers.ts
│   │   │   ├── mockAppointments.ts
│   │   │   ├── mockServices.ts
│   │   │   └── index.ts
│   │   ├── server.ts                       # MSW server setup (Node)
│   │   └── browser.ts                      # MSW browser setup
│   ├── utils/
│   │   ├── renderWithProviders.tsx         # Test utility with Redux/Router
│   │   ├── testHelpers.ts
│   │   └── index.ts
│   └── e2e/                                # Playwright E2E tests
│       ├── auth.spec.ts
│       ├── appointments.spec.ts
│       └── index.ts
│
├── .storybook/                             # Storybook configuration
│   ├── main.ts
│   ├── preview.tsx
│   ├── manager.ts
│   └── theme.ts
│
├── docs/                                   # Project documentation
│   ├── ARCHITECTURE.md                     # Architecture overview & design patterns
│   ├── API_INTEGRATION.md                  # RTK Query setup & usage guide
│   ├── RBAC_GUIDE.md                       # RBAC implementation guide
│   ├── STYLING_GUIDE.md                    # Theming & styling guide
│   ├── TESTING_GUIDE.md                    # Testing strategy & examples
│   ├── DEPLOYMENT.md                       # Deployment instructions (AWS)
│   ├── CONTRIBUTING.md                     # Contribution guidelines
│   └── CHANGELOG.md                        # Version history
│
├── infrastructure/                         # Infrastructure as Code (Terraform)
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── s3.tf                           # S3 bucket for hosting
│   │   ├── cloudfront.tf                   # CloudFront CDN
│   │   └── route53.tf                      # DNS configuration
│   └── scripts/
│       ├── deploy.sh
│       └── rollback.sh
│
├── .env.example                            # Environment variables template
├── .env.development                        # Development environment variables
├── .env.staging                            # Staging environment variables
├── .env.production                         # Production environment variables
├── .eslintrc.cjs                           # ESLint configuration
├── .eslintignore                           # ESLint ignore rules
├── .prettierrc                             # Prettier configuration
├── .prettierignore                         # Prettier ignore rules
├── .stylelintrc.json                       # Stylelint configuration (SCSS linting)
├── .gitignore                              # Git ignore rules
├── .gitattributes                          # Git attributes
├── .editorconfig                           # Editor configuration
├── tsconfig.json                           # TypeScript configuration
├── tsconfig.node.json                      # TypeScript config for Node scripts
├── vite.config.ts                          # Vite configuration
├── vitest.config.ts                        # Vitest configuration (unit tests)
├── playwright.config.ts                    # Playwright configuration (E2E tests)
├── package.json                            # Project dependencies and scripts
├── package-lock.json                       # Lock file for dependencies
├── LICENSE                                 # Project license
└── README.md                               # Project README
```
```
