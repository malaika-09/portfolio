# GitHub Deployment Script - API-based (no Git required)
# This script creates a GitHub repo and uploads your project

$ErrorActionPreference = "Stop"

# Configuration
$GITHUB_TOKEN = "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github"
$GITHUB_USERNAME = "mbj8467-a1ly"
$REPO_NAME = "robotics-portfolio"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Deployment via API" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create GitHub Repository
Write-Host "[1/3] Creating GitHub repository..." -ForegroundColor Yellow

$headers = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "PowerShell"
}

$repoData = @{
    name = $REPO_NAME
    description = "Professional Robotics Portfolio Platform - Built with Next.js 14"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $repoData -ContentType "application/json"
    Write-Host "✓ Repository created: $($response.html_url)" -ForegroundColor Green
}
catch {
    if ($_.Exception.Response.StatusCode -eq 422) {
        Write-Host "✓ Repository already exists" -ForegroundColor Yellow
    }
    else {
        Write-Host "✗ Failed to create repository: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "[2/3] Now you need to push code using Git..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Please wait for Git installation to complete, then run these commands:" -ForegroundColor Cyan
Write-Host ""
Write-Host "cd C:\Users\LEXI\OneDrive\Desktop\MBJ\robotics-portfolio" -ForegroundColor White
Write-Host "git config --global user.name `"$GITHUB_USERNAME`"" -ForegroundColor White
Write-Host "git config --global user.email `"your-email@example.com`"" -ForegroundColor White
Write-Host "git init" -ForegroundColor White
Write-Host "git add ." -ForegroundColor White
Write-Host "git commit -m `"Initial commit: Robotics Portfolio Platform`"" -ForegroundColor White
Write-Host "git branch -M main" -ForegroundColor White
Write-Host "git remote add origin https://${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${REPO_NAME}.git" -ForegroundColor White
Write-Host "git push -u origin main" -ForegroundColor White
Write-Host ""

Write-Host "[3/3] After pushing, connect to Vercel:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor White
Write-Host "2. Click 'Import Git Repository'" -ForegroundColor White
Write-Host "3. Select '$REPO_NAME'" -ForegroundColor White
Write-Host "4. Click 'Deploy'" -ForegroundColor White
Write-Host ""
Write-Host "✓ GitHub repository ready!" -ForegroundColor Green
$repoUrl = "https://github.com/$GITHUB_USERNAME/$REPO_NAME"
Write-Host "Repository URL: $repoUrl" -ForegroundColor Cyan
