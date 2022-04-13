import React, { useMemo } from "react";
import ChatList from "./components/ChatList";
import MessageList from "./components/MessageList";
import TypingArea from "./components/TypingArea";
import useChatHandlers from "./use-chat-handlers";

export default function Chat({ user, onMessageSend }) {
  const {
    onLoadMoreMessages,
    onUserClicked,
    message,
    setMessage,
    rooms,
    room,
    currentRoom,
    dispatch,
    messageListElement,
    roomId,
    messages,
    users,
  } = useChatHandlers();

  const isGroup = useMemo(() => {
    return !String(room?.id).includes(':');
  }, [room])

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-80 h-full bg-slate-200">
        <ChatList
          rooms={rooms}
          currentRoom={currentRoom}
          dispatch={dispatch}
        />
      </div>
      <div className="px-0 flex-column bg-white rounded-lg w-full">
        <div className="px-4 py-4" style={{ borderBottom: "1px solid #eee" }}>
          <h2 className="font-size-15 mb-0">{isGroup ? "Group-" + room?.name : room?.name}</h2>
        </div>
        <MessageList
          messageListElement={messageListElement}
          messages={messages}
          room={room}
          onLoadMoreMessages={onLoadMoreMessages}
          user={user}
          onUserClicked={onUserClicked}
          users={users}
        />

        {/* Typing area */}
        <TypingArea
          message={message}
          setMessage={setMessage}
          onSubmit={(e) => {
            e?.preventDefault();
            console.log(message.trim(), roomId);
            onMessageSend(message.trim(), roomId);
            setMessage("");

            messageListElement.current.scrollTop =
              messageListElement.current.scrollHeight;
          }}
        />
      </div>
    </div>
  );
}
