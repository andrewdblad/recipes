const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipes API',
    description: 'API project for recipes'
  },
  host: 'https://cse341-blad.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);