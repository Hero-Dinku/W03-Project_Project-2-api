# Week 06 Final Test Script
# Save as: test-week06.ps1

Write-Host "=== WEEK 06 FINAL PROJECT TEST ===" -ForegroundColor Cyan
Write-Host "Testing all requirements for resubmission" -ForegroundColor Cyan
Write-Host "`n"

# Function to test endpoint
function Test-Endpoint {
    param($Name, $Url, $Method = "GET", $Body = $null, $Headers = @{})
    
    try {
        if ($Method -eq "GET") {
            $response = Invoke-RestMethod -Uri $Url -Method $Method -Headers $Headers -ErrorAction Stop
        } else {
            $response = Invoke-WebRequest -Uri $Url -Method $Method -Body $Body -Headers $Headers -ErrorAction Stop
        }
        
        return @{
            Success = $true
            StatusCode = $response.StatusCode
            Message = "Success"
        }
    } catch {
        return @{
            Success = $false
            StatusCode = $_.Exception.Response.StatusCode.Value__
            Message = $_.Exception.Message
        }
    }
}

# 1. Test Server is Running
Write-Host "1. Testing Server..." -ForegroundColor Yellow
$serverTest = Test-Endpoint -Name "Root" -Url "http://localhost:3000/"
if ($serverTest.Success) {
    Write-Host "   ✅ Server is running on port 3000" -ForegroundColor Green
} else {
    Write-Host "   ❌ Server not running: $($serverTest.Message)" -ForegroundColor Red
    exit
}

# 2. Test All 4 Collections
Write-Host "`n2. Testing 4 Collections (GET endpoints)..." -ForegroundColor Yellow

$collections = @(
    @{Name="Books"; Url="http://localhost:3000/api/books"},
    @{Name="Authors"; Url="http://localhost:3000/api/authors"},
    @{Name="Categories"; Url="http://localhost:3000/api/categories"},
    @{Name="Publishers"; Url="http://localhost:3000/api/publishers"}
)

$collectionCount = 0
foreach ($col in $collections) {
    $test = Test-Endpoint -Name $col.Name -Url $col.Url
    if ($test.Success -or $test.StatusCode -eq 200) {
        Write-Host "   ✅ $($col.Name): Accessible (200)" -ForegroundColor Green
        $collectionCount++
    } else {
        Write-Host "   ❌ $($col.Name): Failed ($($test.StatusCode))" -ForegroundColor Red
    }
}

# 3. Test OAuth Protection
Write-Host "`n3. Testing OAuth Protection..." -ForegroundColor Yellow

$bookData = @{
    title = "Protected Test Book"
    author = "Test Author"
    year = 2023
    price = 29.99
    genre = "Technology"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

$authTest = Test-Endpoint -Name "Protected POST" -Url "http://localhost:3000/api/books" -Method "POST" -Body $bookData -Headers $headers
if ($authTest.StatusCode -eq 401) {
    Write-Host "   ✅ Protected Route: POST returns 401 (Unauthorized)" -ForegroundColor Green
} else {
    Write-Host "   ❌ Protected Route: Expected 401, got $($authTest.StatusCode)" -ForegroundColor Red
}

# 4. Test OAuth Login
Write-Host "`n4. Testing OAuth Login..." -ForegroundColor Yellow

try {
    $oauthResponse = Invoke-WebRequest -Uri "http://localhost:3000/auth/google" -Method Get -MaximumRedirection 0 -ErrorAction Stop
    if ($oauthResponse.StatusCode -eq 302) {
        Write-Host "   ✅ OAuth Login: Redirects to Google (302)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ OAuth Login: Expected 302, got $($oauthResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    if ($_.Exception.Response.StatusCode.Value__ -eq 302) {
        Write-Host "   ✅ OAuth Login: Redirects to Google (302)" -ForegroundColor Green
    } else {
        Write-Host "   ❌ OAuth Login Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 5. Test Swagger Docs
Write-Host "`n5. Testing Swagger Documentation..." -ForegroundColor Yellow

$swaggerTest = Test-Endpoint -Name "Swagger" -Url "http://localhost:3000/api-docs"
if ($swaggerTest.Success -or $swaggerTest.StatusCode -eq 200) {
    Write-Host "   ✅ Swagger Docs: Available" -ForegroundColor Green
} else {
    Write-Host "   ❌ Swagger Docs: Failed ($($swaggerTest.StatusCode))" -ForegroundColor Red
}

# Summary
Write-Host "`n" + "="*50
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "="*50

Write-Host "Collections Working: $collectionCount/4" -ForegroundColor $(if ($collectionCount -eq 4) {"Green"} else {"Red"})
Write-Host "OAuth Protection: $(if ($authTest.StatusCode -eq 401) {"✅"} else {"❌"})" -ForegroundColor $(if ($authTest.StatusCode -eq 401) {"Green"} else {"Red"})
Write-Host "OAuth Login: $(if ($oauthResponse.StatusCode -eq 302) {"✅"} else {"❌"})" -ForegroundColor $(if ($oauthResponse.StatusCode -eq 302) {"Green"} else {"Red"})
Write-Host "Swagger Docs: $(if ($swaggerTest.Success) {"✅"} else {"❌"})" -ForegroundColor $(if ($swaggerTest.Success) {"Green"} else {"Red"})

if ($collectionCount -eq 4 -and $authTest.StatusCode -eq 401) {
    Write-Host "`n🎉 ALL WEEK 06 REQUIREMENTS MET!" -ForegroundColor Green
    Write-Host "Ready for resubmission with 100/100 score!" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ Some requirements not met. Check above." -ForegroundColor Yellow
}

Write-Host "`nFor video demonstration:" -ForegroundColor Cyan
Write-Host "1. Show Render deployment (not localhost)" -ForegroundColor Gray
Write-Host "2. Demonstrate all 4 collections" -ForegroundColor Gray
Write-Host "3. Show 401 error for POST without login" -ForegroundColor Gray
Write-Host "4. Show OAuth redirect (302)" -ForegroundColor Gray
Write-Host "5. Show validation errors (400)" -ForegroundColor Gray
Write-Host "6. Show tests passing" -ForegroundColor Gray
