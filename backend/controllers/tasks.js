const tasksRouter = require('express').Router();
const Task = require('../models/task');
const Project = require('../models/project');

tasksRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const task = new Task({ ...body });
    task.status = 'pending';
    const savedTask = await task.save();
    const project = await Project.findById(body.project);
    const taskAddedProject = {
      tasks: project.tasks.concat(savedTask._id)
    };
    await Project.findByIdAndUpdate(body.project, taskAddedProject, { new: true });
    response.status(201).json(savedTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.get('/:id', async (request, response, next) => {
  try {
    const task = await Task.findById(request.params.id);
    response.json(task.toJSON());
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.put('/:id/status', async (request, response, next) => {
  try {
    const { body } = request;
    const taskChangedStatus = { ...body };
    const updatedTask = await Task.findByIdAndUpdate(
      request.params.id, taskChangedStatus, { new: true }
    );
    response.json(updatedTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

tasksRouter.put('/:id/asignees', async (request, response, next) => {
  try {
    const { body } = request;
    const task = await Task.findById(request.params.id);
    const taskChangedAsignees = {
      asignees: task.asignees.concat(body.asignees)
    };
    const updatedTask = await Task.findByIdAndUpdate(
      request.params.id, taskChangedAsignees, { new: true }
    );
    response.json(updatedTask.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = tasksRouter;
