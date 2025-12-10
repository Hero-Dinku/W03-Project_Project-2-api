const http = require('http');

const endpoints = [
    '/api/books',
    '/api/authors', 
    '/api/categories',
    '/api/publishers',
    '/api-docs',
    '/auth/google'
];

console.log('Testing Week 06 API endpoints...\n');

endpoints.forEach(endpoint => {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: endpoint,
        method: 'GET',
        timeout: 5000
    };

    const req = http.request(options, (res) => {
        console.log(`${endpoint.padEnd(25)}: ${res.statusCode} ${res.statusMessage}`);
    });

    req.on('error', (err) => {
        console.log(`${endpoint.padEnd(25)}: ERROR - ${err.message}`);
    });

    req.on('timeout', () => {
        console.log(`${endpoint.padEnd(25)}: TIMEOUT - Server not responding`);
        req.destroy();
    });

    req.end();
});
