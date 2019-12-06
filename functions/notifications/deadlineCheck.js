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
  try {
    const projects = await projectsRef.get();
    let allMembers = [];
    let allOwners = [];
    let projectsToNotify = [];
    for (let d of projects.docs) {
      const project = d.data();
      const dl = new Date(project.deadline);
      if (dateIsWithinADay(dl)) {
        const members = admin.firestore().collection('projects').doc(project.id).collection('members').get();
        allMembers.push(members);
        const doc = admin.firestore().collection('users').doc(project.owner).get();
        allOwners.push(doc);
        projectsToNotify.push(project);
      }
    }

    allMembers = await Promise.all(allMembers);
    allMembers = allMembers.map(m => m.docs);
    allOwners = await Promise.all(allOwners);
    // Nested array of members (including owners) to notify
    for (i = 0; i < allOwners.length; ++i) {
      allMembers[i] = allMembers[i].concat(allOwners[i]);
    }

    let userDocs = [];
    for (let m of allMembers) {
      let membersOfProject = [];
      for (let d of m) {
        const doc = admin.firestore().collection('users').doc(d.data().uid).get();
        membersOfProject.push(doc);
      }

      userDocs.push(Promise.all(membersOfProject));
    }

    // Nested array of members with fcmToken
    userDocs = await Promise.all(userDocs);
    return { projects: projectsToNotify, users: userDocs.map(d => d.map(u => u.data())) };
  } catch (e) {
    console.log('e in checkProjects');
    console.log(e);
    throw e;
  }
}

const checkTasks = async (tasksRef) => {
  try {
    const tasks = await tasksRef.get();
    let allAsignees = [];
    let tasksToNotify = [];
    for (let d of tasks.docs) {
      const task = d.data();
      const dl = new Date(task.deadline);
      if (dateIsWithinADay(dl)) {
        const asignees = admin.firestore().collectionGroup('tasks').doc(task.id).collection('asignees').get();
        allAsignees.push(asignees);
        tasksToNotify.push(task);
      }
    }

    // Nested array of asignees to notify
    allAsignees = await Promise.all(allAsignees);
    allAsignees = allAsignees.map(a => a.docs);

    let userDocs = [];
    for (let a of allAsignees) {
      let asigneesOfTask = [];
      for (let d of a) {
        const doc = admin.firestore().collection('users').doc(d.data().uid).get();
        asigneesOfTask.push(doc);
      }

      userDocs.push(Promise.all(asigneesOfTask));
    }

    // Nested array of asignees with fcmToken
    userDocs = await Promise.all(userDocs);
    return { tasks: tasksToNotify, users: userDocs.map(d => d.map(u => u.data())) };
  } catch (e) {
    console.log('e in checkTasks');
    console.log(e);
    throw e;
  }
}

const sendNotification = async (user, topic) => {
  try {
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
  } catch (e) {
    console.log('e in message send');
    console.log(e);
    throw e;
  }
}

exports.deadlineCheck = async () => {
  try {
    console.log('Checking deadlines for all projects');
    const projectsRef = admin.firestore().collection('projects');
    const projectsUsers = await checkProjects(projectsRef);
    const tasksRef = admin.firestore().collectionGroup('tasks');
    const tasksUsers = await checkTasks(tasksRef);

    let awaitThis1 = []
    for (i = 0; i < projectsUsers.projects.length; ++i) {
      for (let u of projectsUsers.users[i]) {
        awaitThis1.push(sendNotification(u, projectsUsers.projects[i].name));
      }
    }

    let awaitThis2 = []
    for (i = 0; i < tasksUsers.tasks.length; ++i) {
      for (let u of tasksUsers.users[i]) {
        awaitThis2.push(sendNotification(u, tasksUsers.tasks[i].description));
      }
    }

    await Promise.all(awaitThis1, awaitThis2);
  } catch (e) {
    console.log('e in deadlineCheck');
    console.log(e);
    throw e;
  }
}

