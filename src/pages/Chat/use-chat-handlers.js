import { useEffect,useCallback, useState, useRef } from "react";

import { addRoom, getMessages } from "@/apis";
import { useAppState } from "@/state";
import { populateUsersFromLoadedMessages } from "@/util";

const useChatHandlers = () => {
  const [state, dispatch] = useAppState();
  const messageListElement = useRef(null);

  const room = state.rooms[state.currentRoom];
  const roomId = room?.id;
  const messages = room?.messages;

  const [message, setMessage] = useState("");

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      if (messageListElement.current) {
        messageListElement.current.scrollTop = 0;
      }
    }, 0);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (messageListElement.current) {
      messageListElement.current.scrollTo({
        top: messageListElement.current.scrollHeight,
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const onFetchMessages = useCallback(
    (offset = 0, prepend = false) => {
      getMessages(roomId, offset).then(async (messages) => {
        await populateUsersFromLoadedMessages(state.users, dispatch, messages);

        dispatch({
          type: prepend ? "prepend messages" : "set messages",
          payload: { id: roomId, messages: messages },
        });
        if (prepend) {
          setTimeout(() => {
            scrollToTop();
          }, 10);
        } else {
          scrollToBottom();
        }
      });
    },
    [dispatch, roomId, scrollToBottom, scrollToTop, state.users]
  );

  useEffect(() => {
    if (roomId === undefined) {
      return;
    }
    if (messages === undefined) {
      onFetchMessages();
    }
  }, [
    messages,
    dispatch,
    roomId,
    state.users,
    state,
    scrollToBottom,
    onFetchMessages,
  ]);

  useEffect(() => {
    if (messageListElement.current) {
      scrollToBottom();
    }
  }, [scrollToBottom, roomId]);

  const onUserClicked = async (userId) => {
    const targetUser = state.users[userId];
    let roomId = targetUser.room;
    if (roomId === undefined) {
      const room = await addRoom(userId);
      roomId = room.id;
      dispatch({ type: "set user", payload: { ...targetUser, room: roomId } });
      dispatch({
        type: "add room",
        payload: { id: roomId, name: state?.users?.[userId].username },
      });
    }
    dispatch({ type: "set current room", payload: roomId });
  };

  const onLoadMoreMessages = useCallback(() => {
    onFetchMessages(room.offset, true);
  }, [onFetchMessages, room]);

  return {
    onLoadMoreMessages,
    onUserClicked,
    message,
    setMessage,
    dispatch,
    room,
    rooms: state.rooms,
    currentRoom: state.currentRoom,
    messageListElement,
    roomId,
    users: state.users,
    messages,
  };
};
export default useChatHandlers;