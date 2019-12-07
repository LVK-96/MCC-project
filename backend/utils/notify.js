const axios = require('axios');

const baseUrl = 'http://localhost:5001/mcc-fall-2019-g20/europe-west1';

const sendMemberAdded = async (project, member) => {
  try {
    await axios.post(baseUrl + '/memberAdded', {project: project, member: member });
  } catch (e) {
    console.log('Calling member added failed');
  }
};

module.exports = { sendMemberAdded };
