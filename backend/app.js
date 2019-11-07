const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const middleware = require('./utils/middleware');
const config = require('./utils/config');
const usersRouter = require('./controllers/users');
const projectsRouter = require('./controllers/projects');
const tasksRouter = require('./controllers/tasks');

mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
app.get('/', (request, response) => response.send('Hello World!'));
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/tasks', tasksRouter);
app.use(middleware.errorHandler);

module.exports = app;
