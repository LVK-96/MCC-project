const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./utils/middleware');
//const usersRouter = require('./controllers/users'); TODO: Refactor to use cloud firestore
const projectsRouter = require('./controllers/projects');
//const tasksRouter = require('./controllers/tasks'); TODO: Refactor to use cloud firestore

const app = express();
app.use(bodyParser.json());
app.get('/', (request, response) => response.send('Hello World!'));
app.use('/projects', projectsRouter);
app.use(middleware.errorHandler);

module.exports = app;
