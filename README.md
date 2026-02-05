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

### Optional: Set Up a Custom Domain

- For GitHub Pages: Configure a custom domain in repository Settings > Pages
- For AWS: Map your domain to the CloudFront distribution for a branded URL

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
