# Backend Development Server Startup Script
$env:PORT = "3001"
$env:NODE_ENV = "development"

# Set placeholder values if .env doesn't exist
if (-not (Test-Path .env)) {
    Write-Host "Warning: .env file not found. Using placeholder values." -ForegroundColor Yellow
    $env:SUPABASE_URL = "https://placeholder.supabase.co"
    $env:SUPABASE_ANON_KEY = "placeholder"
    $env:SUPABASE_SERVICE_ROLE_KEY = "placeholder"
    $env:JWT_SECRET = "placeholder-secret-key-min-32-characters-long-for-development"
    $env:STRIPE_SECRET_KEY = "sk_test_placeholder"
    $env:STRIPE_WEBHOOK_SECRET = "whsec_placeholder"
}

Write-Host "Starting backend development server on port 3001..." -ForegroundColor Green
npm run dev
