import React from 'react';

const OnlineIndicator = ({ online, hide = false, width = 8, height = 8 }) => {
  return (
    <div
      className={
        online ? "rounded-full bg-green-400" : "rounded-full bg-gray-400"
      }
      style={{ width, height, opacity: hide ? 0 : 1 }}
    ></div>
  );
};

export default OnlineIndicator;
