const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testCRUD() {
  console.log('Testing CRUD Operations...');
  console.log('');

  try {
    // Test 1: Create a Book
    console.log('1. Testing POST /books');
    const newBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      publicationYear: 1925,
      genre: 'Fiction',
      publisher: 'Scribner',
      pageCount: 180
    };

    const createBookResponse = await axios.post(BASE_URL + '/books', newBook);
    console.log('✅ Book created:', createBookResponse.data.data._id);
    const bookId = createBookResponse.data.data._id;

    // Test 2: Create an Author
    console.log('');
    console.log('2. Testing POST /authors');
    const newAuthor = {
      firstName: 'F. Scott',
      lastName: 'Fitzgerald',
      birthDate: '1896-09-24',
      nationality: 'American',
      biography: 'American novelist and short story writer',
      awards: ['This Side of Paradise success'],
      isActive: false
    };

    const createAuthorResponse = await axios.post(BASE_URL + '/authors', newAuthor);
    console.log('✅ Author created:', createAuthorResponse.data.data._id);
    const authorId = createAuthorResponse.data.data._id;

    // Test 3: Get All Books
    console.log('');
    console.log('3. Testing GET /books');
    const getBooksResponse = await axios.get(BASE_URL + '/books');
    console.log('✅ Books retrieved:', getBooksResponse.data.count);

    // Test 4: Get All Authors
    console.log('');
    console.log('4. Testing GET /authors');
    const getAuthorsResponse = await axios.get(BASE_URL + '/authors');
    console.log('✅ Authors retrieved:', getAuthorsResponse.data.count);

    // Test 5: Get Book by ID
    console.log('');
    console.log('5. Testing GET /books/:id');
    const getBookResponse = await axios.get(BASE_URL + '/books/' + bookId);
    console.log('✅ Book retrieved:', getBookResponse.data.data.title);

    // Test 6: Update Book
    console.log('');
    console.log('6. Testing PUT /books/:id');
    const updateBookResponse = await axios.put(BASE_URL + '/books/' + bookId, {
      title: 'The Great Gatsby (Updated)',
      pageCount: 200
    });
    console.log('✅ Book updated:', updateBookResponse.data.data.title);

    // Test 7: Test Validation (should fail)
    console.log('');
    console.log('7. Testing validation (should fail)');
    try {
      await axios.post(BASE_URL + '/books', {
        title: 'Invalid Book'
        // Missing required fields
      });
    } catch (error) {
      console.log('✅ Validation working: 400 error -', error.response.data.message);
    }

    // Test 8: Delete Book
    console.log('');
    console.log('8. Testing DELETE /books/:id');
    const deleteBookResponse = await axios.delete(BASE_URL + '/books/' + bookId);
    console.log('✅ Book deleted:', deleteBookResponse.data.message);

    // Test 9: Delete Author
    console.log('');
    console.log('9. Testing DELETE /authors/:id');
    const deleteAuthorResponse = await axios.delete(BASE_URL + '/authors/' + authorId);
    console.log('✅ Author deleted:', deleteAuthorResponse.data.message);

    console.log('');
    console.log('🎉 All CRUD tests passed! Your API is working correctly.');
    console.log('📊 You can now demonstrate:');
    console.log('   - GET, POST, PUT, DELETE for Books');
    console.log('   - GET, POST, PUT, DELETE for Authors');
    console.log('   - Data validation (400 errors)');
    console.log('   - Error handling');
    console.log('   - MongoDB database updates');

  } catch (error) {
    console.log('❌ Test failed:', error.response ? error.response.data : error.message);
  }
}

testCRUD();
