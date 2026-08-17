# ============================================
# QUICK PUSH SCRIPT - For Future Updates
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Push Updates to GitHub + Vercel" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $null = & git --version 2>&1
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    exit 1
}

# Check if in git repository
if (-not (Test-Path ".git")) {
    Write-Host "✗ Not a git repository!" -ForegroundColor Red
    Write-Host "Run 'deploy-to-github.ps1' first for initial setup." -ForegroundColor Yellow
    exit 1
}

# Check for changes
Write-Host "Checking for changes..." -ForegroundColor Cyan
$status = git status --porcelain

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✓ No changes to commit" -ForegroundColor Green
    Write-Host ""
    Write-Host "Everything is already up to date!" -ForegroundColor Cyan
    exit 0
}

Write-Host "✓ Changes detected" -ForegroundColor Green
Write-Host ""

# Show changed files
Write-Host "Modified files:" -ForegroundColor Yellow
git status --short
Write-Host ""

# Get commit message
$defaultMessage = "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
$commitMessage = Read-Host "Enter commit message [$defaultMessage]"
if ([string]::IsNullOrWhiteSpace($commitMessage)) {
    $commitMessage = $defaultMessage
}

Write-Host ""
Write-Host "Proceeding with:" -ForegroundColor Yellow
Write-Host "  Message: $commitMessage" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "Push to GitHub? (yes/no)"
if ($confirm -ne "yes" -and $confirm -ne "y") {
    Write-Host "Push cancelled." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Pushing updates..." -ForegroundColor Green
Write-Host ""

# Add all changes
Write-Host "[1/3] Adding changes..." -ForegroundColor Cyan
git add .
Write-Host "✓ Changes staged" -ForegroundColor Green

# Commit
Write-Host ""
Write-Host "[2/3] Creating commit..." -ForegroundColor Cyan
git commit -m "$commitMessage"
Write-Host "✓ Commit created" -ForegroundColor Green

# Push
Write-Host ""
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Cyan
git push

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully pushed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ UPDATE DEPLOYED!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your changes are now on GitHub!" -ForegroundColor Cyan
    Write-Host "Vercel will automatically deploy in ~2 minutes" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Check deployment status at: https://vercel.com/dashboard" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "✗ Push failed!" -ForegroundColor Red
    Write-Host "Check your internet connection and GitHub credentials" -ForegroundColor Yellow
    exit 1
}
