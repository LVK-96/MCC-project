/* Service that provides project data from the backend */
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import UUIDGenerator from 'react-native-uuid-generator';
import api_url from '../util/config';

const baseUrl = api_url + '/projects';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = async () => {
	try {
		const response = await axios.get(baseUrl, {
			headers: {
			Authorization: token,
			},
		});
		return response.data;
	} catch (exception) {
		return null;
	}
};

const createProject = async (project) => {
	try {
		console.log('Creating project', project.name);
    const stats = await RNFetchBlob.fs.stat(project.iconSource);
    const format = stats.path.split('.')[1];
    const storageRef = storage().ref();
    const iconRef = storageRef.child(`projectIcons/${await UUIDGenerator.getRandomUUID()}.${format}`);
    await iconRef.putFile(stats.path);
    const path = iconRef.toString();
    const response = await axios.post(baseUrl, { ...project, iconSource: path }, {
			headers: {
        Authorization: token,
			},
    });
    return response.data;
	} catch (exception) {
		console.log('Error creating project', exception);
		throw exception;
	}
};

export default { getAll, createProject, setToken };
