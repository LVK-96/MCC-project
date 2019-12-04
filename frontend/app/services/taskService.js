import axios from 'axios';
import api_url from '../util/config';

const baseUrl = api_url + '/projects';

// Fetch tasks by project id.
const getTasksByProjectId = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}/${projectId}/tasks`);
		return response.data;
	} catch (error) {
		console.log('Error fetching tasks', error);
		return null;
	}
};

// Update the task specified by id with the payload specified by task.
const updateTask = async (projectId, taskId, task) => {
    try {
        const response = await axios.put(`${baseUrl}/${projectId}/tasks/${taskId}`, task);
        return response.data;
    } catch (error) {
        console.log('Error updating task', error);
        return null;
    }
};

// Creates a task for the project designated by projectId.
const createTask = async (projectId, task) => {
    try {
        const response = await axios.put(`${baseUrl}/${projectId}/tasks`, task);
        return response.data;
    } catch (error) {
        // TODO: Remove this
        task.status = 'PENDING';
        task.project = projectId;
        task.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        //return null;
        return task;
    }
};

export default { getTasksByProjectId, updateTask, createTask };
