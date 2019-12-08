import axios from 'axios';
import api_url, { apiKey } from '../util/config';


const baseUrl = api_url + '/projects';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getMembers = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}/${projectId}/members?key=${apiKey}`, {
        headers: {
        Authorization: token,
        },
    });
		return response.data;
	} catch (e) {
		console.log('Error fetching members', e);
		throw e;
	}
};

const addMember = async (newMember, projectId) => {
  try {
    const response = await axios.post(`${baseUrl}/${projectId}/members?key=${apiKey}`, newMember, {
      headers: {
      Authorization: token,
      },
    });
    return response.data;
  } catch (e) {
    console.log('Error adding member');
    throw e;
  }
};

export default {
  setToken,
  getMembers,
  addMember,
}
