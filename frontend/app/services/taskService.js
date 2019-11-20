import axios from 'axios';

// This is a tentative route assumption. Tasks may alternatively be
// located under api/project/{projectId}/tasks endpoint.
const baseUrl = 'http://10.0.2.2:3000/tasks'; // TODO: use env var for this

// Fetch tasks by project id.
const getTasksByProjectId = async (projectId) => {
	try {
		const response = await axios.get(`${baseUrl}?projectId=${projectId}`);
		return response.data;
	} catch (error) {
		console.log('Error fetching tasks', error);
		return null;
	}
};

// Update the task specified by id with the payload specified by task.
const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${baseUrl}/${id}`, task);
        return response.data;
    } catch (error) {
        console.log('Error updating task', error);
        return null;
    }
};

export default { getTasksByProjectId, updateTask };
