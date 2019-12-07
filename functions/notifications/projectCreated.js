const admin = require("firebase-admin");

exports.projectCreated = async (project) => {
  try {
    const doc = await admin.firestore().collection('users').doc(project.owner).get();
    const user = doc.data();
    console.log(`Sending project created notification to ${user.fcmToken}`);
    const message = {
      notification: {
        body: `Project ${project.name} created!`,
        title: 'Project created',
      },
      data: {
        body: `Project ${project.name} created!`,
        title: 'Project created',
      },
      android: {
        priority: 'high',
      },
      token: user.fcmToken,
    };

    await admin.messaging().send(message);
  } catch (e) {
    console.log(e);
    console.log('Sending project created notification failed');
  }
};
