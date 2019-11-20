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

		// const response = await axios.post(baseUrl);
		// return response.data;

		// Remove these when back-end supports project creation.
		project.creationDate = new Date();
		project.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		return project;
	} catch (exception) {
		console.log('Error creating project', exception);
		throw exception;
	}
};

// Fetch tasks by project id.
const getTasksByProjectId = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}/${projectId}/tasks`);
		return response.data;
	} catch (error) {
		console.log('Error', error);
		return null;
	}
};

export default { getAll, createProject, getTasksByProjectId };
