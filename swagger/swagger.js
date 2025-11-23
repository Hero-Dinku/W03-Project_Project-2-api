const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log('📚 Swagger docs available at http://localhost:3000/api-docs');
};

module.exports = swaggerDocs;
