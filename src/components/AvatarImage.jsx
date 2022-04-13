import React from "react";
import ChatIcon from "./ChatIcon";

const AvatarImage = ({ name, width, height, isGroup}) => {
  return (
    <>
      { !isGroup ? (
        <img
          src={`https://avatars.dicebear.com/api/micah/${name}.svg`}
          alt={name}
          style={{ width: width || 32, height: height|| 32, objectFit: "cover" }}
          className="rounded-full avatar-xs"
        />
      ) : (
        <div className="overflow-hidden rounded-full">
          <ChatIcon />
        </div>
      )}
    </>
  );
};

export default AvatarImage;
