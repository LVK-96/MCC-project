const express = require('express');

const app = express();
const middleware = require('./utils/middleware');

app.get('/', (request, response) => response.send('Hello World!'));
app.use(middleware.errorHandler);

module.exports = app;
