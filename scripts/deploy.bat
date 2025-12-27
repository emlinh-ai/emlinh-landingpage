@echo off
REM Deploy script for Cloudflare Pages on Windows
REM Usage: deploy.bat [staging|production]

setlocal enabledelayedexpansion

set ENVIRONMENT=%1
if "%ENVIRONMENT%"=="" set ENVIRONMENT=staging
set PROJECT_NAME=emlinh-landingpage

echo 🚀 Deploying to %ENVIRONMENT%...

REM Check if wrangler is installed
where wrangler >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Wrangler CLI not found. Installing...
    npm install -g wrangler
)

REM Build VRM library
echo 📦 Building VRM library...
cd libs\vrm-character-controller
call npm ci --legacy-peer-deps
call npm run build
cd ..\..

REM Build the project
echo 🔨 Building the project...
call npm run build

REM Deploy to Cloudflare Pages
if "%ENVIRONMENT%"=="production" (
    echo 🌐 Deploying to production...
    call wrangler pages deploy dist --project-name %PROJECT_NAME%
) else (
    echo 👀 Deploying to staging...
    call wrangler pages deploy dist --project-name %PROJECT_NAME%-staging
)

echo ✅ Deployment completed!
pause
