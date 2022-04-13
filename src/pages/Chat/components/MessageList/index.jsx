import React from "react";
import { MESSAGES_TO_LOAD } from "@/apis";
import InfoMessage from "./components/InfoMessage";
import MessagesLoading from "./components/MessagesLoading";
import NoMessages from "./components/NoMessages";
import ReceiverMessage from "./components/ReceiverMessage";
import SenderMessage from "./components/SenderMessage";

const MessageList = ({
  messageListElement,
  messages,
  room,
  onLoadMoreMessages,
  user,
  onUserClicked,
  users,
}) => (
  <div
    className="h-3/4"
  >
    {messages === undefined ? (
      <MessagesLoading />
    ) : messages.length === 0 ? (
      <NoMessages />
    ) : (
      <></>
    )}
    <div ref={messageListElement} className="px-4 pt-5 h-full overflow-scroll">
      {messages && messages.length !== 0 && (
        <>
          {room.offset && room.offset >= MESSAGES_TO_LOAD ? (
            <div className="d-flex flex-row align-items-center mb-4">
              <div
                style={{ height: 1, backgroundColor: "#eee", flex: 1 }}
              ></div>
              <div className="mx-3">
                <button
                  aria-haspopup="true"
                  aria-expanded="true"
                  type="button"
                  onClick={onLoadMoreMessages}
                  className="btn rounded-button btn-secondary nav-btn"
                  id="__BVID__168__BV_toggle_"
                >
                  Load more
                </button>
              </div>
              <div
                style={{ height: 1, backgroundColor: "#eee", flex: 1 }}
              ></div>
            </div>
          ) : (
            <></>
          )}
          {messages.map((message, x) => {
            // console.log(message);
            const key = message.message + message.date + message.from + x;
            if (message.from === "info" || message.bot) {
              return <InfoMessage key={key} message={message.message} />;
            }
            if (+message.from !== +user.id) {
              return (
                <SenderMessage
                  onUserClicked={() => onUserClicked(message.from)}
                  key={key}
                  message={message.message}
                  date={message.date}
                  user={users[message.from]}
                />
              );
            }
            return (
              <ReceiverMessage
                username={
                  users[message.from] ? users[message.from].username : ""
                }
                key={key}
                message={message.message}
                date={message.date}
              />
            );
          })}
        </>
      )}
    </div>
  </div>
);
export default MessageList;
