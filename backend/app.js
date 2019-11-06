const express = require('express');

const app = express();
const middleware = require('./utils/middleware');

//app.use(middleware.errorHandler);
app.get('/', (request, response) => response.send('Hello World!'));

module.exports = app;
