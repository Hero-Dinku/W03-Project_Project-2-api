// tests/test-api.js
console.log('🚀 Starting Week 7 API Tests\n');

const axios = require('axios');
const BASE_URL = 'https://w03-project-project-2-api.onrender.com';

async function testEndpoint(name, endpoint) {
  console.log(`Testing: ${name}`);
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, { timeout: 10000 });
    console.log(`✅ SUCCESS - Status: ${response.status}`);
    
    if (Array.isArray(response.data)) {
      console.log(`   Items found: ${response.data.length}`);
      if (response.data.length > 0 && response.data[0]) {
        console.log(`   Sample: ${JSON.stringify(response.data[0]).substring(0, 100)}...`);
      }
    }
    return { success: true, status: response.status };
  } catch (error) {
    const status = error.response?.status;
    const message = error.message;
    
    if (status === 401 || status === 403) {
      console.log(`🔒 PROTECTED - Status: ${status} (OAuth is working!)`);
      return { success: true, status, protected: true };
    } else {
      console.log(`❌ FAILED - ${status || message}`);
      return { success: false, status, message };
    }
  }
}

async function runTests() {
  console.log('='.repeat(60));
  console.log('WEEK 7 PROJECT TESTS - 4 Collections Required');
  console.log('='.repeat(60));
  console.log('');
  
  const tests = [
    { name: 'Books Collection', endpoint: '/api/books' },
    { name: 'Authors Collection', endpoint: '/api/authors' },
    { name: 'Users Collection', endpoint: '/api/users' },
    { name: 'Reviews Collection', endpoint: '/api/reviews' },
    { name: 'Swagger Documentation', endpoint: '/api-docs' },
    { name: 'OAuth Login', endpoint: '/auth/google' }
  ];
  
  const results = [];
  let passed = 0;
  let protectedCount = 0;
  
  for (const test of tests) {
    const result = await testEndpoint(test.name, test.endpoint);
    results.push({ ...test, ...result });
    
    if (result.success) passed++;
    if (result.protected) protectedCount++;
    
    console.log('');
  }
  
  // Print Summary
  console.log('='.repeat(60));
  console.log('TEST SUMMARY');
  console.log('='.repeat(60));
  console.log('');
  
  console.log(`Collections Tested: ${tests.length}`);
  console.log(`✅ Successfully Accessed: ${passed}/${tests.length}`);
  console.log(`🔒 Protected Routes: ${protectedCount}`);
  console.log('');
  
  console.log('DETAILED RESULTS:');
  console.log('-'.repeat(40));
  
  results.forEach((test, index) => {
    const icon = test.success ? '✅' : '❌';
    const protection = test.protected ? ' [PROTECTED]' : '';
    console.log(`${icon} ${test.name.padEnd(25)} Status: ${test.status || 'N/A'}${protection}`);
  });
  
  console.log('');
  console.log('='.repeat(60));
  
  // Week 7 Requirements Check
  const collectionsWorking = results.filter(r => 
    r.endpoint.includes('/api/') && r.success
  ).length;
  
  if (collectionsWorking >= 4) {
    console.log('🎉 WEEK 7 REQUIREMENTS MET!');
    console.log('');
    console.log('Show in your video:');
    console.log('1. Run: npm test');
    console.log('2. All 4 collections working');
    console.log('3. OAuth protected routes (401/403 status)');
    console.log('4. Swagger docs at /api-docs');
    console.log('5. POST/PUT/DELETE operations');
    console.log('6. Data validation errors (400 status)');
  } else {
    console.log('⚠️ NEED TO FIX SOME COLLECTIONS');
    console.log(`   Currently: ${collectionsWorking}/4 collections working`);
  }
  
  console.log('='.repeat(60));
}

// Run the tests
runTests().catch(error => {
  console.error('Test runner error:', error.message);
  process.exit(1);
});