import React, { useMemo, useEffect } from "react";
import moment from "moment";

import { useAppState } from "@/state";
import { getMessages } from "@/apis";
import AvatarImage from "@/components/AvatarImage";
import OnlineIndicator from "../../../OnlineIndicator";
import "./style.css";

const IMG_TYPES = ['jpg', 'jpeg', 'png', 'gif'];

const ChatListItem = ({ room, active = false, onClick }) => {
  const { online, name, lastMessage, userId, isGroup } = useChatListItemHandlers(room);
  return (
    <div
      onClick={onClick}
      className={`flex rounded py-2 ${
        active ? "bg-white" : ""
      }`}
    >
      <div className="mr-1">
        <OnlineIndicator online={online} hide={isGroup} />
      </div>
      <div className="align-self-center mr-1">
        <AvatarImage name={name} id={userId} isGroup={isGroup} />
      </div>
      <div className="overflow-hidden">
        <h5 className="mb-1 font-bold truncate">{name}</h5>
        {lastMessage && (
          <LastMessage message={lastMessage.message}/>
        )}
      </div>
      {lastMessage && (
        <div className="text-xs self-end ml-auto mr-2 w-max text-gray-500">
          {moment.unix(lastMessage.date).format("LT")}
        </div>
      )}
    </div>
  );
};

function LastMessage({message}) {
  if(!message.includes('-splits-')) {
    return (
      <p className="truncate text-sm mb-0"> {message} </p>
    )
  }
  const type = message.split('.').pop();
  if(IMG_TYPES.includes(type)) {
    return (
      <p className="flex text-sm items-end">
        <svg t="1648625501528" className="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8543" width="200" height="200"><path d="M927.650909 833.163636H190.836364c-17.687273 0-32.116364-14.429091-32.116364-32.116363V313.250909c0-17.687273 14.429091-32.116364 32.116364-32.116364h736.814545c17.687273 0 32.116364 14.429091 32.116364 32.116364v487.796364c-0.465455 17.687273-14.429091 32.116364-32.116364 32.116363z" fill="#BBEBA1" p-id="8544"></path><path d="M860.16 788.014545H123.345455c-30.72 0-55.389091-24.669091-55.389091-55.38909V244.363636c0-30.72 24.669091-55.389091 55.389091-55.389091h736.814545c30.254545 0 55.389091 24.669091 55.389091 55.389091v487.796364c0 30.72-24.669091 55.854545-55.389091 55.854545zM123.345455 235.985455c-4.654545 0-8.843636 4.189091-8.843637 8.843636v487.796364c0 4.654545 4.189091 8.843636 8.843637 8.843636h736.814545c4.654545 0 8.843636-4.189091 8.843636-8.843636V244.363636c0-4.654545-4.189091-8.843636-8.843636-8.843636H123.345455z" fill="#353E43" p-id="8545"></path><path d="M253.207273 404.014545c-22.807273 0-40.96-18.618182-40.96-40.96s18.618182-40.96 40.96-40.96 40.96 18.618182 40.96 40.96-18.152727 40.96-40.96 40.96z m0-46.545454c-2.792727 0-5.585455 2.327273-5.585455 5.585454s2.327273 5.585455 5.585455 5.585455 5.585455-2.327273 5.585454-5.585455-2.792727-5.585455-5.585454-5.585454zM156.858182 783.825455c-4.654545 0-9.309091-1.396364-13.032727-4.189091-10.705455-7.447273-13.032727-21.876364-6.05091-32.581819l112.64-162.443636c13.032727-18.618182 34.909091-29.323636 59.578182-29.323636 24.669091 0 47.010909 11.170909 59.578182 29.323636l75.869091 109.381818c7.447273 10.705455 4.654545 25.134545-6.050909 32.581818-10.705455 7.447273-25.134545 4.654545-32.581818-6.050909l-75.869091-109.381818c-4.189091-6.050909-12.101818-9.309091-21.410909-9.309091-9.309091 0-17.221818 3.723636-21.410909 9.309091l-112.64 162.443637c-3.723636 6.516364-11.170909 10.24-18.618182 10.24z" fill="#353E43" p-id="8546"></path><path d="M399.825455 786.618182c-4.654545 0-9.309091-1.396364-13.032728-4.189091-10.705455-7.447273-13.032727-21.876364-6.050909-32.581818l192.698182-276.945455c15.825455-22.807273 43.287273-36.305455 74.007273-36.305454s58.181818 13.498182 74.007272 36.305454l174.545455 251.345455c7.447273 10.705455 4.654545 25.134545-6.050909 32.581818-10.705455 7.447273-25.134545 4.654545-32.581818-6.050909l-174.545455-251.345455c-6.981818-10.24-20.48-16.290909-35.84-16.290909s-28.392727 6.050909-35.84 16.290909L418.909091 776.843636c-4.189091 6.516364-11.636364 9.774545-19.083636 9.774546z" fill="#353E43" p-id="8547"></path></svg>
        图片消息
      </p>
    )
  }
  return (
    <p className="flex text-sm items-end">
      <svg t="1648625567351" className="icon w-6 h-6" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10147" width="200" height="200"><path d="M853.333333 960H170.666667V64h469.333333l213.333333 213.333333z" fill="#90CAF9" p-id="10148"></path><path d="M821.333333 298.666667H618.666667V96z" fill="#E1F5FE" p-id="10149"></path></svg>
      文件消息
    </p>
  )
}

const useChatListItemHandlers = ( room ) => {
  const { id, name } = room;
  const [state] = useAppState();

  /** Here we want to associate the room with a user by its name (since it's unique). */
  const [isUser, online, userId] = useMemo(() => {
    try {
      let pseudoUserId = Math.abs(parseInt(id.split(":").reverse().pop()));
      const isUser = pseudoUserId > 0;
      const usersFiltered = Object.entries(state.users)
        .filter(([, user]) => user.username === name)
        .map(([, user]) => user);
      let online = false;
      if (usersFiltered.length > 0) {
        online = usersFiltered[0].online;
        pseudoUserId = +usersFiltered[0].id;
      }
      return [isUser, online, pseudoUserId];
    } catch (_) {
      return [false, false, "0"];
    }
  }, [id, name, state.users]);

  const isGroup = useMemo(() => {
    return !String(id).includes(':');
  }, [id])

  const lastMessage = useLastMessage(room);

  return {
    isGroup,
    isUser,
    online,
    userId,
    name: room.name,
    lastMessage,
  };
};

const useLastMessage = (
  /** @type {import("../../../../../../state").Room} */ room
) => {
  const [, dispatch] = useAppState();
  const { lastMessage } = room;
  useEffect(() => {
    if (lastMessage === undefined) {
      /** need to fetch it */
      if (room.messages === undefined) {
        getMessages(room.id, 0, 1).then((messages) => {
          let message = null;
          if (messages.length !== 0) {
            message = messages.pop();
          }
          dispatch({
            type: "set last message",
            payload: { id: room.id, lastMessage: message },
          });
        });
      } else if (room.messages.length === 0) {
        dispatch({
          type: "set last message",
          payload: { id: room.id, lastMessage: null },
        });
      } else {
        dispatch({
          type: "set last message",
          payload: {
            id: room.id,
            lastMessage: room.messages[room.messages.length - 1],
          },
        });
      }
    }
  }, [lastMessage, dispatch, room]);

  return lastMessage;
};

export default ChatListItem;
