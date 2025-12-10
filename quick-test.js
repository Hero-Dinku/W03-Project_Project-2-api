const request = require("supertest");
const app = require("./server");

async function testEndpoints() {
    console.log("Testing current endpoints...");
    
    try {
        // Test Books
        console.log("\n1. Testing /api/books...");
        const booksRes = await request(app).get("/api/books");
        console.log(`   Status: ${booksRes.statusCode}`);
        console.log(`   Has data: ${booksRes.body.length > 0}`);
        
        // Test Authors
        console.log("\n2. Testing /api/authors...");
        const authorsRes = await request(app).get("/api/authors");
        console.log(`   Status: ${authorsRes.statusCode}`);
        console.log(`   Has data: ${authorsRes.body.length > 0}`);
        
        // Test Swagger
        console.log("\n3. Testing /api-docs...");
        const docsRes = await request(app).get("/api-docs");
        console.log(`   Status: ${docsRes.statusCode}`);
        
        // Count collections
        console.log("\n=== SUMMARY ===");
        console.log("Working collections: 2 (Books, Authors)");
        console.log("Need for Week 06: 4 total collections");
        
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testEndpoints();
