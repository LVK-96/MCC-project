const admin = require("firebase-admin");

const dateIsWithinADay= (date) => {
  const d = new Date(date);
  const now = Date.now();
  const asMilliseconds = d - now;
  const asSeconds = asMilliseconds / 1000;
  const asMinutes = asSeconds / 60;
  const asHours = asMinutes / 60;
  const asDays = asHours / 24;
  return (asDays >= 0) && (asDays < 1);
};

const checkProjects = async (projectsRef) => {
  const projects = await projectsRef.get();
  let members = [];
  let projectsToNotify = [];
  for (d in projects.docs) {
    const project = d.data();
    const dl = new Date(project.deadline);
    if (dateIsWithinADay(dl)) {
      const membersDocs = d.collection('members').get();
      const doc = admin.firestore().collection('users').doc(project.owner).get();
      members.push(membersDocs.concat(doc));
      projectsToNotify.push(project);
    }
  }

  // Nested array of members including owners to notify
  await Promise.all(members);

  let userDocs = [];
  for (m in members) {
    let membersOfProject = [];
    const docs = m.docs;
    for (d in docs) {
      const doc = admin.firestore().collection('users').doc(d.data().uid).get();
      membersOfProject.push(doc);
    }

    userDocs.push(Promise.all(membersOfProject));
  }

  // Nested array of members with fcmToken
  await Promise.all(userDocs);
  return { projects: projectsToNotify, users: userDocs.map(d => d.map(u => u.data())) };
}

const checkTasks = async (tasksRef) => {
  const tasks = await tasksRef.get();
  let asignees = [];
  let tasksToNotify = [];
  for (d in tasks.docs) {
    const task = d.data();
    const dl = new Date(task.deadline);
    if (dateIsWithinADay(dl)) {
      const docs = task.collection('asignees').get();
      asignees.push(docs);
      tasksToNotify.push(task);
    }
  }

  // Nested array of asignees to notify
  await Promise.all(asignees);

  let userDocs = [];
  for (a in asignees) {
    let asigneesOfTask = [];
    const docs = a.docs;
    for (d in docs) {
      const doc = admin.firestore().collection('users').doc(d.data().uid).get();
      asigneesOfTask.push(doc);
    }

    userDocs.push(Promise.all(asigneesOfTask));
  }

  // Nested array of asignees with fcmToken
  await Promise.all(userDocs);
  return { tasks: tasksToNotify, users: userDocs.map(d => d.map(u => u.data())) };
}

const sendNotification = async (user, topic) => {
  const message = {
    notification: {
      body: `${topic} deadline approaching`,
      title: 'Deadline approaching',
    },
    data: {
      body: `${topic} deadline approaching`,
      title: 'Deadline approaching',
    },
      android: {
      priority: 'high',
    },
    token: user.fcmToken,
  };

  await admin.messaging().send(message);
}

exports.deadlineCheck = async () => {
  console.log('Checking deadlines for all projects');
  const projectsRef = admin.firestore().collection('projects');
  const projectsUsers = await checkProjects(projectsRef);
  const tasksRef = admin.firestore().collectionGroup('tasks');
  const tasksUsers = await checkTasks(tasksRef);

  let awaitThis1 = []
  for (i = 0; i < projectsUsers.projects.length; ++i) {
    for (u in projectsUsers.users[i]) {
      awaitThis1.push(sendNotification(u, projectsUsers.projectsUsers[i].name));
    }
  }

  let awaitThis2 = []
  for (i = 0; i < taskUsers.tasks.length; ++i) {
    for (u in tasksUsers.users[i]) {
      awaitThis2.push(sendNotification(u, tasksUsers.tasks[i].description));
    }
  }

  await Promise.all(awaitThis1, awaitThis2);
}

