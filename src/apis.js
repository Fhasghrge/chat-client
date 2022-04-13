import axios from 'axios';
axios.defaults.withCredentials = true;

export const MESSAGES_TO_LOAD = 15;

axios.defaults.baseURL = '/api'

export const register = (username, password, email) => {
  return axios.post('/register', {
    username,
    password,
    email
  }).then(x => x.data)
    .catch(e => {
      throw new Error(
        e.response
        && e.response.data
        && e.response.data.message
      );
    })
}

export const login = (username, password) => {
  return axios.post('/login', {
    username,
    password
  }).then(x =>
    x.data
  ).catch(e => {
    throw new Error(
      e.response
      && e.response.data
      && e.response.data.message
    );
  });
};

export const getMe = () => {
  return axios.get('/me')
    .then(x => x.data)
};


export const logout = () => {
  return axios.post('/logout')
}


export const getAllFriends = async () => {
  return axios.get('/allFriends').then(res => res.data)
}

export const getAllFriendsInfos = async () => {
  const allFridIds = await getAllFriends();
  if (allFridIds?.errcode !== 0)
    return []

  const fridInfos = await getUsers(allFridIds.data.friends);
  return fridInfos;
}

export const search = async (searchKey) => {
  return axios
    .get(`/search?searchKey=${searchKey}`)
    .then(res => res.data)
}

export const addRoom = async (userid) => {
  return axios.post(`/room`, { userid }).then(x => x.data);
};

export const getMessages = (id,
  offset = 0,
  size = MESSAGES_TO_LOAD
) => {
  return axios.get(`/room/${id}/messages`, {
    params: {
      offset,
      size
    }
  })
    .then(x => x.data.reverse());
};

export const getUsers = (ids) => {
  return axios.get(`/users`, { params: { ids } }).then(x => x.data);
};

export const getOnlineUsers = () => {
  return axios.get(`/users/online`).then(x => x.data);
};

export const getRooms = async (userId) => {
  return axios.get(`/rooms/${userId}`).then(x => x.data);
};


export const addFriend = (userId) => {
  return axios.get(`/addFriends?friId=${userId}`).then(res => res.data)
}

export const updateSelfInfo = (infos) => {
  return axios.post('/updateInfos', { ...infos }).then(res => res.data);
}

export const createGroup = (groupName, groups) => {
  return axios.post('/createGroup', { groupName, groups }).then(res => res.data)
}

export const appendFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post('/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res.data)
}