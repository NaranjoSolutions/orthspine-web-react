# Vercel Deployment Quick Start

A quick reference guide for deploying this project to Vercel.

## Prerequisites

- Vercel account
- GitHub repository access
- Production API endpoint URL

## 5-Minute Deployment

### 1. Connect to Vercel (2 min)

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New..."** → **"Project"**
3. Import `NaranjoSolutions/orthspine-web-react`
4. Vercel auto-detects settings from `vercel.json` ✅

### 2. Set Environment Variables (2 min)

In Vercel Dashboard → Settings → Environment Variables:

```bash
VITE_BASE_API_URL=https://your-api-url.com
VITE_API_VERSION=/api/v1
```

Add for: **Production**, **Preview**, **Development**

### 3. Deploy (1 min)

Click **"Deploy"** → Vercel builds and deploys automatically!

## Post-Deployment Verification

Visit your Vercel URL and test:

- [ ] Homepage loads
- [ ] Navigate to /about, /services, /contact
- [ ] Refresh on a route (should not 404)
- [ ] Submit contact form
- [ ] Login to admin (if applicable)

## What's Configured

✅ Build command: `npm run build:production`  
✅ Output directory: `dist`  
✅ SPA routing: All routes → `/index.html`  
✅ Security headers: Content-Type, Frame, XSS protection  
✅ Asset caching: 1 year for `/assets/*`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check environment variables are set |
| 404 on refresh | Verify `vercel.json` is committed |
| API errors | Check CORS on backend, verify `VITE_BASE_API_URL` |
| Blank page | Check browser console for errors |

## Need More Details?

See full documentation:
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Complete guide
- [VERCEL_READINESS_ASSESSMENT.md](./VERCEL_READINESS_ASSESSMENT.md) - Technical review

## Support

Issues? Check [Vercel Docs](https://vercel.com/docs) or open an issue in this repo.
