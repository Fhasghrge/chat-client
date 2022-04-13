import React, { useMemo } from "react";
import ChatListItem from "./components/ChatListItem";
import More from "./components/More";

const ChatList = ({ rooms, dispatch, currentRoom }) => {
  const processedRooms = useMemo(() => {
    console.log(rooms);
    const roomsList = Object.values(rooms);
    const main = roomsList.filter((x) => !String(x.id)?.includes(':'));
    let other = roomsList.filter((x) => String(x.id)?.includes(':'));
    other = other.sort(
      (a, b) => +a.id.split(":").pop() - +b.id.split(":").pop()
    );
    return [...main, ...other];
  }, [rooms]);
  return (
    <>
      <div className="flex-column pr-2 pl-1 h-screen">
        <div className="py-2 flex justify-between items-center px-2">
          <p className="mb-0 py-1 text-lg h-10 font-bold">Chats</p>
          <More dispatch={dispatch}/>
        </div>
        <div className="messages-box flex flex-1 h-full overflow-scroll">
          <div className="list-group w-full mb-20 pb-6 overflow-scroll rounded">
            {processedRooms.map((room) => (
              <ChatListItem
                key={room.id}
                onClick={() =>
                  dispatch({ type: "set current room", payload: room.id })
                }
                active={currentRoom === room.id}
                room={room}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatList;
