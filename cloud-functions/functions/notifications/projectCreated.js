const admin = require("firebase-admin");
const functions = require('firebase-functions');

exports.projectCreated = functions.https.onRequest(async (request, response) => {
  if (request.method === 'POST') {
    try {
      const { body } = request;
      console.log(`Sending project created notification to ${body.user.fcmToken}`);
      const message = {
        notification: {
          body: `Project ${body.project.name} created!`,
          title: 'Project created',
        },
        data: {
          body: `Project ${body.project.name} created!`,
          title: 'Project created',
        },
        android: {
          priority: 'high',
        },
        token: body.user.fcmToken,
      };

      await admin.messaging().send(message);
      response.status(200).json({ message: 'Notification sent!' });
    } catch (e) {
      console.log(e);
      console.log('Sending notification failed');
    }
  } else {
    response.status(400).end('Brokenk');
  }
});
