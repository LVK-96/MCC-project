const projectsRouter = require('express').Router();
const Project = require('../models/project');

projectsRouter.post('/', async (request, response, next) => {
  try {
    const { body } = request;
    const project = new Project({ ...body });
    project.members = project.members.concat(project.owner);
    const savedProject = await project.save();
    response.status(201).json(savedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/', async (request, response, next) => {
  try {
    const projects = await Project.find({});
    response.json(projects.map(p => p.toJSON()));
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

projectsRouter.put('/:id/members', async (request, response, next) => {
  try {
    const { body } = request;
    const project = await Project.findById(request.params.id);
    const membersAddedProject = {
      members: project.members.concat(body.users)
    };
    const updatedProject = await Project.findByIdAndUpdate(
      request.params.id, membersAddedProject, { new: true }
    );
    response.json(updatedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.put('/:id/files', async (request, response, next) => {
  try {
    const { body } = request;
    const project = await Project.findById(request.params.id);
    const fileAddedProject = {
      files: project.files.concat(body.fileuris)
    };
    const updatedProject = await Project.findByIdAndUpdate(
      request.params.id, fileAddedProject, { new: true }
    );
    response.json(updatedProject.toJSON());
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.put('/:id/images', async (request, response, next) => {
  try {
    const { body } = request;
    const project = await Project.findById(request.params.id);
    const imageAddedProject = {
      images: project.images.concat(body.imageuris)
    };
    const updatedProject = await Project.findByIdAndUpdate(
      request.params.id, imageAddedProject, { new: true }
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

module.exports = projectsRouter;
