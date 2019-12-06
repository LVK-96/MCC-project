import axios from 'axios';
import api_url from '../util/config';

const baseUrl = api_url + '/projects';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getMembers = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}/${projectId}/members`, {
        headers: {
        Authorization: token,
        },
    });
    console.log(response.data);
		return response.data;
	} catch (e) {
		console.log('Error fetching members', e);
		throw e;
	}
};

export default {
  setToken,
  getMembers
}
