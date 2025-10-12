# Project tree

```bash
orthspine-web-react/
│
├── .github/                                # 🤖 CI/CD & GitHub Automation
│   ├── workflows/
│   │   ├── ci.yml                          # Continuous Integration (Vitest + ESLint)
│   │   ├── cd-staging.yml                  # Deploy to AWS S3/CloudFront (Staging)
│   │   ├── cd-production.yml               # Deploy to AWS S3/CloudFront (Production)
│   │   ├── code-quality.yml                # ESLint + Prettier + Stylelint
│   │   ├── security-scan.yml               # Snyk/Trivy dependency scanning
│   │   ├── e2e-tests.yml                   # Playwright E2E tests
│   │   └── docker-build.yml                # Build and push Docker image to ECR
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── refactoring.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── dependabot.yml                      # Automated dependency updates
│
├── docker/                                 # 🐳 Docker Configuration
│   ├── Dockerfile                          # Multi-stage production build
│   ├── Dockerfile.dev                      # Development container
│   ├── docker-compose.yml                  # Local development stack
│   ├── docker-compose.prod.yml             # Production simulation
│   └── nginx/
│       ├── nginx.conf                      # Production Nginx config
│       └── nginx.dev.conf                  # Development Nginx config
│
├── infrastructure/                         # 🏗️ IaC (Infrastructure as Code)
│   ├── terraform/
│   │   ├── environments/
│   │   │   ├── staging/
│   │   │   │   ├── main.tf
│   │   │   │   ├── variables.tf
│   │   │   │   └── outputs.tf
│   │   │   └── production/
│   │   │       ├── main.tf
│   │   │       ├── variables.tf
│   │   │       └── outputs.tf
│   │   ├── modules/
│   │   │   ├── s3-cloudfront/              # S3 + CloudFront module
│   │   │   │   ├── main.tf
│   │   │   │   ├── variables.tf
│   │   │   │   └── outputs.tf
│   │   │   ├── route53/                    # DNS module
│   │   │   └── waf/                        # Web Application Firewall
│   │   └── backend.tf                      # Terraform state backend (S3 + DynamoDB)
│   └── scripts/
│       ├── deploy-staging.sh               # Staging deployment script
│       ├── deploy-production.sh            # Production deployment script
│       └── rollback.sh                     # Rollback script
│
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── about-us/
│   │   │   │   ├── aaron.png
│   │   │   │   ├── colegio.png
│   │   │   │   └── santa-paula.png
│   │   │   ├── services/
│   │   │   │   ├── circulation.jpg
│   │   │   │   ├── foot-and-hand-1.jpg
│   │   │   │   ├── hip.jpg
│   │   │   │   ├── knee.jpg
│   │   │   │   ├── rehabilitation.jpg
│   │   │   │   ├── shoulder.jpg
│   │   │   │   ├── spine.jpg
│   │   │   │   └── sports.jpg
│   │   │   ├── logo.svg
│   │   │   ├── orth-spine-logo.svg
│   │   │   ├── building.png
│   │   │   ├── maps.png
│   │   │   ├── waze.png
│   │   │   └── icons/
│   │   │       ├── whatsapp.svg
│   │   │       ├── email.svg
│   │   │       └── phone.svg
│   │   ├── fonts/
│   │   │   ├── Inter-Regular.woff2
│   │   │   ├── Inter-Medium.woff2
│   │   │   └── Inter-Bold.woff2
│   │   └── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   │
│   ├── app/                                # 🎯 Application Bootstrap
│   │   ├── App.tsx                         # Root component
│   │   ├── App.module.scss
│   │   ├── providers/                      # Provider composition (Composite Pattern)
│   │   │   ├── AppProviders.tsx            # Combines all providers
│   │   │   ├── ReduxProvider.tsx
│   │   │   ├── ThemeProvider.tsx
│   │   │   ├── RouterProvider.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── config/                             # ⚙️ Configuration Layer (Strategy Pattern)
│   │   ├── environment.ts                  # Environment-based configuration
│   │   │                                   # Strategy: Dynamically select config based on NODE_ENV
│   │   ├── api.config.ts                   # API base URLs, timeout, retry logic
│   │   ├── theme.config.ts                 # Theme tokens (light/dark modes)
│   │   ├── logger.config.ts                # Logger levels and transports
│   │   ├── routes.config.ts                # Route metadata (permissions, roles)
│   │   ├── features.config.ts              # Feature flags (A/B testing, rollouts)
│   │   └── index.ts
│   │
│   ├── infrastructure/                     # 🏗️ Cross-Cutting Concerns
│   │   │
│   │   ├── api/                            # HTTP Client & Interceptors
│   │   │   ├── client/
│   │   │   │   ├── HttpClient.ts           # Singleton: Axios wrapper with retry logic
│   │   │   │   ├── baseQuery.ts            # RTK Query base configuration
│   │   │   │   └── index.ts
│   │   │   ├── interceptors/               # Chain of Responsibility Pattern
│   │   │   │   ├── authInterceptor.ts      # Adds Authorization header
│   │   │   │   ├── errorInterceptor.ts     # Global error handling
│   │   │   │   ├── loggingInterceptor.ts   # Logs requests/responses
│   │   │   │   ├── retryInterceptor.ts     # Retry failed requests
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── cache/                          # Caching Infrastructure
│   │   │   ├── CacheManager.ts             # Facade: Unified cache interface
│   │   │   ├── strategies/                 # Strategy Pattern: Pluggable cache backends
│   │   │   │   ├── ICacheStrategy.ts       # Interface (Dependency Inversion)
│   │   │   │   ├── LocalStorageStrategy.ts # localStorage implementation
│   │   │   │   ├── MemoryCacheStrategy.ts  # In-memory cache (LRU)
│   │   │   │   ├── IndexedDBStrategy.ts    # IndexedDB for large data
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── logger/                         # Logging Infrastructure
│   │   │   ├── Logger.ts                   # Singleton: Application logger
│   │   │   ├── transports/                 # Strategy Pattern: Log destinations
│   │   │   │   ├── ILogTransport.ts        # Interface
│   │   │   │   ├── ConsoleTransport.ts     # Browser console
│   │   │   │   ├── RemoteTransport.ts      # Send logs to CloudWatch/Datadog
│   │   │   │   └── index.ts
│   │   │   ├── LogLevel.enum.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── monitoring/                     # Application Monitoring
│   │   │   ├── ErrorTracker.ts             # Sentry/Rollbar integration
│   │   │   ├── PerformanceMonitor.ts       # Web Vitals (CLS, FID, LCP)
│   │   │   ├── AnalyticsService.ts         # Google Analytics/Mixpanel
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── features/                           # 🎨 Feature Modules (Domain-Driven Design)
│   │   │
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
│   │   │   ├── hooks/                      # Facade Pattern: Simplify auth operations
│   │   │   │   ├── useAuth.ts              # Main auth hook
│   │   │   │   ├── useAuth.test.ts
│   │   │   │   ├── useLogin.ts             # Login logic
│   │   │   │   ├── useRegister.ts          # Registration logic
│   │   │   │   ├── usePasswordReset.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/                   # Repository Pattern: Business logic
│   │   │   │   ├── AuthService.ts
│   │   │   │   ├── AuthService.test.ts
│   │   │   │   ├── TokenService.ts         # JWT token management
│   │   │   │   └── index.ts
│   │   │   ├── api/                        # RTK Query endpoints
│   │   │   │   ├── authApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/                      # Redux state slice
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── authSlice.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── auth.types.ts           # User, Token, Credentials types
│   │   │   │   └── index.ts
│   │   │   ├── utils/
│   │   │   │   ├── tokenManager.ts         # localStorage token handling
│   │   │   │   ├── authHelpers.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── home/                           # 🏠 Home Page Feature
│   │   │   ├── components/
│   │   │   │   ├── HeroSection/
│   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   ├── HeroSection.module.scss
│   │   │   │   │   ├── HeroSection.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ServicesOverview/
│   │   │   │   │   ├── ServicesOverview.tsx
│   │   │   │   │   ├── ServicesOverview.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TestimonialsCarousel/
│   │   │   │   │   ├── TestimonialsCarousel.tsx
│   │   │   │   │   ├── TestimonialsCarousel.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── LocationInfo/
│   │   │   │   │   ├── LocationInfo.tsx
│   │   │   │   │   ├── LocationInfo.module.scss
│   │   │   │   │   ├── LocationButtons.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Schedule/
│   │   │   │   │   ├── Schedule.tsx
│   │   │   │   │   ├── Schedule.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useHomeData.ts          # Aggregates home page data
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── about-us/                       # ℹ️ About Us Feature
│   │   │   ├── components/
│   │   │   │   ├── TeamSection/
│   │   │   │   │   ├── TeamSection.tsx
│   │   │   │   │   ├── TeamSection.module.scss
│   │   │   │   │   ├── TeamMember.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── HistoryTimeline/
│   │   │   │   │   ├── HistoryTimeline.tsx
│   │   │   │   │   ├── HistoryTimeline.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Affiliations/
│   │   │   │   │   ├── Affiliations.tsx
│   │   │   │   │   ├── Affiliations.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── content.tsx                 # Static content (can move to CMS)
│   │   │   └── index.ts
│   │   │
│   │   ├── services/                       # 🏥 Medical Services Feature
│   │   │   ├── components/
│   │   │   │   ├── ServiceCard/
│   │   │   │   │   ├── ServiceCard.tsx
│   │   │   │   │   ├── ServiceCard.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ServiceDetail/
│   │   │   │   │   ├── ServiceDetail.tsx
│   │   │   │   │   ├── ServiceDetail.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ServiceGrid/
│   │   │   │   │   ├── ServiceGrid.tsx
│   │   │   │   │   ├── ServiceGrid.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useServices.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── services.types.ts       # Service domain models
│   │   │   │   └── index.ts
│   │   │   ├── data/
│   │   │   │   └── servicesData.ts         # Service catalog (can move to CMS)
│   │   │   └── index.ts
│   │   │
│   │   ├── contact/                        # 📧 Contact Feature
│   │   │   ├── components/
│   │   │   │   ├── ContactForm/
│   │   │   │   │   ├── ContactForm.tsx
│   │   │   │   │   ├── ContactForm.module.scss
│   │   │   │   │   ├── ContactForm.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ContactInfo/
│   │   │   │   │   ├── ContactInfo.tsx
│   │   │   │   │   ├── ContactInfo.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── LocationMap/
│   │   │   │   │   ├── LocationMap.tsx
│   │   │   │   │   ├── LocationMap.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useContactForm.ts       # Form state & validation
│   │   │   │   ├── useContactForm.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/                   # Repository Pattern
│   │   │   │   ├── EmailService.ts         # Business logic for email
│   │   │   │   ├── EmailService.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── api/                        # RTK Query endpoints
│   │   │   │   ├── emailApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── contact.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── testimonials/                   # ⭐ Testimonials Feature (Public)
│   │   │   ├── components/
│   │   │   │   ├── TestimonialCard/
│   │   │   │   │   ├── TestimonialCard.tsx
│   │   │   │   │   ├── TestimonialCard.module.scss
│   │   │   │   │   ├── TestimonialCard.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TestimonialList/
│   │   │   │   │   ├── TestimonialList.tsx
│   │   │   │   │   ├── TestimonialList.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TestimonialForm/
│   │   │   │   │   ├── TestimonialForm.tsx
│   │   │   │   │   ├── TestimonialForm.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useTestimonials.ts      # Facade: Encapsulates testimonial logic
│   │   │   │   ├── useTestimonials.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/                   # Repository Pattern
│   │   │   │   ├── TestimonialService.ts
│   │   │   │   ├── TestimonialService.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── api/                        # RTK Query endpoints
│   │   │   │   ├── testimonialApi.ts
│   │   │   │   └── index.ts
│   │   │   ├── store/
│   │   │   │   ├── testimonialSlice.ts
│   │   │   │   ├── testimonialSlice.test.ts
│   │   │   │   └── index.ts
│   │   │   ├── types/
│   │   │   │   ├── testimonial.types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── admin/                          # 👨‍💼 Admin Feature (RBAC Protected)
│   │   │   ├── components/
│   │   │   │   ├── Dashboard/
│   │   │   │   │   ├── Dashboard.tsx
│   │   │   │   │   ├── Dashboard.module.scss
│   │   │   │   │   ├── DashboardStats/
│   │   │   │   │   │   ├── DashboardStats.tsx
│   │   │   │   │   │   ├── DashboardStats.module.scss
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── RecentActivity/
│   │   │   │   │   │   ├── RecentActivity.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── TestimonialsManager/
│   │   │   │   │   ├── TestimonialsManager.tsx
│   │   │   │   │   ├── TestimonialsManager.module.scss
│   │   │   │   │   ├── TestimonialTable.tsx
│   │   │   │   │   ├── TestimonialApproval.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAdminDashboard.ts
│   │   │   │   ├── useTestimonialsAdmin.ts
│   │   │   │   └── index.ts
│   │   │   ├── services/
│   │   │   │   ├── AdminService.ts         # Admin-specific business logic
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── pages/                              # 📄 Page Components (Route Handlers)
│   │   │                                   # Composite Pattern: Assemble features into pages
│   │   ├── HomePage/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HomePage.module.scss
│   │   │   └── index.ts
│   │   ├── AboutPage/
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AboutPage.module.scss
│   │   │   └── index.ts
│   │   ├── ServicesPage/
│   │   │   ├── ServicesPage.tsx
│   │   │   ├── ServicesPage.module.scss
│   │   │   └── index.ts
│   │   ├── ContactPage/
│   │   │   ├── ContactPage.tsx
│   │   │   ├── ContactPage.module.scss
│   │   │   └── index.ts
│   │   ├── TestimonialsPage/
│   │   │   ├── TestimonialsPage.tsx
│   │   │   ├── TestimonialsPage.module.scss
│   │   │   └── index.ts
│   │   ├── auth/
│   │   │   ├── LoginPage/
│   │   │   │   ├── LoginPage.tsx
│   │   │   │   ├── LoginPage.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── RegisterPage/
│   │   │   │   ├── RegisterPage.tsx
│   │   │   │   ├── RegisterPage.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── ForgotPasswordPage/
│   │   │   │   ├── ForgotPasswordPage.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── admin/
│   │   │   ├── AdminDashboardPage/
│   │   │   │   ├── AdminDashboardPage.tsx
│   │   │   │   ├── AdminDashboardPage.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── TestimonialsAdminPage/
│   │   │   │   ├── TestimonialsAdminPage.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── NotFoundPage/
│   │   │   ├── NotFoundPage.tsx
│   │   │   ├── NotFoundPage.module.scss
│   │   │   └── index.ts
│   │   ├── UnauthorizedPage/
│   │   │   ├── UnauthorizedPage.tsx
│   │   │   ├── UnauthorizedPage.module.scss
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── routing/                            # 🛣️ Routing Configuration
│   │   ├── routes.tsx                      # Route definitions with lazy loading
│   │   ├── guards/                         # Route Guards (Chain of Responsibility)
│   │   │   ├── AuthGuard.tsx               # Requires authentication
│   │   │   ├── AuthGuard.test.tsx
│   │   │   ├── RoleGuard.tsx               # RBAC: Requires specific roles
│   │   │   ├── RoleGuard.test.tsx
│   │   │   ├── GuestGuard.tsx              # Only for unauthenticated users
│   │   │   └── index.ts
│   │   ├── config/
│   │   │   ├── routePaths.ts               # Centralized route paths (const)
│   │   │   ├── routeMetadata.ts            # Route titles, permissions, breadcrumbs
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── routeHelpers.ts             # Navigate helpers, query params
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── shared/                             # 🔧 Shared/Reusable Code
│   │   │
│   │   ├── components/                     # Reusable UI Components
│   │   │   │
│   │   │   ├── ui/                         # Basic UI Elements
│   │   │   │   ├── Button/
│   │   │   │   │   ├── Button.tsx
│   │   │   │   │   ├── Button.module.scss
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Button.stories.tsx  # Storybook
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Card/
│   │   │   │   │   ├── Card.tsx
│   │   │   │   │   ├── Card.module.scss
│   │   │   │   │   ├── Card.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Modal/
│   │   │   │   │   ├── Modal.tsx
│   │   │   │   │   ├── Modal.module.scss
│   │   │   │   │   ├── Modal.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Drawer/
│   │   │   │   ├── Alert/
│   │   │   │   ├── Badge/
│   │   │   │   ├── Tooltip/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── form/                       # Form Components
│   │   │   │   ├── FormField/
│   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   ├── FormField.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── FormSelect/
│   │   │   │   ├── FormDatePicker/
│   │   │   │   ├── FormTextArea/
│   │   │   │   ├── FormCheckbox/
│   │   │   │   ├── FormRadio/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── data-display/               # Data Display Components
│   │   │   │   ├── Table/
│   │   │   │   │   ├── Table.tsx
│   │   │   │   │   ├── Table.module.scss
│   │   │   │   │   ├── Table.stories.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Pagination/
│   │   │   │   ├── EmptyState/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── feedback/                   # User Feedback Components
│   │   │   │   ├── Loading/
│   │   │   │   │   ├── Spinner/
│   │   │   │   │   │   ├── Spinner.tsx
│   │   │   │   │   │   ├── Spinner.module.scss
│   │   │   │   │   │   ├── Spinner.stories.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Skeleton/
│   │   │   │   │   ├── ProgressBar/
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ErrorBoundary/
│   │   │   │   │   ├── ErrorBoundary.tsx
│   │   │   │   │   ├── ErrorBoundary.module.scss
│   │   │   │   │   ├── ErrorBoundary.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── navigation/                 # Navigation Components
│   │   │   │   ├── ScrollToTop/
│   │   │   │   │   ├── ScrollToTop.tsx
│   │   │   │   │   ├── ScrollToTop.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── Breadcrumbs/
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── widgets/                    # Special Widgets
│   │   │   │   ├── WhatsAppFloat/
│   │   │   │   │   ├── WhatsAppFloat.tsx
│   │   │   │   │   ├── WhatsAppFloat.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   ├── ScheduleAppointment/
│   │   │   │   │   ├── ScheduleAppointment.tsx
│   │   │   │   │   ├── ScheduleAppointment.module.scss
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── index.ts
│   │   │
│   │   ├── layouts/                        # Layout Components
│   │   │   ├── MainLayout/
│   │   │   │   ├── MainLayout.tsx
│   │   │   │   ├── MainLayout.module.scss
│   │   │   │   ├── components/
│   │   │   │   │   ├── Header/
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   ├── Header.module.scss
│   │   │   │   │   │   ├── Navigation.tsx
│   │   │   │   │   │   ├── UserMenu.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   ├── Footer/
│   │   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   │   ├── Footer.module.scss
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── AuthLayout/
│   │   │   │   ├── AuthLayout.tsx
│   │   │   │   ├── AuthLayout.module.scss
│   │   │   │   └── index.ts
│   │   │   ├── AdminLayout/
│   │   │   │   ├── AdminLayout.tsx
│   │   │   │   ├── AdminLayout.module.scss
│   │   │   │   ├── components/
│   │   │   │   │   ├── Sidebar/
│   │   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   │   ├── Sidebar.module.scss
│   │   │   │   │   │   ├── SidebarItem.tsx
│   │   │   │   │   │   ├── SidebarGroup.tsx
│   │   │   │   │   │   └── index.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── hooks/                          # Shared Custom Hooks
│   │   │   ├── useDebounce.ts              # Debounce input
│   │   │   ├── useDebounce.test.ts
│   │   │   ├── useResponsive.ts            # Responsive breakpoints
│   │   │   ├── useResponsive.test.ts
│   │   │   ├── useLocalStorage.ts          # localStorage wrapper
│   │   │   ├── useMediaQuery.ts            # Media query hook
│   │   │   ├── useClickOutside.ts          # Detect clicks outside element
│   │   │   ├── useKeyPress.ts              # Keyboard event hook
│   │   │   ├── useAsync.ts                 # Async operation state
│   │   │   ├── usePagination.ts            # Pagination logic
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/                          # Utility Functions
│   │   │   │
│   │   │   ├── formatters/                 # Data Formatters
│   │   │   │   ├── dateFormatter.ts
│   │   │   │   ├── dateFormatter.test.ts
│   │   │   │   ├── currencyFormatter.ts
│   │   │   │   ├── phoneFormatter.ts
│   │   │   │   ├── nameFormatter.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── validators/                 # Validator Pattern
│   │   │   │   ├── IValidator.ts           # Validator interface
│   │   │   │   ├── Validator.ts            # Base abstract class
│   │   │   │   ├── EmailValidator.ts
│   │   │   │   ├── EmailValidator.test.ts
│   │   │   │   ├── PhoneValidator.ts
│   │   │   │   ├── PasswordValidator.ts
│   │   │   │   ├── CompositeValidator.ts   # Composite Pattern
│   │   │   │   ├── ValidationResult.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── helpers/
│   │   │   │   ├── stringHelpers.ts        # String manipulation
│   │   │   │   ├── arrayHelpers.ts         # Array utilities
│   │   │   │   ├── objectHelpers.ts        # Object utilities
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── storage/                    # Adapter Pattern: Storage abstraction
│   │   │   │   ├── IStorageAdapter.ts      # Storage interface
│   │   │   │   ├── LocalStorageAdapter.ts
│   │   │   │   ├── SessionStorageAdapter.ts
│   │   │   │   ├── StorageFactory.ts       # Factory Pattern
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   ├── errorHandler.ts             # Global error handling
│   │   │   ├── queryParams.ts              # URL query param helpers
│   │   │   └── index.ts
│   │   │
│   │   ├── constants/                      # Application Constants
│   │   │   ├── api.constants.ts            # API endpoints, HTTP status codes
│   │   │   ├── app.constants.ts            # App-wide constants
│   │   │   ├── routes.constants.ts         # Route paths
│   │   │   ├── validation.constants.ts     # Validation rules (regex, lengths)
│   │   │   ├── clinic.constants.ts         # Clinic info (phone, email, address)
│   │   │   └── index.ts
│   │   │
│   │   ├── types/                          # Global TypeScript Types
│   │   │   ├── common.types.ts             # Common types (ID, Timestamp, etc.)
│   │   │   ├── api.types.ts                # API response/request types
│   │   │   ├── pagination.types.ts         # Pagination types
│   │   │   ├── forms.types.ts              # Form types
│   │   │   ├── auth.types.ts               # Auth-related types
│   │   │   └── index.ts
│   │   │
│   │   └── theme/                          # Theme System
│   │       ├── ThemeProvider.tsx
│   │       ├── ThemeContext.tsx
│   │       ├── useTheme.ts                 # Theme hook
│   │       ├── themes/
│   │       │   ├── lightTheme.ts
│   │       │   ├── darkTheme.ts
│   │       │   └── index.ts
│   │       └── index.ts
│   │
│   ├── store/                              # Redux Store
│   │   ├── store.ts                        # Store configuration
│   │   ├── rootReducer.ts                  # Combined reducers
│   │   ├── middlewares.ts                  # Custom middlewares (logger, etc.)
│   │   ├── hooks.ts                        # Typed hooks (useAppDispatch, useAppSelector)
│   │   └── index.ts
│   │
│   ├── styles/                             # Global Styles (SCSS Architecture)
│   │   ├── abstracts/                      # SCSS Abstracts (no CSS output)
│   │   │   ├── _variables.scss             # Color, spacing, typography variables
│   │   │   ├── _mixins.scss                # Reusable SCSS mixins
│   │   │   ├── _functions.scss             # SCSS functions
│   │   │   └── _index.scss                 # Import all abstracts
│   │   ├── base/                           # Base styles
│   │   │   ├── _reset.scss                 # CSS reset/normalize
│   │   │   ├── _typography.scss            # Typography styles
│   │   │   ├── _global.scss                # Global styles
│   │   │   └── _index.scss
│   │   ├── utilities/                      # Utility classes
│   │   │   ├── _spacing.scss               # Margin/padding utilities
│   │   │   ├── _display.scss               # Display utilities
│   │   │   ├── _text.scss                  # Text utilities
│   │   │   └── _index.scss
│   │   └── main.scss                       # Main SCSS entry point
│   │
│   ├── main.tsx                            # Application Entry Point
│   └── vite-env.d.ts                       # Vite type definitions
│
├── tests/                                  # Test Configuration & Utilities
│   ├── setup.ts                            # Vitest global setup
│   ├── mocks/
│   │   ├── handlers/                       # MSW (Mock Service Worker) handlers
│   │   │   ├── authHandlers.ts
│   │   │   ├── testimonialsHandlers.ts
│   │   │   ├── emailHandlers.ts
│   │   │   └── index.ts
│   │   ├── data/                           # Mock data factories
│   │   │   ├── mockUsers.ts
│   │   │   ├── mockTestimonials.ts
│   │   │   ├── mockServices.ts
│   │   │   └── index.ts
│   │   ├── server.ts                       # MSW server (Node.js for tests)
│   │   └── browser.ts                      # MSW browser setup (dev)
│   ├── utils/
│   │   ├── renderWithProviders.tsx         # Test utility: Render with Redux/Router
│   │   ├── testHelpers.ts                  # Test helper functions
│   │   ├── mockStore.ts                    # Mock Redux store
│   │   └── index.ts
│   └── e2e/                                # Playwright E2E Tests
│       ├── auth.spec.ts                    # Auth flow E2E tests
│       ├── contact.spec.ts                 # Contact form E2E tests
│       ├── testimonials.spec.ts            # Testimonials E2E tests
│       ├── admin.spec.ts                   # Admin panel E2E tests
│       └── index.ts
│
├── docs/                                   # Project Documentation
│   ├── architecture/
│   │   ├── ARCHITECTURE.md                 # System architecture overview
│   │   ├── DESIGN_PATTERNS.md              # Design patterns documentation
│   │   ├── COMPONENT_HIERARCHY.md          # Component structure
│   │   ├── DATA_FLOW.md                    # State management & data flow
│   │   └── DEPENDENCY_GRAPH.md             # Module dependency visualization
│   ├── guides/
│   │   ├── API_INTEGRATION.md              # RTK Query integration guide
│   │   ├── RBAC_GUIDE.md                   # Role-based access control
│   │   ├── STYLING_GUIDE.md                # CSS Modules & theming guide
│   │   ├── TESTING_GUIDE.md                # Testing strategy & best practices
│   │   ├── PERFORMANCE_OPTIMIZATION.md     # Performance best practices
│   │   ├── SECURITY_BEST_PRACTICES.md      # Security guidelines
│   │   └── CONTRIBUTING.md                 # Contribution guidelines
│   ├── deployment/
│   │   ├── AWS_DEPLOYMENT.md               # AWS deployment guide
│   │   ├── DOCKER_GUIDE.md                 # Docker setup & optimization
│   │   ├── CI_CD.md                        # CI/CD pipeline documentation
│   │   └── ROLLBACK_STRATEGY.md            # Rollback procedures
│   ├── api/
│   │   ├── API_DOCUMENTATION.md            # Backend API documentation
│   │   └── ENDPOINTS.md                    # API endpoints reference
│   └── CHANGELOG.md                        # Version history
│
├── scripts/                                # Build & Utility Scripts
│   ├── generate-component.js               # CLI: Generate component boilerplate
│   ├── generate-feature.js                 # CLI: Generate feature module
│   ├── generate-page.js                    # CLI: Generate page component
│   ├── build-icons.js                      # Optimize SVG icons
│   ├── analyze-bundle.js                   # Bundle size analysis
│   └── README.md                           # Scripts documentation
│
├── .storybook/                             # Storybook Configuration
│   ├── main.ts
│   ├── preview.ts
│   └── manager.ts
│
├── .husky/                                 # Git Hooks (pre-commit, pre-push)
│   ├── pre-commit                          # Run linters before commit
│   ├── pre-push                            # Run tests before push
│   └── commit-msg                          # Enforce commit message format
│
├── .vscode/                                # VS Code Configuration
│   ├── settings.json                       # Workspace settings
│   ├── extensions.json                     # Recommended extensions
│   └── launch.json                         # Debug configurations
│
├── .env.example                            # Environment variables template
├── .env.development                        # Development environment
├── .env.staging                            # Staging environment
├── .env.production                         # Production environment
│
├── .eslintrc.cjs                           # ESLint configuration
├── .eslintignore                           # ESLint ignore rules
├── .prettierrc.json                        # Prettier configuration
├── .prettierignore                         # Prettier ignore rules
├── .stylelintrc.json                       # Stylelint (SCSS linting)
├── .editorconfig                           # Editor configuration
├── .gitignore                              # Git ignore rules
├── .gitattributes                          # Git attributes
│
├── tsconfig.json                           # TypeScript root configuration
├── tsconfig.app.json                       # TypeScript app configuration
├── tsconfig.node.json                      # TypeScript Node scripts config
│
├── vite.config.ts                          # Vite configuration
├── vitest.config.ts                        # Vitest (unit tests) configuration
├── playwright.config.ts                    # Playwright (E2E tests) configuration
│
├── package.json                            # Project dependencies & scripts
├── package-lock.json                       # Dependency lock file
├── LICENSE                                 # Project license
└── README.md                               # Project README                        # Project README
```
