const admin = require("firebase-admin");

exports.memeberAdded = async (member, project) => {
  try {
    const doc = await admin.firestore().collection('users').doc(member.uid).get();
    const user = doc.data();
    console.log(`Sending member added notification to ${user.fcmToken}`);
    const message = {
      notification: {
        body: `Added to ${project.name}`,
        title: 'Added to project',
      },
      data: {
        body: `Added to ${project.name}`,
        title: 'Added to project',
      },
      android: {
        priority: 'high',
      },
      token: user.fcmToken,
    };

    await admin.messaging().send(message);
  } catch (e) {
    console.log(e);
    console.log('Sending member added notification failed');
  }
};

