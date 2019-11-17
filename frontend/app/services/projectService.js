/* Service that provides project data from the backend */
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000/projects'; // TODO: use env var for this


const getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (exception) {
		return null;
	}
};

const createProject = async (project) => {
	try {
		console.log('Creating project', project.name);
		const response = await axios.post(baseUrl, project);
		return response.data;
	} catch (exception) {
		console.log('Error creating project', exception);
		throw exception;
	}
};

export default { getAll, createProject };
