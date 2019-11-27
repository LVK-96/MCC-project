const projectsRouter = require('express').Router();
const Project = require('../models/project');
const Task = require('../models/task');
let { db, auth } = require('../utils/config');

projectsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const { body } = request;
    const project = new Project({ ...body, owner: decodedToken.uid });
    await db.collection('projects').doc(project.id).set({ ...project });
    response.status(201).json(project);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/', async (request, response, next) => {
  try {
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const owner = await db.collection('projects').where('owner', '==', decodedToken.uid).get();
    const member = await db.collectionGroup('members').where('uid', '==', decodedToken.uid).get();
    const docs = owner.docs.concat(member.docs);
    let projects = [];
    for (let doc of docs) {
      projects.push(doc.data());
    }
    response.json(projects);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id', async (request, response, next) => {
  try {
    const document = await db.collection('projects').doc(request.params.id).get();
    const project = document.data();
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    response.json(project);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/members', async (request, response, next) => {
  try {
    const { body } = request;
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString()); //decodedToken.uid 
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    for (let member of body.users) {
      await db.collection('projects').doc(request.params.id).collection('members')
        .doc(member.uid).set({ ...member });
    }
    response.json({ message: 'Members added', members: body.users });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/members', async (request, response, next) => {
  try {
    const collection = await db.collection('projects').doc(request.params.id).collection('members').get();
    const docs = collection.docs;
    let members = [];
    for (let doc of docs) {
      members.push(doc.data());
    }
    response.json(members);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/files', async (request, response, next) => {
  try {
    const { body } = request;
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    for (let file of body.files) {
      await db.collection('projects').doc(request.params.id).collection('files')
        .doc(file).set({ file });
    }
    response.json({ message: 'Files added', files: body.files });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/files', async (request, response, next) => {
  try {
    const collection = await db.collection('projects').doc(request.params.id).collection('files').get();
    const docs = collection.docs;
    let files = [];
    for (let doc of docs) {
      files.push(doc.data());
    }
    response.json(files);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/images', async (request, response, next) => {
  try {
    const { body } = request;
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    for (let image of body.images) {
      await db.collection('projects').doc(request.params.id).collection('images')
        .doc(image).set({ image });
    }
    response.json({ message: 'Images added', files: body.images });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/images', async (request, response, next) => {
  try {
    const collection = await db.collection('projects').doc(request.params.id).collection('images').get();
    const docs = collection.docs;
    let images = [];
    for (let doc of docs) {
      images.push(doc.data());
    }
    response.json(images);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.delete('/:id', async (request, response, next) => {
  try {
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    await db.collection('projects').doc(request.params.id).delete();
    response.json({ message: 'Project deleted' });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/tasks', async (request, response, next) => {
  try {
    const { body } = request;
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    const task = new Task(body);
    await db.collection('projects').doc(request.params.id).collection('tasks')
      .doc(task.id).set({ ...task });
    response.json(task);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/tasks', async (request, response, next) => {
  try {
    const collection = await db.collection('projects').doc(request.params.id).collection('tasks').get();
    const docs = collection.docs;
    let tasks = [];
    for (let doc of docs) {
      tasks.push(doc.data());
    }
    response.json(tasks);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:project_id/tasks/:task_id', async (request, response, next) => {
  try {
    const document = await db.collection('projects').doc(request.params.project_id)
      .collection('tasks').doc(request.params.task_id).get();
    const task = document.data();
    response.json(task);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:project_id/tasks/:task_id/status', async (request, response, next) => {
  try {
    const { body } = request;
    const document = await db.collection('projects').doc(request.params.project_id)
      .collection('tasks').doc(request.params.task_id).get();
    let task = document.data();
    task.status = body.status;
    await db.collection('projects').doc(request.params.project_id)
      .collection('tasks').doc(request.params.task_id).set({ ...task });
    response.json(task);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:project_id/tasks/:task_id/asignees', async (request, response, next) => {
  try {
    const { body } = request;
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const project = await db.collection('projects').doc(request.params.id).get();
    if (project.owner !== decodedToken.uid) return response.status(403).end();
    for (let user of body.users) {
      await db.collection('projects').doc(request.params.project_id)
        .collection('tasks').doc(request.params.task_id).collection('asignees').doc(user).set({ user });
    }
    response.json({ message: 'Task assigned', users: body.users });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:project_id/tasks/:task_id/asignees', async (request, response, next) => {
  try {
    const collection = await db.collection('projects').doc(request.params.project_id)
      .collection('tasks').doc(request.params.task_id).collection('asignees').get();
    const docs = collection.docs;
    let asignees = [];
    for (let doc of docs) {
      asignees.push(doc.data());
    }
    response.json(asignees);
  } catch (exception) {
    next(exception);
  }
});

module.exports = projectsRouter;
