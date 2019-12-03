require('dotenv').config();
const functions = require('firebase-functions');
const admin = require("firebase-admin");

const { generatePDF } = require('./report-generation/generatePDF');
const { projectCreated } = require('./notifications/projectCreated');

const { SERVICE_ACCOUNT_PATH } = process.env;
const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'mcc-fall-2019-g20.appspot.com/',
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.generatePDF = functions.https.onRequest((request, response) => {
  generatePDF(request, response);
});

exports.projectCreated = functions.https.onRequest((request, response) => {
  projectCreated(request, response);
});
