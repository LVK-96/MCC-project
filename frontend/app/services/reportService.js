// Generate project report using cloud function

import axios from 'axios';

const functionUrl = 'https://europe-west1-mcc-fall-2019-g20.cloudfunctions.net/generatePDF';

const generate = async (project) => {
  try {
    const resp = await axios.post(functionUrl, project);
    return resp.data;
  } catch (e) {
    throw e;
  }
}

export default { generate };
