const request = require('supertest');
const app = require('../server');

describe('Week 06 Requirements Test', () => {
    // Test 1: Check if server is running
    test('1. Server is running', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    // Test 2: Check all 4 collections have GET endpoints
    test('2. Books Collection - GET /api/books', async () => {
        const res = await request(app).get('/api/books');
        expect(res.statusCode).toBe(200);
    });

    test('3. Authors Collection - GET /api/authors', async () => {
        const res = await request(app).get('/api/authors');
        expect(res.statusCode).toBe(200);
    });

    test('4. Categories Collection - GET /api/categories', async () => {
        const res = await request(app).get('/api/categories');
        expect(res.statusCode).toBe(200);
    });

    test('5. Publishers Collection - GET /api/publishers', async () => {
        const res = await request(app).get('/api/publishers');
        expect(res.statusCode).toBe(200);
    });

    // Test 6: Check Swagger docs
    test('6. Swagger Documentation - GET /api-docs', async () => {
        const res = await request(app).get('/api-docs');
        expect(res.statusCode).toBe(200);
    });

    // Test 7: Check protected routes require auth
    test('7. Protected POST route returns 401 without auth', async () => {
        const bookData = {
            title: "Test Book",
            author: "Test Author",
            year: 2023,
            price: 19.99,
            genre: "Test"
        };
        const res = await request(app)
            .post('/api/books')
            .send(bookData);
        expect(res.statusCode).toBe(401);
    });
});
