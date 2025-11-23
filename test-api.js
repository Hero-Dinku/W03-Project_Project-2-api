const axios = require('axios');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000/api';

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');

  try {
    // Test 1: Create a book
    console.log('1. Testing POST /books');
    const newBook = {
      title: "Test Book for CRUD Operations",
      author: "Test Author",
      isbn: "1234567890",
      publicationYear: 2024,
      genre: "Fiction",
      publisher: "Test Publisher",
      pageCount: 300,
      description: "This is a test book for API testing"
    };

    const createBookResponse = await axios.post(`${BASE_URL}/books`, newBook);
    console.log('✅ Book created:', createBookResponse.data.data._id);
    const bookId = createBookResponse.data.data._id;

    // Test 2: Get all books
    console.log('\n2. Testing GET /books');
    const getBooksResponse = await axios.get(`${BASE_URL}/books`);
    console.log('✅ Books retrieved:', getBooksResponse.data.count);

    // Test 3: Get book by ID
    console.log('\n3. Testing GET /books/:id');
    const getBookResponse = await axios.get(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Book retrieved:', getBookResponse.data.data.title);

    // Test 4: Update book
    console.log('\n4. Testing PUT /books/:id');
    const updateBookResponse = await axios.put(`${BASE_URL}/books/${bookId}`, {
      title: "Updated Test Book"
    });
    console.log('✅ Book updated:', updateBookResponse.data.data.title);

    // Test 5: Create an author
    console.log('\n5. Testing POST /authors');
    const newAuthor = {
      firstName: "John",
      lastName: "Doe",
      birthDate: "1980-01-01",
      nationality: "American",
      biography: "Test author biography",
      awards: ["Test Award 1", "Test Award 2"],
      isActive: true
    };

    const createAuthorResponse = await axios.post(`${BASE_URL}/authors`, newAuthor);
    console.log('✅ Author created:', createAuthorResponse.data.data._id);
    const authorId = createAuthorResponse.data.data._id;

    // Test 6: Test validation (should fail)
    console.log('\n6. Testing validation (should fail)');
    try {
      await axios.post(`${BASE_URL}/books`, {
        title: "Invalid Book",
        // Missing required fields
      });
    } catch (error) {
      console.log('✅ Validation working:', error.response.status, error.response.data.message);
    }

    // Test 7: Delete book
    console.log('\n7. Testing DELETE /books/:id');
    const deleteBookResponse = await axios.delete(`${BASE_URL}/books/${bookId}`);
    console.log('✅ Book deleted:', deleteBookResponse.data.message);

    // Test 8: Delete author
    console.log('\n8. Testing DELETE /authors/:id');
    const deleteAuthorResponse = await axios.delete(`${BASE_URL}/authors/${authorId}`);
    console.log('✅ Author deleted:', deleteAuthorResponse.data.message);

    console.log('\n🎉 All tests passed! CRUD operations are working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testAPI();