import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { parseRoomName } from "./util";
import { getMe, login, logout } from './apis'

const updateUser = (newUser, dispatch, infoMessage) => {
  dispatch({ type: "set user", payload: newUser });
  if (infoMessage !== undefined) {
    // info form general room
    dispatch({
      type: "append message",
      payload: {
        id: "0",
        message: {
          /** Date isn't shown in the info message, so we only need a unique value */
          date: Math.random() * 10000,
          from: "info",
          message: infoMessage,
        },
      },
    });
  }
};

const useSocket = (user, dispatch) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef(null);
  const socket = socketRef.current;

  /** First of all it's necessary to handle the socket io connection */
  useEffect(() => {
    if (user === null) {
      if (socket !== null) {
        socket.disconnect();
      }
      setConnected(false);
    } else {
      if (socket !== null) {
        socket.connect();
      } else {
        socketRef.current = io('ws://localhost:4000');
      }
      setConnected(true);
    }
  }, [user, socket]);

  /**
   * Add event listeners.
   */
  useEffect(() => {
    if (connected && user) {
      socket.on("user.connected", (newUser) => {
        updateUser(newUser, dispatch, `${newUser.username} connected`);
      });
      socket.on("user.disconnected", (newUser) =>
        updateUser(newUser, dispatch, `${newUser.username} left`)
      );
      socket.on("show.room", (room) => {
        console.log({ user });
        dispatch({
          type: "add room",
          payload: {
            id: room.id,
            name: parseRoomName(room.names, user.username),
          },
        });
      });
      socket.on("message", (message) => {
        /** Set user online */
        dispatch({
          type: "make user online",
          payload: message.from,
        });
        dispatch({
          type: "append message",
          payload: { id: message.roomId === undefined ? "0" : message.roomId, message },
        });
      });
    } else {
      // clear all socket listeners when logout
      if (socket) {
        socket.off("user.connected");
        socket.off("user.disconnected");
        socket.off("user.room");
        socket.off("message");
      }
    }
  }, [connected, user, dispatch, socket]);

  return [socket, connected];
};

const useUser = (onUserLoaded = () => { }, dispatch) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const onLogIn = (
    username = "",
    password = "",
    onError = () => { },
    onLoading = () => { }
  ) => {
    onError(null);
    onLoading(true);
    login(username, password)
      .then((x) => {
        console.log(x);
        if(x.code) {
          onError(x.message)
        }else {
          setUser(x);
        }
      })
      .catch((e) => onError(e.message))
      .finally(() => onLoading(false));
  };

  const onLogOut = async () => {
    logout().then(() => {
      setUser(null);
      dispatch({ type: "clear" });
      setLoading(true);
    });
  };

  useEffect(() => {
    if (!loading) {
      return;
    }
    getMe().then((user) => {
      setUser(user);
      setLoading(false);
      onUserLoaded(user);
    });
  }, [onUserLoaded, loading]);

  return { user, onLogIn, onLogOut, loading };
};

export {
  updateUser,
  useSocket,
  useUser
};
