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

exports.deadlineCheck = async () => {
  console.log('Checking deadlines for all projects');
  const projects = await admin.firestore().collection('projects').get();
  const tasks = await admin.firestore().collectionGroup('tasks').get();

  for (d in projects.docs) {
    const project = d.data();
    const dl = new Date(project.deadline);
    if (dateIsWithinADay(dl)) {
      const doc = await admin.firestore().collection('users').doc(project.owner).get();
      const user = doc.data();
      const message = {
        notification: {
          body: `${project.name} deadline approaching`,
          title: 'Deadline approaching',
        },
        data: {
          body: `${project.name} deadline approaching`,
          title: 'Deadline approaching',
        },
        android: {
          priority: 'high',
        },
        token: user.fcmToken,
      };

    await admin.messaging().send(message);
    }
  }
}
