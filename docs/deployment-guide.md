# Deployment Guide

## GitHub Pages Deployment

This project includes automated deployment to GitHub Pages for release branches.

### Overview

The GitHub Actions workflow automatically deploys the application to GitHub Pages whenever code is pushed to a branch matching the pattern `release/v*.*.*`.

### Workflow Details

**File**: `.github/workflows/deploy-on-release-branch.yml`

**Trigger**: Push events to branches matching `release/v*.*.*`

**Process**:
1. Checkout repository code
2. Setup Node.js v18 environment with npm caching
3. Install dependencies using `npm ci`
4. Build the application using `npm run build`
5. Deploy the `dist/` directory to the `gh-pages` branch

### How to Deploy

1. **Create a release branch**:
   ```bash
   git checkout -b release/v1.0.0
   ```

2. **Make your changes** (if needed) and commit them

3. **Push the branch**:
   ```bash
   git push origin release/v1.0.0
   ```

4. **Monitor the deployment**:
   - Go to the Actions tab in your GitHub repository
   - Find the "Deploy to GitHub Pages on Release Branch" workflow
   - Watch the deployment progress

5. **Access the deployed site**:
   - Once deployment completes, your site will be available at:
     `https://[username].github.io/[repository-name]/`

### GitHub Pages Configuration

To enable GitHub Pages:

1. Go to your repository Settings
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `root`
4. Save the configuration

### Workflow Permissions

The workflow uses the following permissions:
- `contents: read` - To checkout repository code
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For authentication

These are configured in the workflow file and use the built-in `GITHUB_TOKEN`.

### Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain name
2. Configure your DNS provider to point to GitHub Pages
3. In repository Settings > Pages, enter your custom domain

### Troubleshooting

**Workflow not triggering?**
- Ensure your branch name matches `release/v*.*.*` (e.g., `release/v1.0.0`)
- Check that the workflow file is in the default branch

**Build failing?**
- Check the Actions logs for detailed error messages
- Ensure all dependencies are listed in `package.json`
- Verify that `npm run build` works locally

**Deployment succeeding but site not updating?**
- Check GitHub Pages settings in repository Settings > Pages
- Ensure the source is set to the `gh-pages` branch
- Clear your browser cache

**Permission errors?**
- Ensure GitHub Actions has permission to write to the repository
- Check repository Settings > Actions > General > Workflow permissions

### Deployment Badge

Add this badge to your README to show deployment status:

```markdown
[![Deploy to GitHub Pages](https://github.com/NaranjoSolutions/orthspine-web-react/actions/workflows/deploy-on-release-branch.yml/badge.svg)](https://github.com/NaranjoSolutions/orthspine-web-react/actions/workflows/deploy-on-release-branch.yml)
```

### Additional Resources

- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Workflow Features

- **Concurrency Control**: Only one deployment runs at a time to prevent conflicts
- **Smart Caching**: npm packages are cached for faster builds
- **Commit Attribution**: Deployments are attributed to `github-actions[bot]`
- **Branch Tracking**: Deployment commits include the source branch name
