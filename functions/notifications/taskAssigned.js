const admin = require("firebase-admin");

exports.taskAssigned = async (task) => {
  try {
    const doc = await admin.firestore().collection('users').doc(task.assignedTo).get();
    const user = doc.data();
    console.log(`Sending task as-signed notification to ${user.fcmToken}`);
    const message = {
      notification: {
        body: `Assigned to ${task.name}`,
        title: 'Assigned to task',
      },
      data: {
        body: `Assigned to ${task.name}`,
        title: 'Assigned to task',
      },
      android: {
        priority: 'high',
      },
      token: user.fcmToken,
    };

    await admin.messaging().send(message);
  } catch (e) {
    console.log(e);
    console.log('Sending notification failed');
  }
};

