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
        return mockUsers;
    }
};

const searchByName = async (name, ownUid) => {
  try {
    const response = await axios.get(`${baseUrl}/search?name=${name}`, {
      headers: {
			Authorization: token,
      },
    });
    const ret = response.data.filter(u => u.uid !== ownUid); // Cloud firestore does'nt support inequality tests
    return ret;
  } catch (exception) {
    console.log('User search failed', exception);
    return [];
  }
}

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`, {
      headers: {
      Authorization: token,
      },
    });
    return response.data;
  } catch (exception) {
    console.log('User get by id failed');
    return {}
  }
};

const saveUser = async (user) => {
  try {
    const response = await axios.post(baseUrl, user, {
      headers: {
      Authorization: token,
      },
    });
    return response.data;
  } catch (exception) {
    throw exception;
  }
};

const updateUser = async (user) => {
  try {
    const response = await axios.put(`${baseUrl}/${user.uid}`, user, {
      headers: {
      Authorization: token,
      },
    });
    return response.data;
  } catch (exception) {
    console.log('User update failed');
  }
};

export default { setToken, getAll, searchByName, getById, updateUser, saveUser };

