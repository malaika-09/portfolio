# GitHub Repository Creation Script
$ErrorActionPreference = "Stop"

# Configuration
$GITHUB_TOKEN = "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github"
$GITHUB_USERNAME = "mbj8467-a1ly"
$REPO_NAME = "robotics-portfolio"

Write-Host "Creating GitHub repository..." -ForegroundColor Cyan

$headers = @{
    "Authorization" = "token $GITHUB_TOKEN"
    "Accept" = "application/vnd.github.v3+json"
    "User-Agent" = "PowerShell"
}

$repoData = @{
    name = $REPO_NAME
    description = "Professional Robotics Portfolio Platform"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $repoData -ContentType "application/json"
    Write-Host "Repository created successfully!" -ForegroundColor Green
    Write-Host "URL: $($response.html_url)" -ForegroundColor White
}
catch {
    if ($_.Exception.Message -like "*422*") {
        Write-Host "Repository already exists - continuing..." -ForegroundColor Yellow
    }
    else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Repository ready at: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor Green
