const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./utils/middleware');
const usersRouter = require('./controllers/users');
const projectsRouter = require('./controllers/projects');

const app = express();
app.use(bodyParser.json());
app.get('/', (request, response) => response.send('Hello World!'));
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use(middleware.errorHandler);

module.exports = app;
