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
  .pubsub.schedule('* * * * *') // Check deadlines every hour
  .onRun(async (context) => {
    deadlineCheck();
});

exports.projectCreated = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}')
  .onCreate((snap, context) => {
  projectCreated(snap.data());
});

exports.memberAdded = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}/members/{userId}')
  .onCreate(async (snap, context) => {
    const doc = await admin.firestore().collection('projects').doc(projectId).get();
    const project = doc.data();
    memberAdded(snap.data(), project);
});

exports.taskAssigned = functions.region('europe-west1')
  .firestore
  .document('projects/{projectId}/tasks/{taskId}')
  .onCreate(async (snap, context) => {
    const doc = await admin.firestore().collection('projects').doc(projectId).get();
    const project = doc.data();
    taskAssigned(snap.data());
});

exports.generatePDF = functions.region('europe-west1').https.onRequest((request, response) => {
  generatePDF(request, response);
});
