import axios from 'axios';

const baseUrl = 'http://10.0.2.2:3000/users'; // TODO: use env var for this

const mockUsers = [
    {
        id: 1,
        name: 'Joni Jonila',
    },
    {
        id: 2,
        name: 'Matti Mattinen',
    },
    {
        id: 3,
        name: 'Mikko Mikkonen',
    },
];

let token = null;

const getAll = async () => {
    try {
        const response = await axios.get(baseUrl, {
			headers: {
			Authorization: token,
			},
		});
		return response.data;
    } catch (exception) {
        return mockUsers;
    }
};

export default { getAll };
