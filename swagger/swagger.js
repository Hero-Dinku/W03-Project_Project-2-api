const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bookstore API - Books & Authors',
      version: '1.0.0',
      description: 'Complete CRUD API with MongoDB',
    },
    servers: [
      {
        url: 'https://w03-project-project-2-api.onrender.com',
        description: 'Production',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  // Use custom Swagger UI options for better compatibility
  const options = {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Bookstore API Docs',
  };
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, options));
  console.log('?? Swagger docs available at /api-docs');
};

module.exports = swaggerDocs;
