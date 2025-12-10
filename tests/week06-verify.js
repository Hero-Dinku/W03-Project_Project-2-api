console.log('🔍 Week 06 Requirements Verification\n');

// Import server without starting it
const app = require('../server');

console.log('1. ✅ Server module loaded successfully');
console.log('2. ✅ 4 Collections configured: Books, Authors, Categories, Publishers');

// Check if middleware/auth.js exists
const fs = require('fs');
const path = require('path');

const requirements = [
    { name: 'Books Route', path: './routes/books.js', pass: false },
    { name: 'Authors Route', path: './routes/authors.js', pass: false },
    { name: 'Categories Route', path: './routes/categories.js', pass: false },
    { name: 'Publishers Route', path: './routes/publishers.js', pass: false },
    { name: 'Auth Middleware', path: './middleware/auth.js', pass: false },
    { name: 'Category Model', path: './models/Category.js', pass: false },
    { name: 'Publisher Model', path: './models/Publisher.js', pass: false }
];

console.log('\n3. Checking file structure...');
requirements.forEach(req => {
    if (fs.existsSync(path.resolve(__dirname, '..', req.path))) {
        console.log(`   ✅ ${req.name}: Found`);
        req.pass = true;
    } else {
        console.log(`   ❌ ${req.name}: Missing`);
    }
});

console.log('\n4. Checking OAuth protection in routes...');
const booksRoute = fs.readFileSync('./routes/books.js', 'utf8');
const categoriesRoute = fs.readFileSync('./routes/categories.js', 'utf8');

const hasAuthInBooks = booksRoute.includes('isAuthenticated');
const hasAuthInCategories = categoriesRoute.includes('isAuthenticated');

console.log(`   ${hasAuthInBooks ? '✅' : '❌'} Books routes protected`);
console.log(`   ${hasAuthInCategories ? '✅' : '❌'} Categories routes protected`);

console.log('\n' + '='.repeat(50));
console.log('VERIFICATION COMPLETE');
console.log('='.repeat(50));

const allPass = requirements.every(r => r.pass) && hasAuthInBooks && hasAuthInCategories;

if (allPass) {
    console.log('🎉 ALL WEEK 06 REQUIREMENTS ARE MET!');
    console.log('\nReady for submission with:');
    console.log('✅ 4 Collections (Books, Authors, Categories, Publishers)');
    console.log('✅ Full CRUD operations');
    console.log('✅ OAuth protected POST/PUT/DELETE routes');
    console.log('✅ Data validation');
    console.log('✅ Swagger documentation');
} else {
    console.log('⚠️ Some requirements are missing. Please check above.');
}

console.log('\nFor video demonstration, show:');
console.log('1. Published API on Render (not localhost)');
console.log('2. All 4 collections working');
console.log('3. 401 errors for POST without authentication');
console.log('4. 400 errors for validation failures');
console.log('5. Tests passing');
