@echo off
REM Deploy to emlinh.com production

echo 🚀 Deploying to emlinh.com...

REM Build VRM library
echo 📦 Building VRM library...
cd libs\vrm-character-controller
call npm ci --legacy-peer-deps
call npm run build
cd ..\..

REM Build the project
echo 🔨 Building the project...
call npm run build

REM Deploy to Cloudflare Pages with custom domain
echo 🌐 Deploying to production...
call wrangler pages deploy dist --project-name emlinh-landingpage --commit-dirty=true

echo.
echo ✅ Deployment completed!
echo 🌐 Your site will be available at:
echo    - https://emlinh.com
echo    - https://www.emlinh.com
echo    - https://emlinh-landingpage.pages.dev
echo.
echo ⚠️  Make sure DNS is configured:
echo    CNAME emlinh.com -> emlinh-landingpage.pages.dev
echo    CNAME www.emlinh.com -> emlinh-landingpage.pages.dev
echo.
pause
