require('dotenv').config();
const admin = require('firebase-admin');

const { PORT } = process.env;
const { SERVICE_ACCOUNT_PATH } = process.env;

const serviceAccount = require(SERVICE_ACCOUNT_PATH);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();

module.exports = {
  db,
  PORT,
};