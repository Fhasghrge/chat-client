import { getUsers } from "./apis";

export const notifyBaseConfig = {
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'center'
  },
  autoHideDuration: 1500
}

export const parseRoomName = (names, username) => {
  for (let name of names) {
    if (typeof name !== 'string') {
      name = name[0];
    }
    if (name !== username) {
      return name;
    }
  }
  return names[0];
};



export const populateUsersFromLoadedMessages = async (users, dispatch, messages) => {
  const userIds = {};
  messages.forEach((message) => {
    userIds[message.from] = 1;
  });

  const ids = Object.keys(userIds).filter(
    (id) => users[id] === undefined
  );

  if (ids.length !== 0) {
    const newUsers = await getUsers(ids);
    dispatch({
      type: "append users",
      payload: newUsers,
    });
  }

};