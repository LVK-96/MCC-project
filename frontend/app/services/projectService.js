/* Service that provides project data from the backend */
import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000/projects'; // TODO: use env var for this

class ProjectService {

	getAll = async () => {
		try {
			const response = await axios.get(baseUrl);
			return response.data;
		} catch (exception) {
			return null;
		}
	};

	createProject = async (project) => {
		try {
			console.log('Creating project', project.name);
			// const response = await axios.post(baseUrl);
			// return response.data;
			project.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
			return project;
		} catch (exception) {
			console.log('Error creating project', exception);
			throw exception;
		}
	}
}

export default new ProjectService();
