Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  Instagram Followers Tracker - Starting" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

taskkill /F /IM node.exe 2>&1 | Out-Null
Start-Sleep -Seconds 2

Write-Host "Starting Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\SDE\Projects\Followers Tracker\backend'; Write-Host 'BACKEND SERVER' -ForegroundColor Green; npm run dev"

Start-Sleep -Seconds 5

Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'd:\SDE\Projects\Followers Tracker\frontend'; Write-Host 'FRONTEND SERVER' -ForegroundColor Blue; npm run dev"

Write-Host ""
Write-Host "=================================================" -ForegroundColor Green
Write-Host "  Servers are starting!" -ForegroundColor Green  
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Wait 20 seconds then open: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

Start-Sleep -Seconds 20
Start-Process "http://localhost:3000"
