const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const user = new User({ ...body });
    let savedUser = await user.save();
    response.status(201).json(savedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({});
    response.json(users.map(u => u.toJSON()));
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.id);
    response.json(user.toJSON());
  } catch (exception) {
    next(exception);
  }
});

usersRouter.put('/:id', async (request, response, next) => {
  try {
    const { body } = request;
    const user = { ...body };
    let updatedUser = await User.findByIdAndUpdate(
      request.params.id, user, { new: true }
    );
    response.json(updatedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(request.params.id);
    response.json(deletedUser.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
