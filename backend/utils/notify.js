const axios = require('axios');
const admin = require('firebase-admin');

const sendProjectCreated = async (project) => {
  try {
    const user = await admin.firestore().collection('users').doc(project.owner).get();
    await axios.post(process.env.CLOUD_FUNCTIONS_PATH + '/projectCreated', {project: project, user: user.data() });
  } catch (e) {
    console.log(e);
    console.log('Invoking cloud function failed');
  }
};

module.exports = { sendProjectCreated };
