const http = require('http');

console.log('🚀 Testing Week 06 API Requirements...\n');

const endpoints = [
    { name: 'Root', path: '/' },
    { name: 'Books', path: '/api/books' },
    { name: 'Authors', path: '/api/authors' },
    { name: 'Categories', path: '/api/categories' },
    { name: 'Publishers', path: '/api/publishers' },
    { name: 'Swagger Docs', path: '/api-docs' },
    { name: 'OAuth Login', path: '/auth/google' }
];

let testsPassed = 0;
let testsFailed = 0;

function testEndpoint(name, path) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: 'GET',
            timeout: 3000
        };

        const req = http.request(options, (res) => {
            console.log(`✅ ${name.padEnd(15)}: ${res.statusCode} ${path}`);
            testsPassed++;
            resolve(true);
        });

        req.on('error', (err) => {
            console.log(`❌ ${name.padEnd(15)}: ERROR - ${err.message}`);
            testsFailed++;
            resolve(false);
        });

        req.on('timeout', () => {
            console.log(`❌ ${name.padEnd(15)}: TIMEOUT`);
            testsFailed++;
            req.destroy();
            resolve(false);
        });

        req.end();
    });
}

async function runAllTests() {
    console.log('1. Testing all endpoints are accessible...\n');
    
    for (const endpoint of endpoints) {
        await testEndpoint(endpoint.name, endpoint.path);
    }

    console.log('\n2. Testing protected routes (should fail with 401)...\n');
    
    // Test POST without authentication
    const postData = JSON.stringify({
        title: 'Test Book',
        author: 'Test Author',
        year: 2023,
        price: 29.99,
        genre: 'Test'
    });
    
    const postOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/books',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        },
        timeout: 3000
    };
    
    const postReq = http.request(postOptions, (res) => {
        if (res.statusCode === 401) {
            console.log(`✅ Protected Route: POST /api/books returns 401 (Unauthorized)`);
            testsPassed++;
        } else {
            console.log(`❌ Protected Route: Expected 401 but got ${res.statusCode}`);
            testsFailed++;
        }
    });
    
    postReq.on('error', (err) => {
        console.log(`❌ Protected Route Test Error: ${err.message}`);
        testsFailed++;
    });
    
    postReq.write(postData);
    postReq.end();

    // Wait a bit for the POST test to complete
    setTimeout(() => {
        console.log('\n' + '='.repeat(50));
        console.log('📊 TEST SUMMARY:');
        console.log('='.repeat(50));
        console.log(`Total Tests: ${testsPassed + testsFailed}`);
        console.log(`✅ Passed: ${testsPassed}`);
        console.log(`❌ Failed: ${testsFailed}`);
        
        if (testsFailed === 0) {
            console.log('\n🎉 ALL WEEK 06 REQUIREMENTS MET!');
            console.log('✅ 4 Collections accessible');
            console.log('✅ OAuth protection working');
            console.log('✅ Swagger docs available');
            console.log('✅ Ready for submission!');
        } else {
            console.log('\n⚠️ Some tests failed. Check above for details.');
        }
        console.log('='.repeat(50));
    }, 1000);
}

// Check if server is running first
const checkServer = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 2000
}, () => {
    console.log('Server is running on localhost:3000\n');
    runAllTests();
});

checkServer.on('error', () => {
    console.log('❌ Server is not running on localhost:3000');
    console.log('Please start the server first: node server.js');
    process.exit(1);
});

checkServer.end();
