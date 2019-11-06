const express = require('express');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true });

const app = express();
app.get('/', (request, response) => response.send('Hello World!'));
app.use(middleware.errorHandler);

module.exports = app;
