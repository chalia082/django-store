# GitHub Pages Deployment Guide

This guide explains how to deploy the frontend of the Django Store project to GitHub Pages.

## Prerequisites

1. Your repository must be public (or you have GitHub Pro for private repos)
2. GitHub Pages must be enabled in your repository settings
3. Your backend API must be deployed and accessible via HTTPS

## Setup Instructions

### 1. Repository Settings

1. Go to your repository on GitHub: `https://github.com/chalia082/django-store`
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### 2. Environment Variables

Update the production environment variables in `frontend/.env.production`:

```bash
# Your deployed backend URL (replace with actual URL)
VITE_API_BASE_URL=https://your-backend-domain.com

# Your Stripe LIVE publishable key (for production)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY_HERE

# Environment
VITE_NODE_ENV=production
```

### 3. Backend CORS Configuration

Make sure your Django backend allows requests from your GitHub Pages domain. In your Django `settings.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://chalia082.github.io",
    # ... other origins
]

# Or for development/testing (less secure):
CORS_ALLOW_ALL_ORIGINS = True
```

## Deployment Methods

### Method 1: Automatic Deployment (Recommended)

The repository is configured with GitHub Actions for automatic deployment:

1. **Push to main branch**: Any changes to the `frontend/` directory in the main branch will trigger automatic deployment
2. **Manual trigger**: Go to **Actions** tab → **Deploy Frontend to GitHub Pages** → **Run workflow**

### Method 2: Manual Deployment

If you prefer to deploy manually from your local machine:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build:prod

# Deploy to GitHub Pages
npm run deploy
```

## Accessing Your Deployed Site

After successful deployment, your site will be available at:
`https://chalia082.github.io/django-store/`

## Important Notes

### 1. Backend Requirements

- Your Django backend must be deployed and accessible via HTTPS
- CORS must be properly configured to allow requests from your GitHub Pages domain
- API endpoints must return proper JSON responses

### 2. Environment Configuration

- **Development**: Uses `VITE_API_BASE_URL=http://127.0.0.1:8000`
- **Production**: Uses the URL specified in `.env.production`

### 3. Routing

The app uses HashRouter for compatibility with GitHub Pages static hosting. URLs will have a `#` in them (e.g., `https://chalia082.github.io/django-store/#/products`).

### 4. Stripe Configuration

- **Development**: Use Stripe test keys (`pk_test_...`)
- **Production**: Use Stripe live keys (`pk_live_...`)

## Troubleshooting

### Common Issues

1. **404 Errors**: GitHub Pages serves static files. The `404.html` file handles SPA routing.

2. **CORS Errors**: Ensure your backend's CORS settings allow requests from `https://chalia082.github.io`

3. **API Connection Issues**: Verify your `VITE_API_BASE_URL` in `.env.production` is correct and accessible

4. **Build Failures**: Check the Actions tab for detailed error logs

### Debugging

1. **Check build logs**: Go to **Actions** tab → latest workflow run
2. **Test locally**: Run `npm run build:prod && npm run preview` to test production build
3. **Check browser console**: Look for CORS or API errors in browser developer tools

## Updating the Deployment

To update your deployed site:

1. Make changes to your frontend code
2. Commit and push to the main branch
3. GitHub Actions will automatically rebuild and redeploy

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to `frontend/public/` with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain
