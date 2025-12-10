const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Bookstore API - Week 06 Project',
        version: '1.0.0',
        description: 'API for Bookstore with 4 Collections: Books, Authors, Categories, Publishers'
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server'
        },
        {
            url: 'https://w03-project-project-2-api.onrender.com',
            description: 'Production server'
        }
    ],
    tags: [
        { name: 'Books', description: 'Book operations' },
        { name: 'Authors', description: 'Author operations' },
        { name: 'Categories', description: 'Category operations' },
        { name: 'Publishers', description: 'Publisher operations' },
        { name: 'Authentication', description: 'OAuth authentication' }
    ],
    paths: {
        // BOOKS
        '/api/books': {
            get: {
                tags: ['Books'],
                summary: 'Get all books',
                responses: {
                    '200': {
                        description: 'List of books',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Book' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Books'],
                summary: 'Create a new book',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BookInput' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Book created' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' }
                }
            }
        },
        '/api/books/{id}': {
            get: {
                tags: ['Books'],
                summary: 'Get book by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Book found' },
                    '404': { description: 'Book not found' }
                }
            },
            put: {
                tags: ['Books'],
                summary: 'Update a book',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/BookInput' }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Book updated' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Book not found' }
                }
            },
            delete: {
                tags: ['Books'],
                summary: 'Delete a book',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Book deleted' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Book not found' }
                }
            }
        },
        
        // AUTHORS
        '/api/authors': {
            get: {
                tags: ['Authors'],
                summary: 'Get all authors',
                responses: {
                    '200': {
                        description: 'List of authors',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Author' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Authors'],
                summary: 'Create a new author',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/AuthorInput' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Author created' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' }
                }
            }
        },
        '/api/authors/{id}': {
            get: {
                tags: ['Authors'],
                summary: 'Get author by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Author found' },
                    '404': { description: 'Author not found' }
                }
            }
        },
        
        // CATEGORIES (NEW FOR WEEK 06)
        '/api/categories': {
            get: {
                tags: ['Categories'],
                summary: 'Get all categories',
                responses: {
                    '200': {
                        description: 'List of categories',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Category' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Categories'],
                summary: 'Create a new category',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CategoryInput' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Category created' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' }
                }
            }
        },
        '/api/categories/{id}': {
            get: {
                tags: ['Categories'],
                summary: 'Get category by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Category found' },
                    '404': { description: 'Category not found' }
                }
            },
            put: {
                tags: ['Categories'],
                summary: 'Update a category',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/CategoryInput' }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Category updated' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Category not found' }
                }
            },
            delete: {
                tags: ['Categories'],
                summary: 'Delete a category',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Category deleted' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Category not found' }
                }
            }
        },
        
        // PUBLISHERS (NEW FOR WEEK 06)
        '/api/publishers': {
            get: {
                tags: ['Publishers'],
                summary: 'Get all publishers',
                responses: {
                    '200': {
                        description: 'List of publishers',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    items: { $ref: '#/components/schemas/Publisher' }
                                }
                            }
                        }
                    }
                }
            },
            post: {
                tags: ['Publishers'],
                summary: 'Create a new publisher',
                security: [{ bearerAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PublisherInput' }
                        }
                    }
                },
                responses: {
                    '201': { description: 'Publisher created' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' }
                }
            }
        },
        '/api/publishers/{id}': {
            get: {
                tags: ['Publishers'],
                summary: 'Get publisher by ID',
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Publisher found' },
                    '404': { description: 'Publisher not found' }
                }
            },
            put: {
                tags: ['Publishers'],
                summary: 'Update a publisher',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/PublisherInput' }
                        }
                    }
                },
                responses: {
                    '200': { description: 'Publisher updated' },
                    '400': { description: 'Validation error' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Publisher not found' }
                }
            },
            delete: {
                tags: ['Publishers'],
                summary: 'Delete a publisher',
                security: [{ bearerAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        schema: { type: 'string' }
                    }
                ],
                responses: {
                    '200': { description: 'Publisher deleted' },
                    '401': { description: 'Unauthorized' },
                    '404': { description: 'Publisher not found' }
                }
            }
        },
        
        // AUTH
        '/auth/google': {
            get: {
                tags: ['Authentication'],
                summary: 'Login with Google OAuth',
                responses: {
                    '302': { description: 'Redirects to Google OAuth' }
                }
            }
        }
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        },
        schemas: {
            // Book schemas
            Book: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    title: { type: 'string' },
                    author: { type: 'string' },
                    year: { type: 'integer' },
                    price: { type: 'number' },
                    genre: { type: 'string' },
                    inStock: { type: 'boolean' }
                }
            },
            BookInput: {
                type: 'object',
                required: ['title', 'author', 'year', 'price', 'genre'],
                properties: {
                    title: { type: 'string' },
                    author: { type: 'string' },
                    year: { type: 'integer' },
                    price: { type: 'number' },
                    genre: { type: 'string' },
                    inStock: { type: 'boolean' }
                }
            },
            
            // Author schemas
            Author: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    birthYear: { type: 'integer' },
                    nationality: { type: 'string' },
                    biography: { type: 'string' }
                }
            },
            AuthorInput: {
                type: 'object',
                required: ['name', 'birthYear', 'nationality'],
                properties: {
                    name: { type: 'string' },
                    birthYear: { type: 'integer' },
                    nationality: { type: 'string' },
                    biography: { type: 'string' }
                }
            },
            
            // Category schemas (NEW)
            Category: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    isActive: { type: 'boolean' },
                    createdAt: { type: 'string', format: 'date-time' }
                }
            },
            CategoryInput: {
                type: 'object',
                required: ['name', 'description'],
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    isActive: { type: 'boolean' }
                }
            },
            
            // Publisher schemas (NEW)
            Publisher: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    location: { type: 'string' },
                    yearFounded: { type: 'integer' },
                    website: { type: 'string' },
                    isActive: { type: 'boolean' }
                }
            },
            PublisherInput: {
                type: 'object',
                required: ['name', 'location'],
                properties: {
                    name: { type: 'string' },
                    location: { type: 'string' },
                    yearFounded: { type: 'integer', minimum: 1500 },
                    website: { type: 'string', format: 'uri' },
                    isActive: { type: 'boolean' }
                }
            }
        }
    }
};

function swaggerDocs(app) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log('📚 Swagger docs available at /api-docs');
}

module.exports = swaggerDocs;
