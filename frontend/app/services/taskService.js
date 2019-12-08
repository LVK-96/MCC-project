import axios from 'axios';
import api_url, { apiKey } from '../util/config';

const baseUrl = api_url + '/projects';

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

// Fetch tasks by project id.
const getTasksByProjectId = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}/${projectId}/tasks?key=${apiKey}`, {
        headers: {
        Authorization: token,
        },
    });
		return response.data;
	} catch (error) {
		console.log('Error fetching tasks', error);
		return null;
	}
};

// Update the task specified by id with the payload specified by task.
const updateTask = async (projectId, taskId, task) => {
    try {
        const response = await axios.put(`${baseUrl}/${projectId}/tasks/${taskId}?key=${apiKey}`, task, {
          headers: {
          Authorization: token,
          },
        });
        return response.data;
    } catch (error) {
        console.log('Error updating task', error);
        return null;
    }
};

// Creates a task for the project designated by projectId.
const createTask = async (projectId, task) => {
    try {
        const response = await axios.post(`${baseUrl}/${projectId}/tasks?key=${apiKey}`, task,{
          headers: {
          Authorization: token,
          },
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

// Updates the status of this task.
// Returns the updated task.
const updateTaskStatus = async (projectId, taskId, status) => {
    try {
        const response = await axios.put(`${baseUrl}/${projectId}/tasks/${taskId}?key=${apiKey}`,
        { status: status }, {
          headers: {
          Authorization: token,
          },
        });
        return response.data;
    } catch (error) {
        return null;
    }
};

const getAssigneesByProjectAndTaskId = async (projectId, taskId) => {
    try {
        const response = await axios.get(`${baseUrl}/${projectId}/tasks/${taskId}/assignees?key=${apiKey}`,
        { headers: { Authorization: token }});
        return response.data;
    } catch (err) {
        console.log('Error fecthing task assignees');
        return null;
    }
};

const addAssigneesToTask = async (projectId, taskId, users) => {
    try {
        const response = await axios.get(`${baseUrl}/${projectId}/tasks/${taskId}/assignees?key=${apiKey}`,
        users, { headers: { Authorization: token }});
        return response.data;
    } catch (err) {
        console.log('Error fecthing task assignees');
        return null;
    }
};

export default { getTasksByProjectId, updateTask, createTask,
    updateTaskStatus, setToken, getAssigneesByProjectAndTaskId,
    addAssigneesToTask };
