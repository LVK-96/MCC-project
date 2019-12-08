const usersRouter = require('express').Router();
let { db, auth } = require('../utils/config');
const User = require('../models/user');

// TODO: access controll

usersRouter.post('/', async (request, response, next) => {
  try {
    console.log('Posting user');
    const { body } = request;
    const user = new User(body);
    await db.collection('users').doc(user.uid).set({ ...user });
    response.status(201).json(user);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/search', async (request, response, next) => {
  try {
    console.log('Searching for users');
    await auth.verifyIdToken(request.get('authorization').toString());
    const { query } = request;
    const users = await db.collection('users').where('name', '>=', query.name).get();
    let resp = [];
    for (let d of users.docs) {
      resp.push(d.data());
    }
    response.json(resp);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    console.log('Getting user by id');
    const document = await db.collection('users').doc(request.params.id).get();
    const user = document.data();
    response.json(user);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.put('/:id', async (request, response, next) => {
  try {
    console.log('Updating user by id');
    const { body } = request;
    const document = await db.collection('users').doc(request.params.id).get();
    const user = document.data();
    if (user) {
      const newUser = { ...user, ...body };
      await db.collection('users').doc(request.params.id).set({ ...newUser });
      response.json(newUser);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    console.log('Deleting user by id');
    await db.collection('users').doc(request.params.id).delete();
    response.json({ message: 'User deleted' });
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
