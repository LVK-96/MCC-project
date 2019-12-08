/* Service that provides project data from the backend */
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import UUIDGenerator from 'react-native-uuid-generator';
import createCorrectRes from '../util/createCorrectRes';
import api_url, { apiKey } from '../util/config';

const baseUrl = api_url + '/projects';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const getAll = async () => {
	try {
		const response = await axios.get(`${baseUrl}?key=${apiKey}`, {
			headers: {
			Authorization: token,
			},
		});
		return response.data;
	} catch (exception) {
		return null;
	}
};

const createProject = async (project, imageRes) => {
	try {
		console.log(project);
		console.log('Creating project', project.name);
		const respURI = await createCorrectRes(project.iconSource, imageRes);
		const stats = await RNFetchBlob.fs.stat(respURI);

		//parse path
		const format = stats.path.split('.').slice(-1)[0];
		const storageRef = storage().ref();
		const iconRef = storageRef.child(`projectIcons/${await UUIDGenerator.getRandomUUID()}.${format}`);
		await iconRef.putFile(stats.path);
		const path = iconRef.toString();

		const response = await axios.post(`${baseUrl}?key=${apiKey}`, { ...project, iconSource: path }, {
		headers: {
			Authorization: token,
		},
	});
	console.log(response.data);
    return response.data;
	} catch (exception) {
		console.log('Error creating project', exception);
		throw exception;
	}
};

const deleteProject = async (id) => {
	try {
		const response = await axios.delete(`${baseUrl}/${id}?key=${apiKey}`, {
			headers: {
				Authorization: token,
			},
		});
		return response.data;
	} catch (err) {
		console.log('Error deleting project', err);
		return null;
	}
};

const getImagesByProjectId = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/${id}/images?key=${apiKey}`, {
			headers: { Authorization: token }
		});
		return response.data;
	} catch (err) {
		console.log('Error fetching project images');
		return null;
	}
};

const createImage = async (projectId, image) => {
	try {
		// Create the file in firebase storage.
		const format = image.path.split('.').reverse()[0];
		const storageRef = storage().ref();
		const uuid = await UUIDGenerator.getRandomUUID();

		const fileRef = storageRef.child(`projectFiles/${uuid}.${format}`);
		await fileRef.putFile(image.path);
		const path = fileRef.toString();

		// Make the request.
		image.source = path;
		image.uid = uuid;

		const response = await axios.post(`${baseUrl}/${projectId}/images?key=${apiKey}`, image, {
			headers: { Authorization: token },
		});
		return response.data;
	} catch (exception) {
		console.log('Error creating project image', exception);
		return null;
	}
}

const getFilesByProjectId = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/${id}/files?key=${apiKey}`, {
			headers: {
			Authorization: token,
			},
		});
		return response.data;
	} catch (exception) {
		console.log("Error fetching project files");
		return [];
	}
};

const createFile = async (projectId, file) => {
	try {
		// Create the file in firebase storage.
		const stats = await RNFetchBlob.fs.stat(file.path);
		const format = stats.path.split('.').reverse()[0];
		const storageRef = storage().ref();
		const uuid = await UUIDGenerator.getRandomUUID();

		const fileRef = storageRef.child(`projectFiles/${uuid}.${format}`);
		await fileRef.putFile(stats.path);
		const path = fileRef.toString();

		// Make the request.
    	file.name = stats.filename;
		file.source = path;
		file.uid = uuid;

		const response = await axios.post(`${baseUrl}/${projectId}/files?key=${apiKey}`, file, {
			headers: {
			Authorization: token,
			},
		});
		return response.data;
	} catch (exception) {
		console.log('Error creating project file', exception);
		return null;
	}
};

const createFileFromRef = async (projectId, ref) => {
  try {
    const path = ref.toString();
    // Make the request.
    const uuid = await UUIDGenerator.getRandomUUID();
    const file = {
      name: `${projectId}-report`,
      source: path,
      uid: uuid,
    }

    const response = await axios.post(`${baseUrl}/${projectId}/files?key=${apiKey}`, file, {
      headers: {
      Authorization: token,
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

const getMembersByProjectId = async (id) => {
	try {
		const response = await axios.get(`${baseUrl}/${id}/members`);
		return response.data;
	} catch (ex) {
		console.log('Error fetching project members');
		return null;
	}
};

export default { getAll, createProject, setToken,
	getFilesByProjectId, createFile, deleteProject,
	getImagesByProjectId, createImage, getMembersByProjectId, createFileFromRef };
