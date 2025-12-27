# Deployment Guide

This guide explains how to deploy the Emlinh landing page to Cloudflare Pages.

## Prerequisites

1. **Cloudflare Account**
   - Sign up at https://cloudflare.com
   - Get your Account ID from dashboard

2. **Wrangler CLI**
   ```bash
   npm install -g wrangler
   wrangler login
   ```

3. **Domain (Optional)**
   - Custom domain for production
   - Configure DNS to point to Cloudflare

## Environment Setup

### 1. Cloudflare Secrets

Add these secrets to your GitHub repository:

1. Go to Settings → Secrets and variables → Actions
2. Add the following secrets:

   - `CLOUDFLARE_API_TOKEN`: API token with Pages permissions
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### 2. Local Development

Install dependencies:
```bash
npm install
```

Build the project:
```bash
npm run build
```

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

Automatic deployment on push to main branch:

1. Push code to GitHub
2. GitHub Actions will automatically:
   - Build the VRM library
   - Build the main project
   - Deploy to Cloudflare Pages
   - Create preview deployments for PRs

### Method 2: Local Deploy with Wrangler

#### Staging Deployment
```bash
npm run deploy:staging
```

#### Production Deployment
```bash
npm run deploy:production
```

#### Direct Wrangler Command
```bash
# Build first
npm run build

# Deploy
npm run deploy:cf
```

### Method 3: Manual Upload

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist` folder via Cloudflare Dashboard:
   - Go to Pages → Create application
   - Upload assets

## Configuration Files

### `wrangler.toml`
- Configuration for Cloudflare Workers
- Environment settings for staging/production
- Custom domain configuration

### `_headers`
- Security headers
- Cache control rules
- Asset optimization

### `_redirects`
- Handle client-side routing
- SPA fallback to index.html

## Optimization

### Build Optimization

The project includes several optimizations:

1. **Code Splitting**
   - Large chunks are split automatically
   - Dynamic imports for heavy modules

2. **Asset Optimization**
   - CSS/JS minification
   - Image optimization
   - Gzip compression

3. **Caching Strategy**
   - Static assets cached for 1 year
   - HTML files revalidated on each request
   - VRM/animation files cached for 1 day

### Performance Tips

1. **VRM Models**
   - Keep models under 10MB
   - Use compressed textures
   - Optimize polygon count

2. **Animations**
   - Use VRMA format when possible
   - Compress animation files
   - Preload only essential animations

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache
   npm cache clean --force
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **VRM Library Errors**
   ```bash
   # Rebuild library
   cd libs/vrm-character-controller
   npm run build
   cd ../..
   npm run build
   ```

3. **Deployment Failures**
   - Check Cloudflare token permissions
   - Verify account ID is correct
   - Check build logs for errors

### Debug Mode

Enable debug logging:
```bash
wrangler pages deploy dist --project-name emlinh-landingpage --compatibility-date=2024-01-01 --verbose
```

## Environment Variables

Create `.env.production` for production:
```env
VITE_API_URL=https://api.emlinh.com
VITE_WS_URL=wss://api.emlinh.com/ws
VITE_ENVIRONMENT=production
```

Create `.env.staging` for staging:
```env
VITE_API_URL=https://staging-api.emlinh.com
VITE_WS_URL=wss://staging-api.emlinh.com/ws
VITE_ENVIRONMENT=staging
```

## Custom Domain Setup

1. **Add Domain in Cloudflare**
   - Go to Pages → Custom domains
   - Add your domain (e.g., emlinh.com)

2. **Update DNS**
   - Cloudflare will provide CNAME records
   - Add them to your DNS provider

3. **SSL Certificate**
   - Automatically provisioned by Cloudflare
   - Redirect HTTP to HTTPS

## Monitoring

### Analytics

1. **Cloudflare Analytics**
   - Page views, unique visitors
   - Bandwidth usage
   - Cache hit ratio

2. **Web Vitals**
   - Core Web Vitals monitoring
   - Performance scores
   - Optimization suggestions

### Logs

View deployment logs:
```bash
wrangler pages deployment list --project-name emlinh-landingpage
wrangler pages deployment tail --project-name emlinh-landingpage
```

## Rollback

### Quick Rollback

1. Via Cloudflare Dashboard:
   - Go to Pages → Deployments
   - Find previous deployment
   - Click "Rollback"

2. Via CLI:
   ```bash
   # List deployments
   wrangler pages deployment list --project-name emlinh-landingpage
   
   # Rollback to specific deployment
   wrangler pages deployment rollback <deployment-id>
   ```

### Emergency Rollback

If something goes wrong:
1. Push a revert commit to GitHub
2. GitHub Actions will auto-deploy the fix
3. Or manually deploy previous working version
