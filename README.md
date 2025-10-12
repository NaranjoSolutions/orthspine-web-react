# clinic-ui

A modern React web application for Orthopedic Spine, a physiotherapy clinic. This app provides general information, client testimonials, services, and an easy way for clients to contact the clinic owner.

## Features

- Responsive, user-friendly interface
- Service listings and detailed descriptions
- Customer testimonials
- Contact form for inquiries and appointments
- Location and schedule information
- Built with Vite, React, and TypeScript
- CI/CD pipeline for automated deployment to AWS (S3/CloudFront)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run localdev
```

The app will be available at `http://localhost:5173` by default.

### Authentication Feature Validation

To validate the authentication implementation:

```bash
node scripts/validate-auth.cjs
```

This script checks that all authentication components are properly in place. For detailed documentation about the authentication system, see [AUTHENTICATION_CHECK.md](./AUTHENTICATION_CHECK.md).

### Code Quality

Run linter:
```bash
npm run lint
```

Run type checking:
```bash
npm run type-check
```

## Deployment

This project is set up for CI/CD. Built files are automatically deployed to AWS S3 and served via CloudFront.

### Optional: Set Up a Custom Domain

- Map your domain to the CloudFront distribution for a branded URL.

## Project Structure

- `src/` — Main source code (components, pages, hooks, store, assets)
- `public/` — Static assets
- `build/` — Production build output
- `nginx/` — Nginx configuration for deployment

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

For questions or support, please contact the repository owner.

@workspace genera un archivo README.md en donde se explique lo que este proyecto está haciendo para dar una introducción de uso y estructura, utiliza únicamente la carpeta Proyecto

Shields.io --> badge in .md
