const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function debugTest() {
  console.log('🔍 Debugging API Connection...');
  
  try {
    // Test 1: Simple GET request first
    console.log('1. Testing GET /books');
    const response = await axios.get(BASE_URL + '/books', { timeout: 5000 });
    console.log('✅ GET /books successful:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
    
    // Test 2: Test POST with simple data
    console.log('');
    console.log('2. Testing POST /books with simple data');
    const simpleBook = {
      title: 'Test Book',
      author: 'Test Author',
      isbn: '1234567890',
      publicationYear: 2024,
      genre: 'Fiction',
      publisher: 'Test Pub',
      pageCount: 100
    };
    
    const postResponse = await axios.post(BASE_URL + '/books', simpleBook, { timeout: 5000 });
    console.log('✅ POST /books successful:', postResponse.status);
    console.log('Created book ID:', postResponse.data.data._id);
    
  } catch (error) {
    console.log('❌ Error details:');
    if (error.response) {
      // Server responded with error status
      console.log('Status:', error.response.status);
      console.log('Data:', JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      // No response received
      console.log('No response received. Is the server running?');
      console.log('Error message:', error.message);
    } else {
      // Other error
      console.log('Error:', error.message);
    }
  }
}

debugTest();
