Write-Host "=== Testing Week 06 API on Render ===" -ForegroundColor Cyan
Write-Host "`n"

# Test 1: Root endpoint
Write-Host "1. Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $root = Invoke-RestMethod -Uri "https://w03-project-project-2-api.onrender.com/" -Method Get
    Write-Host "   ✅ Root: 200 OK" -ForegroundColor Green
    Write-Host "   Message: $($root.message)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Root: Failed - $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: All 4 Collections
Write-Host "`n2. Testing All 4 Collections..." -ForegroundColor Yellow

$collections = @(
    @{Name="Books"; Endpoint="/api/books"},
    @{Name="Authors"; Endpoint="/api/authors"},
    @{Name="Categories"; Endpoint="/api/categories"},
    @{Name="Publishers"; Endpoint="/api/publishers"}
)

foreach ($col in $collections) {
    try {
        $response = Invoke-RestMethod -Uri "https://w03-project-project-2-api.onrender.com$($col.Endpoint)" -Method Get
        Write-Host "   ✅ $($col.Name): 200 OK" -ForegroundColor Green
    } catch {
        $statusCode = $_.Exception.Response.StatusCode.Value__
        Write-Host "   ❌ $($col.Name): $statusCode" -ForegroundColor Red
    }
}

# Test 3: Protected Routes (should return 401)
Write-Host "`n3. Testing Protected Routes (should return 401)..." -ForegroundColor Yellow

$testBook = @{
    title = "Protected Test Book"
    author = "Test Author"
    year = 2023
    price = 29.99
    genre = "Technology"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://w03-project-project-2-api.onrender.com/api/books" -Method Post -Body $testBook -ContentType "application/json" -ErrorAction Stop
    Write-Host "   ❌ POST /api/books: Expected 401 but got $($response.StatusCode)" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "   ✅ POST /api/books: Returns 401 (Unauthorized) as expected" -ForegroundColor Green
    } else {
        Write-Host "   ❌ POST /api/books: Got $($_.Exception.Response.StatusCode) instead of 401" -ForegroundColor Red
    }
}

# Test 4: OAuth Login
Write-Host "`n4. Testing OAuth Login..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://w03-project-project-2-api.onrender.com/auth/google" -Method Get -MaximumRedirection 0 -ErrorAction Stop
    if ($response.StatusCode -eq 302) {
        Write-Host "   ✅ /auth/google: Redirects to Google (302)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ /auth/google: Expected 302, got $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    if ($_.Exception.Response.StatusCode.Value__ -eq 302) {
        Write-Host "   ✅ /auth/google: Redirects to Google (302)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ /auth/google: Error - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n" + "="*50
Write-Host "TEST COMPLETE" -ForegroundColor Cyan
Write-Host "="*50
Write-Host "`nFor video, show:" -ForegroundColor Gray
Write-Host "1. Route files with isAuthenticated middleware" -ForegroundColor Gray
Write-Host "2. These tests passing on Render" -ForegroundColor Gray
Write-Host "3. 401 errors for protected routes" -ForegroundColor Gray
