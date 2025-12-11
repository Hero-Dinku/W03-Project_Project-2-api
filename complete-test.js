const http = require('http');

console.log('🧪 Testing ALL GET endpoints for 4 collections\n');

const tests = [
    { name: 'Books GET', path: '/api/books', expected: 200 },
    { name: 'Authors GET', path: '/api/authors', expected: 200 },
    { name: 'Categories GET', path: '/api/categories', expected: 200 },
    { name: 'Publishers GET', path: '/api/publishers', expected: 200 },
    { name: 'Books GET by ID', path: '/api/books/123', expected: 404 }, // Testing error handling
    { name: 'Categories GET by ID', path: '/api/categories/123', expected: 404 }
];

let passed = 0;

tests.forEach((test, i) => {
    const req = http.request({
        hostname: 'localhost',
        port: 3000,
        path: test.path
    }, (res) => {
        const success = res.statusCode === test.expected;
        console.log(`${success ? '✅' : '❌'} ${test.name}: ${res.statusCode} (expected ${test.expected})`);
        if (success) passed++;
        
        if (i === tests.length - 1) {
            console.log(`\n📊 Result: ${passed}/${tests.length} tests passed`);
            console.log(passed === tests.length ? '🎉 ALL TESTS PASS!' : '⚠️ Some tests failed');
        }
    });
    
    req.on('error', () => console.log(`❌ ${test.name}: Connection failed`));
    req.setTimeout(3000, () => {
        console.log(`❌ ${test.name}: Timeout`);
        req.destroy();
    });
    
    req.end();
});
