import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import moment from 'moment';

import Switch from "./components/switch";
import Chat from './pages/Chat';
import Notification from './pages/notification';
import Friends from './pages/Friends/friends';
import Setting from './pages/Setting/setting';
import Login from './pages/login';
import LoadingScreen from './pages/loading';

import { getOnlineUsers, getRooms } from "./apis";
import { useSocket, useUser } from './hooks';
import useAppStateContext, { AppContext } from './state';
import { parseRoomName } from './util'

export default function App() {
  const {
    user,
    loading,
    state,
    dispatch,
    onLogIn,
    onLogOut,
    onMessageSend,
  } = useAppHandlers();


  if (loading) return <LoadingScreen />
  if(!user) return <Login onLogIn={onLogIn}/>

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <Router>
        <div className="main-app container grid grid-cols-12 bg-gray-300 min-h-screen min-w-full rounded-2xl overflow-hidden">
          <div className="nav col-span-1 bg-slate-900 text-gray-400">
            <Switch user={user} onLogout={onLogOut} />
          </div>
          <main className="col-span-11 h-screen overflow-scroll">
            <Routes>
              <Route
                path="/"
                element={<Navigate replace to="/chat" />}
              />
              <Route
                path='/chat'
                element={
                    <Chat user={user} onMessageSend={onMessageSend} />
                  }
              />
              <Route path='/notification' element={<Notification />} />
              <Route path='/friends' element={<Friends />} />
              <Route path='/settings' element={<Setting user={user}/>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

const useAppHandlers = () => {
  const [state, dispatch] = useAppStateContext();
  const onUserLoaded = useCallback(
    (user) => {
      if (user !== null) {
        if (!state.users[user.id]) {
          dispatch({ type: "set user", payload: { ...user, online: true } });
        }
      }
    },
    [dispatch, state.users]
  );

  const { user, onLogIn, onLogOut, loading } = useUser(onUserLoaded, dispatch);
  const [socket, connected] = useSocket(user, dispatch);
  /** Socket joins specific rooms once they are added */
  useEffect(() => {
    if (user === null) {
      return;
    }
    if (connected) {
      /**
       * The socket needs to be joined to the newly added rooms
       * on an active connection.
       */
      const newRooms = [];
      Object.keys(state.rooms).forEach((roomId) => {
        const room = state.rooms[roomId];
        if (room.connected) {
          return;
        }
        newRooms.push({ ...room, connected: true });
        socket.emit("room.join", room.id);
      });
      if (newRooms.length !== 0) {
        dispatch({ type: "set rooms", payload: newRooms });
      }
    } else {
      /**
       * It's necessary to set disconnected flags on rooms
       * once the client is not connected
       */
      const newRooms = [];
      Object.keys(state.rooms).forEach((roomId) => {
        const room = state.rooms[roomId];
        if (!room.connected) {
          return;
        }
        newRooms.push({ ...room, connected: false });
      });
      if (newRooms.length !== 0) {
        dispatch({ type: "set rooms", payload: newRooms });
      }
    }
  }, [user, connected, dispatch, socket, state.rooms, state.users]);

  /** Populate default rooms when user is not null */
  useEffect(() => {
    if (Object.values(state.rooms).length === 0 && user !== null) {
      /** First of all fetch online users. */
      getOnlineUsers().then((users) => {
        dispatch({
          type: "append users",
          payload: users,
        });
      });
      /** Then get rooms. */
      getRooms(user.id).then((rooms) => {
        const payload = [];
        rooms.forEach(({ id, names }) => {
          payload.push({ id, name: parseRoomName(names, user.username) });
        });
        /** Here we also can populate the state with default chat rooms */
        dispatch({
          type: "set rooms",
          payload,
        });
        dispatch({ type: "set current room", payload: "0" });
      });
    }
  }, [dispatch, state.rooms, user]);

  const onMessageSend = useCallback(
    (message, roomId) => {
      if (typeof message !== "string" || message.trim().length === 0) {
        return;
      }
      if (!socket) {
        /** Normally there shouldn't be such case. */
        console.error("Couldn't send message");
      }
      socket.emit("message", {
        roomId: roomId,
        message,
        from: user.id,
        date: moment(new Date()).unix(),
      });
    },
    [user, socket]
  );

  return {
    user,
    loading,
    state,
    dispatch,
    onLogIn,
    onMessageSend,
    onLogOut,
  };
};
