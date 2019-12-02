const admin = require("firebase-admin");
require('dotenv').config();

const { SERVICE_ACCOUNT_PATH } = process.env;
const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.sendCreated = async (request, response) => {
  switch (request.method) {
    case 'POST':
      try {
        console.log('Sending project created notification!');
        const { body } = request;
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
      break;
    default:
      response.status(400).end('Brokenk');
      break;
  }
}

