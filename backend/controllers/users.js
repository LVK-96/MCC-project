const usersRouter = require('express').Router();
let { db } = require('../utils/config');
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const user = new User(body);
    await db.collection('users').doc(user.id).set({ ...user });
    response.status(201).json(user);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const collection = await db.collection('users').get();
    const docs = collection.docs;
    let users = [];
    for (let doc of docs) {
      users.push(doc.data());
    }
    response.json(users);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const document = await db.collection('users').doc(request.params.id).get();
    const user = document.data();
    response.json(user);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.post('/:id', async (request, response, next) => {
  try {
    const { body } = request;
    const document = await db.collection('users').doc(request.params.id).get();
    let user = document.data();
    user.email = body.email;
    await db.collection('users').doc(request.params.id).set(user);
    response.json(user);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await db.collection('users').doc(request.params.id).delete();
    response.json({ message: 'User deleted' });
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;