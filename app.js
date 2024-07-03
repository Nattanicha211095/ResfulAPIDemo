const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const apiRouter = require('./routes/api');

const app = express();
const port = 3000;

// Swagger set up
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'My API Information',
      contact: {
        name: 'Developer',
        url: 'http://localhost:3000',
        email: 'developer@example.com'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Local server'
        }
      ]
    },
  },
  apis: ['./routes/*.js'], // paths to the API files
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRouter);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`API docs available at http://localhost:${port}/api-docs`);
});
