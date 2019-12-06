require('dotenv').config();
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const { generatePDF } = require('./report-generation/generatePDF');
const { projectCreated } = require('./notifications/projectCreated');
const { memberAdded } = require('./notifications/memberAdded');
const { taskAssigned } = require('./notifications/taskAssigned');
const { deadlineCheck } = require('./notifications/deadlineCheck');

const { SERVICE_ACCOUNT_PATH } = process.env;
const { DEVELOPMENT } = process.env;

if (DEVELOPMENT) {
  const serviceAccount = require(SERVICE_ACCOUNT_PATH);
  admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   storageBucket: 'mcc-fall-2019-g20.appspot.com/',
  });
} else {
  admin.initializeApp();
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//

exports.deadline = functions.region('europe-west1')
  .pubsub.schedule('* * * * *') // Check deadlines every minute
  .onRun(async (context) => {
    try {
      await deadlineCheck();
    } catch (e) {
      console.log('Deadline check failed')
    }
});

exports.projectCreated = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}')
  .onCreate(async (snap, context) => {
    try {
      await projectCreated(snap.data());
    } catch (e) {
      console.log('Project created notification failed')
    }
});

exports.memberAdded = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}/members/{userId}')
  .onCreate(async (snap, context) => {
    try {
      const doc = await admin.firestore().collection('projects').doc(projectId).get();
      const project = doc.data();
      await memberAdded(snap.data(), project);
    } catch (e) {
      console.log('Member added notification failed');
    }
});

exports.taskAssigned = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}/tasks/{taskId}/asignees/{asigneeId}')
  .onCreate(async (snap, context) => {
    try {
      const doc = await admin.firestore().collection('projects').doc(projectId)
        .collection('tasks').doc(taskId).get();
      const task = doc.data();
      await taskAssigned(snap.data(), task);
    } catch (e) {
      console.log('Task assigned notification failed');
    }
});

exports.generatePDF = functions.region('europe-west1').https.onRequest(async (request, response) => {
  try {
    await generatePDF(request, response);
  } catch (e) {
    console.log('PDF generation failed');
  }
});
