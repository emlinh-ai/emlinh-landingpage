# 🚀 Emlinh Landing Page - Deployment

## 📦 Build & Deploy Instructions

### Prerequisites
- Node.js 20+
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account

### Quick Deploy

#### Option 1: Using Scripts (Recommended)

```bash
# Deploy to staging
npm run deploy:staging

# Deploy to production
npm run deploy:production
```

#### Option 2: Manual Commands

```bash
# Build library
npm run build:lib

# Build project
npm run build

# Deploy to Cloudflare
wrangler pages deploy dist --project-name emlinh-landingpage
```

### 🌐 Deployment URLs

- **Staging**: https://emlinh-landingpage-staging.pages.dev
- **Production**: https://emlinh-landingpage.pages.dev

### 🔧 Configuration Files

- `wrangler.toml` - Cloudflare Workers configuration
- `_headers` - HTTP headers for security & caching
- `_redirects` - SPA routing configuration

### 📊 Build Output

```
dist/
├── index.html              0.46 kB │ gzip:   0.30 kB
├── assets/
│   ├── index-B0IhKpSY.css  35.27 kB │ gzip:   6.17 kB
│   └── index-QA1x4WMB.js   1.67 MB  │ gzip: 486.96 kB
```

### 🔄 CI/CD

GitHub Actions automatically deploy on:
- Push to `main` branch → Production
- Pull requests → Preview deployments

### 🐛 Troubleshooting

1. **Build fails**: Clear cache and rebuild
   ```bash
   npm cache clean --force
   rm -rf node_modules dist
   npm install
   npm run build
   ```

2. **Deploy fails**: Check Wrangler authentication
   ```bash
   wrangler whoami
   wrangler login
   ```

3. **VRM Library errors**: Rebuild library first
   ```bash
   cd libs/vrm-character-controller
   npm run build
   cd ../..
   npm run build
   ```

### 📝 Notes

- The VRM library is built locally and included in the bundle
- Large assets (VRM models, animations) are cached for 1 day
- Static assets are cached for 1 year
- Build size warning is expected due to 3D libraries
