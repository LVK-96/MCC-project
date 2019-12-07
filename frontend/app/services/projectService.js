/* Service that provides project data from the backend */
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import UUIDGenerator from 'react-native-uuid-generator';
import ImageResizer from 'react-native-image-resizer';

const baseUrl = 'http://10.0.2.2:3000/projects'; // TODO: use env var for this

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
		//console.log(response.data);
		return response.data;
	} catch (exception) {
		//console.log(exception);
		return null;
	}
};

const createProject = async (project) => {
	try {
		console.log('Creating project', project.name);
		const test = true;
		let respURI = project.iconSource;
		//TODO: determine if to resize and how from user input
		if (test) {
			//resize image
			respURI =  await ImageResizer.createResizedImage(project.iconSource, 640, 480, 'PNG', 100, 0, null); //is saved to a cache folder
		}
		const stats = await RNFetchBlob.fs.stat(respURI.path);
		//parse path
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
	console.log(response.data);
    return response.data;
	} catch (exception) {
		console.log('Error creating project', exception);
		throw exception;
	}
};

export default { getAll, createProject, setToken };
