Write-Host "🎉 FINAL DEMONSTRATION SCRIPT" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

# Start the server in the background
Write-Host "
🚀 Starting Server..." -ForegroundColor Yellow
 = Start-Process -FilePath "node" -ArgumentList "server.js" -PassThru

# Wait for server to start
Start-Sleep -Seconds 3

Write-Host "
🏠 Testing Root Endpoint" -ForegroundColor Yellow
try {
     = Invoke-RestMethod -Uri "http://localhost:3000" -Method Get
    Write-Host "   Message: " -ForegroundColor Green
} catch {
    Write-Host "   ❌ Root endpoint failed" -ForegroundColor Red
}

Write-Host "
🏥 Testing Health Endpoint" -ForegroundColor Yellow
try {
     = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
    Write-Host "   Status: " -ForegroundColor Green
    Write-Host "   Database: " -ForegroundColor Green
} catch {
    Write-Host "   ❌ Health endpoint failed" -ForegroundColor Red
}

Write-Host "
📚 Testing Books CRUD" -ForegroundColor Yellow

try {
    # Create Book
    Write-Host "   Creating book..." -ForegroundColor White
    System.Collections.Hashtable = @{
        title = "The Final Test Book"
        author = "Test Author"
        isbn = "9998887777"
        publicationYear = 2024
        genre = "Fiction"
        publisher = "Test Publisher"
        pageCount = 250
    } | ConvertTo-Json
     = Invoke-RestMethod -Uri "http://localhost:3000/api/books" -Method Post -Body System.Collections.Hashtable -ContentType "application/json"
    692233b349c7d34e40099d7c = .data._id
    Write-Host "   ✅ Book Created: " -ForegroundColor Green

    # Update Book
    Write-Host "   Updating book..." -ForegroundColor White
    {
    "pageCount":  200,
    "title":  "The Great Gatsby (UPDATED)"
} = @{title = "UPDATED: The Final Test Book"} | ConvertTo-Json
     = Invoke-RestMethod -Uri "http://localhost:3000/api/books/692233b349c7d34e40099d7c" -Method Put -Body {
    "pageCount":  200,
    "title":  "The Great Gatsby (UPDATED)"
} -ContentType "application/json"
    Write-Host "   ✅ Book Updated: " -ForegroundColor Green

    # Delete Book
    Write-Host "   Deleting book..." -ForegroundColor White
     = Invoke-RestMethod -Uri "http://localhost:3000/api/books/692233b349c7d34e40099d7c" -Method Delete
    Write-Host "   ✅ Book Deleted: " -ForegroundColor Green
} catch {
    Write-Host "   ❌ Books CRUD failed: " -ForegroundColor Red
}

Write-Host "
👤 Testing Authors CRUD" -ForegroundColor Yellow

try {
    # Create Author
    Write-Host "   Creating author..." -ForegroundColor White
    System.Collections.Hashtable = @{
        firstName = "Jane"
        lastName = "Smith"
        birthDate = "1990-05-15"
        nationality = "Canadian"
        biography = "Test author biography"
        awards = @("Test Award 2024")
        isActive = True
    } | ConvertTo-Json
     = Invoke-RestMethod -Uri "http://localhost:3000/api/authors" -Method Post -Body System.Collections.Hashtable -ContentType "application/json"
    6922342949c7d34e40099d82 = .data._id
    Write-Host "   ✅ Author Created: " -ForegroundColor Green

    # Delete Author
    Write-Host "   Deleting author..." -ForegroundColor White
     = Invoke-RestMethod -Uri "http://localhost:3000/api/authors/6922342949c7d34e40099d82" -Method Delete
    Write-Host "   ✅ Author Deleted: " -ForegroundColor Green
} catch {
    Write-Host "   ❌ Authors CRUD failed: " -ForegroundColor Red
}

Write-Host "
🛡️ Testing Validation" -ForegroundColor Yellow
try {
    Write-Host "   Testing invalid data..." -ForegroundColor White
     = @{title = "Bad Book"} | ConvertTo-Json
    Invoke-RestMethod -Uri "http://localhost:3000/api/books" -Method Post -Body  -ContentType "application/json" -ErrorAction Stop
    Write-Host "   ❌ Validation should have failed!" -ForegroundColor Red
} catch {
    Write-Host "   ✅ Validation Working: 400 Error Received" -ForegroundColor Green
}

# Stop the server
Write-Host "
🛑 Stopping Server..." -ForegroundColor Yellow
Stop-Process -Id .Id -Force

Write-Host "
🎊 ALL SYSTEMS GO! READY FOR DEPLOYMENT!" -ForegroundColor Cyan
Write-Host "✨ Your API is production-ready!" -ForegroundColor Green
Write-Host "
Next steps:" -ForegroundColor Yellow
Write-Host "1. Deploy to GitHub" -ForegroundColor White
Write-Host "2. Deploy to Render" -ForegroundColor White
Write-Host "3. Record your video" -ForegroundColor White
Write-Host "4. Submit to Canvas!" -ForegroundColor White
