const projectsRouter = require('express').Router();
const Project = require('../models/project');

projectsRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const project = new Project({ ...body });
    const savedProject = await project.save();
    response.status(201).json(savedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/', async (request, response, next) => {
  try {
    const projects = await Project.find({});
    response.json(projects.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id', async (request, response, next) => {
  try {
    const project = await Project.findById(request.params.id);
    response.json(project.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.put('/:project_id/members/:user_id', async (request, response, next) => {
  try {
    const project = await Project.findById(request.params.id);
    const membersAddedProject = {
      members: project.members.concat(request.params.user_id)
    };
    const updatedProject = await Project.findByIdAndUpdate(
      request.params.id, membersAddedProject, { new: true }
    );
    response.json(updatedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.delete('/:id', async (request, response, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(request.params.id);
    response.json(deletedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

module.exports = { projectsRouter };
