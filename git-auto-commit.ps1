# Git Auto-Commit and Push Script
# Run this script to automatically commit and push all changes to GitHub

$ErrorActionPreference = "Stop"

Write-Host "Checking git status..." -ForegroundColor Cyan
$status = git status --porcelain

if (-not $status) {
    Write-Host "No changes to commit." -ForegroundColor Green
    exit 0
}

Write-Host "Changes detected:" -ForegroundColor Yellow
git status

Write-Host "`nAdding all changes..." -ForegroundColor Cyan
git add -A

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-commit: $timestamp"

Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin master

Write-Host "`nSuccessfully committed and pushed changes to GitHub!" -ForegroundColor Green
