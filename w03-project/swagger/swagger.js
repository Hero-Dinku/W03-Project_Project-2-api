const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'W03 Project API - Books & Authors',
      version: '1.0.0',
      description: 'Complete CRUD API for managing books and authors with MongoDB',
    },
    servers: [
      {
        url: 'https://w03-project-project-2-api.onrender.com',
        description: 'Production server',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: [
    path.join(__dirname, '../routes/*.js'),  // Absolute path for production
    './routes/*.js',                         // Relative path fallback
    'routes/*.js'                            // Another fallback option
  ],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger docs available at /api-docs');
};

module.exports = swaggerDocs;