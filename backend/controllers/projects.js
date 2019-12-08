const projectsRouter = require('express').Router();
const Project = require('../models/project');
const Task = require('../models/task');
let { db, auth } = require('../utils/config');
const notify = require('../utils/notify');

const isOwner = (token, project) => {
  const projectData = project.data();
  if(projectData.owner === token.uid) return true;
  return false;
};

const isMember = (token, project) => {
  const projectData = project.data();
  if (projectData.members.includes(token.uid)) return true;
  return false;
};

const isAssigned = async (token, taskRef) => {
  const assigned = await taskRef.collection('assignees').get();
  if (assigned.docs.includes(token.uid)) return true;
  return false;
};

projectsRouter.post('/', async (request, response, next) => {
  try {
    console.log('Posting project');
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
    console.log('Getting all  projects');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const owner = await db.collection('projects').where('owner', '==', decodedToken.uid).get();
    const member = await db.collection('projects').where('members', 'array-contains', decodedToken.uid).get();
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
    console.log('Getting project by id');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const projectData = project.data();
    response.json(projectData);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/members', async (request, response, next) => {
  try {
    console.log('Posting member');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if(!isOwner(decodedToken, project)) return response.status(403).end();
    const { body } = request;
    const alreadyMember = project.data().members.includes(body.uid);
    if (alreadyMember) {
      return response.status(409).end();
    }
    const newMembers = project.data().members.concat(body.uid);
    await projectRef.set({ ...project.data(), members: newMembers });
    notify.sendMemberAdded(project.data(), body.uid);
    response.json(body);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/members', async (request, response, next) => {
  try {
    console.log('Getting project members');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    let members = [];
    for (let m of project.data().members) {
      members.push(db.collection('users').doc(m).get());
    }
    members = await Promise.all(members);
    response.json(members.map(m => m.data()));
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/files', async (request, response, next) => {
  try {
    console.log('Posting file');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const { body } = request;
    const file = body;
    file.uploaded = new Date().toISOString();
    await projectRef.collection('files').doc(file.uid).set({ ...file });
    response.json(file);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/files', async (request, response, next) => {
  try {
    console.log('Getting projet files');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const collection = await projectRef.collection('files').get();
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
    console.log('Posting image');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const { body } = request;
    const image = body;
    image.uploaded = new Date().toISOString();
    await projectRef.collection('images').doc(image.uid).set({ ...image });
    response.json(image);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/images', async (request, response, next) => {
  try {
    console.log('Getting projet images');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const collection = await projectRef.collection('images').get();
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
    console.log('deleting project');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.doc(request.params.id).get();
    if (!isOwner(decodedToken, project)) return response.status(403).end();
    await projectRef.doc(request.params.id).delete();
    response.json({ message: 'Project deleted' });
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:id/tasks', async (request, response, next) => {
  try {
    console.log('Posting task');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project)) return response.status(403).end();
    const { body } = request;
    const task = new Task(body);
    await projectRef.collection('tasks').doc(task.id).set({ ...task });
    response.json(task);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:id/tasks', async (request, response, next) => {
  try {
    console.log('Getting project tasks');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const collection = await projectRef.collection('tasks').get();
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
    console.log('Getting task by id');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.id);
    const project = await projectRef.doc(request.params.id).get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    const document = await projectRef.collection('tasks').doc(request.params.task_id).get();
    const task = document.data();
    response.json(task);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.put('/:project_id/tasks/:task_id', async (request, response, next) => {
  try {
    console.log('Updating task');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.project_id);
    const taskRef = projectRef.collection('tasks').doc(request.params.task_id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isAssigned(decodedToken, taskRef)) return response.status(403).end();
    const { body } = request;
    const document = await taskRef.get();
    const task = document.data();
    const updated = { ...task, ...body };
    await taskRef.set(updated);
    response.json(updated);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.post('/:project_id/tasks/:task_id/assignees', async (request, response, next) => {
  try {
    console.log('Posting asignees');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.project_id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project)) return response.status(403).end();
    response.json([]);
  } catch (exception) {
    next(exception);
  }
});

projectsRouter.get('/:project_id/tasks/:task_id/assignees', async (request, response, next) => {
  try {
    console.log('Getting task asignees');
    const decodedToken = await auth.verifyIdToken(request.get('authorization').toString());
    const projectRef = db.collection('projects').doc(request.params.project_id);
    const project = await projectRef.get();
    if (!isOwner(decodedToken, project) && !isMember(decodedToken, project)) return response.status(403).end();
    response.json([]);
  } catch (exception) {
    next(exception);
  }
});

module.exports = projectsRouter;
