# Vercel Deployment Guide

This guide provides instructions for deploying the Orthopedic Spine Web React application to Vercel.

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- GitHub repository access
- Production API endpoint URL

## Deployment Steps

### 1. Connect Repository to Vercel

1. Log in to your Vercel account
2. Click "Add New..." → "Project"
3. Import your GitHub repository: `NaranjoSolutions/orthspine-web-react`
4. Vercel will automatically detect the framework settings

### 2. Configure Build Settings

Vercel will use the settings from `vercel.json`:

- **Build Command**: `npm run build:production`
- **Output Directory**: `dist`
- **Install Command**: `npm ci`

These are automatically configured via `vercel.json` and don't need manual configuration.

### 3. Configure Environment Variables

Add the following environment variables in Vercel dashboard (Settings → Environment Variables):

#### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_BASE_API_URL` | Production API base URL | `https://api.yourproduction.com` |
| `VITE_API_VERSION` | API version path (optional) | `/api/v1` |

**Note**: Environment variables prefixed with `VITE_` are embedded at build time.

To add environment variables:
1. Go to your project in Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable for Production, Preview, and Development environments as needed

### 4. Deploy

#### Automatic Deployment (Recommended)

Vercel automatically deploys when you:
- Push to your `main` branch (production deployment)
- Create a pull request (preview deployment)
- Push to any branch (preview deployment)

#### Manual Deployment

Using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 5. Verify Deployment

After deployment, verify:

1. **Homepage loads correctly**: Visit your Vercel URL
2. **Routes work**: Test navigation (About, Services, Contact, etc.)
3. **Assets load**: Check images, fonts, and styles
4. **API connectivity**: Verify forms and data fetching work
5. **Admin panel**: Test authentication and admin routes
6. **Accessibility**: Test keyboard navigation and screen readers

## Project Configuration

### SPA Routing

The application uses React Router for client-side routing. The `vercel.json` configuration includes a rewrite rule that routes all requests to `index.html`, ensuring proper SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This prevents 404 errors when users refresh or directly access internal routes.

### Security Headers

The following security headers are configured in `vercel.json`:

- `X-Content-Type-Options: nosniff` - Prevents MIME type sniffing
- `X-Frame-Options: DENY` - Prevents clickjacking attacks
- `X-XSS-Protection: 1; mode=block` - Enables XSS filtering

### Asset Caching

Static assets in the `/assets/` directory are configured with aggressive caching:

```
Cache-Control: public, max-age=31536000, immutable
```

This improves performance for returning visitors.

## Environment-Specific Builds

The project supports multiple environment builds:

- **Development**: `npm run build:development`
- **Production**: `npm run build:production`

Vercel uses the production build by default.

## Build Optimization

### Code Splitting

The application uses code splitting with lazy-loaded routes:

```typescript
const HomePage = lazy(() => import('@/pages/home'));
const AboutPage = lazy(() => import('@/pages/about'));
// etc.
```

### Manual Chunks

Vendor libraries are split into separate chunks for better caching:

- `react-vendor`: React, React DOM, React Router
- `antd-vendor`: Ant Design and icons
- `redux-vendor`: Redux and React Redux

## Troubleshooting

### Build Failures

**Error: "Cannot find module 'vite'"**
- Solution: Ensure all dependencies are in `package.json` dependencies (not devDependencies for build tools)

**Error: TypeScript errors during build**
- Solution: Run `npm run type-check` locally to identify issues
- Ensure `tsconfig.json` is properly configured

### Environment Variable Issues

**Variables not available at runtime**
- Remember: `VITE_*` variables are embedded at build time
- Rebuild after changing environment variables in Vercel dashboard

### Routing Issues (404 on Refresh)

**Problem**: Direct access to routes returns 404
- Solution: Verify `vercel.json` rewrites configuration is present
- Check that `vercel.json` is committed to the repository

### API Connection Issues

**CORS errors**
- Ensure your backend API allows requests from your Vercel domain
- Configure CORS headers on your API server

**API calls failing**
- Verify `VITE_BASE_API_URL` is set correctly in Vercel
- Check that the API endpoint is accessible from the internet

## Performance Optimization

### Recommended Vercel Settings

1. **Enable Edge Caching**: Enabled by default for static assets
2. **Enable Compression**: Gzip/Brotli enabled automatically
3. **Image Optimization**: Consider using Vercel's Image Optimization API for images

### Bundle Size Warnings

The build currently shows warnings for chunks larger than 500 kB (particularly `antd-vendor.js` at ~1.1 MB). While this is acceptable for this application, consider:

- Using Ant Design's tree-shaking to reduce bundle size
- Lazy loading admin components separately from public pages
- Reviewing imports to ensure only needed components are included

## Monitoring and Analytics

### Built-in Vercel Analytics

Enable Vercel Analytics for:
- Page views
- Performance metrics (Web Vitals)
- Traffic sources

### Error Tracking

Consider integrating error tracking:
- Sentry
- LogRocket
- Rollbar

## Custom Domain

To use a custom domain:

1. Go to your project in Vercel dashboard
2. Navigate to Settings → Domains
3. Add your custom domain
4. Update DNS records as instructed by Vercel
5. Vercel automatically provisions SSL certificates

## Rollback

To rollback to a previous deployment:

1. Go to Deployments in Vercel dashboard
2. Find the working deployment
3. Click the three dots → "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router and Vercel](https://vercel.com/guides/using-react-router-with-vercel)

## Support

For issues specific to this application, please open an issue in the GitHub repository.
