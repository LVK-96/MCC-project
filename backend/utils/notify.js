const axios = require('axios');

const sendProjectCreated = async (project) => {
  try {
    await axios.post(process.env.SEND_CREATED_PATH, project);
  } catch (e) {
    console.log(e);
    console.log('Invoking cloud function failed');
  }
};

module.exports = { sendProjectCreated };
