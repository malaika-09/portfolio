# ============================================
# AUTOMATED GITHUB + VERCEL DEPLOYMENT SCRIPT
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Robotics Portfolio - GitHub Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = & git --version 2>&1
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git first: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installation, restart PowerShell and run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Prompt for GitHub credentials
Write-Host "GitHub Configuration" -ForegroundColor Yellow
Write-Host "--------------------" -ForegroundColor Yellow
$githubUsername = Read-Host "Enter your GitHub username [mbj8467-a1ly]"
if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    $githubUsername = "mbj8467-a1ly"
}

$githubEmail = Read-Host "Enter your GitHub email"
if ([string]::IsNullOrWhiteSpace($githubEmail)) {
    Write-Host "✗ Email is required!" -ForegroundColor Red
    exit 1
}

$repoName = Read-Host "Enter repository name [robotics-portfolio]"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "robotics-portfolio"
}

Write-Host ""
Write-Host "Important: You need a GitHub Personal Access Token for authentication" -ForegroundColor Yellow
Write-Host "To create one:" -ForegroundColor Cyan
Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "  2. Click 'Generate new token (classic)'" -ForegroundColor Cyan
Write-Host "  3. Select 'repo' scope" -ForegroundColor Cyan
Write-Host "  4. Click 'Generate token'" -ForegroundColor Cyan
Write-Host "  5. Copy the token (you'll only see it once!)" -ForegroundColor Cyan
Write-Host ""

$githubToken = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlainText = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($githubToken))

if ([string]::IsNullOrWhiteSpace($tokenPlainText)) {
    Write-Host "✗ Token is required!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Configuration Summary:" -ForegroundColor Yellow
Write-Host "  Username: $githubUsername" -ForegroundColor Cyan
Write-Host "  Email: $githubEmail" -ForegroundColor Cyan
Write-Host "  Repository: $repoName" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Proceed with deployment? (yes/no)"
if ($confirm -ne "yes" -and $confirm -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Starting deployment..." -ForegroundColor Green
Write-Host ""

# Step 1: Configure Git
Write-Host "[1/6] Configuring Git..." -ForegroundColor Cyan
git config --global user.name "$githubUsername"
git config --global user.email "$githubEmail"
Write-Host "✓ Git configured" -ForegroundColor Green

# Step 2: Initialize repository (if not already)
Write-Host ""
Write-Host "[2/6] Initializing Git repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Step 3: Add all files
Write-Host ""
Write-Host "[3/6] Adding files to Git..." -ForegroundColor Cyan
git add .
Write-Host "✓ Files added" -ForegroundColor Green

# Step 4: Commit
Write-Host ""
Write-Host "[4/6] Creating commit..." -ForegroundColor Cyan
$commitMessage = "Deploy: Robotics Portfolio with multiple images, code snippets, and technical stack"
git commit -m "$commitMessage"
Write-Host "✓ Commit created" -ForegroundColor Green

# Step 5: Add remote (if not exists)
Write-Host ""
Write-Host "[5/6] Configuring remote repository..." -ForegroundColor Cyan
$remoteUrl = "https://${tokenPlainText}@github.com/${githubUsername}/${repoName}.git"
try {
    git remote add origin $remoteUrl 2>$null
    Write-Host "✓ Remote 'origin' added" -ForegroundColor Green
} catch {
    Write-Host "! Remote 'origin' already exists, updating URL..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
    Write-Host "✓ Remote URL updated" -ForegroundColor Green
}

# Step 6: Push to GitHub
Write-Host ""
Write-Host "[6/6] Pushing to GitHub..." -ForegroundColor Cyan
git branch -M main
git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "✗ Push failed!" -ForegroundColor Red
    Write-Host "This might be because:" -ForegroundColor Yellow
    Write-Host "  1. Repository doesn't exist on GitHub (create it first at: https://github.com/new)" -ForegroundColor Yellow
    Write-Host "  2. Token is invalid or doesn't have 'repo' permissions" -ForegroundColor Yellow
    Write-Host "  3. Network issues" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ✓ DEPLOYMENT SUCCESSFUL!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your code is now on GitHub!" -ForegroundColor Cyan
Write-Host "Repository URL: https://github.com/$githubUsername/$repoName" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps - Vercel Setup:" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host "1. Go to: https://vercel.com/new" -ForegroundColor Cyan
Write-Host "2. Click 'Import Git Repository'" -ForegroundColor Cyan
Write-Host "3. Select your repository: $repoName" -ForegroundColor Cyan
Write-Host "4. Add Environment Variables:" -ForegroundColor Cyan
Write-Host "     NODE_ENV=production" -ForegroundColor Gray
Write-Host "     NEXT_PUBLIC_APP_URL=https://your-project.vercel.app" -ForegroundColor Gray
Write-Host "     NEXT_PUBLIC_APP_NAME=Robotics Portfolio" -ForegroundColor Gray
Write-Host "     SESSION_SECRET=[Generate random 32-char string]" -ForegroundColor Gray
Write-Host "     ADMIN_EMAIL=admin@yourdomain.com" -ForegroundColor Gray
Write-Host "     ADMIN_PASSWORD=[Your secure password]" -ForegroundColor Gray
Write-Host "5. Click 'Deploy'" -ForegroundColor Cyan
Write-Host ""
Write-Host "From now on, every 'git push' will auto-deploy to Vercel! 🚀" -ForegroundColor Green
Write-Host ""

# Clear token from memory
$tokenPlainText = $null
