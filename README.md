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

## Deployment

This project supports multiple deployment methods:

### Vercel (Recommended)

The easiest and fastest way to deploy this application:

1. **Quick Deploy**: Connect your GitHub repository to Vercel
2. **Auto-Deploy**: Automatic deployments on every push to main
3. **Preview Deployments**: Each PR gets a unique preview URL
4. **Zero Config**: Settings auto-detected from `vercel.json`

**Documentation**:
- [Quick Start Guide](./docs/VERCEL_QUICK_START.md) - Deploy in 5 minutes
- [Full Deployment Guide](./docs/VERCEL_DEPLOYMENT.md) - Complete instructions
- [Readiness Assessment](./docs/VERCEL_READINESS_ASSESSMENT.md) - Technical review

**Deploy to Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/NaranjoSolutions/orthspine-web-react)

### GitHub Pages (Automated)

The application automatically deploys to GitHub Pages when you push to release branches:

1. **Trigger**: Push to any branch matching `release/v*.*.*` (e.g., `release/v1.0.0`)
2. **Process**: 
   - GitHub Actions workflow builds the application
   - Deploys to the `gh-pages` branch
   - Available at: `https://[username].github.io/[repository-name]/`
3. **Status**: Check the Actions tab for deployment status

[![Deploy to GitHub Pages](https://github.com/NaranjoSolutions/orthspine-web-react/actions/workflows/deploy-on-release-branch.yml/badge.svg)](https://github.com/NaranjoSolutions/orthspine-web-react/actions/workflows/deploy-on-release-branch.yml)

### AWS S3/CloudFront

Built files can also be deployed to AWS S3 and served via CloudFront.

### Environment Variables

All deployment methods require the following environment variables:

- `VITE_BASE_API_URL`: Your production API endpoint
- `VITE_API_VERSION`: API version path (defaults to `/api/v1`)

See `.env.production.example` for a template.

### Custom Domain

- **Vercel**: Automatic SSL, configure in project settings
- **GitHub Pages**: Configure in repository Settings > Pages
- **AWS**: Map domain to CloudFront distribution

## Project Structure

- `src/` — Main source code (components, pages, hooks, store, assets)
- `public/` — Static assets
- `dist/` — Production build output (created during build)
- `nginx/` — Nginx configuration for deployment
- `.github/workflows/` — GitHub Actions workflows for CI/CD

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
