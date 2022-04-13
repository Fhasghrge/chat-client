import React from "react";
import { CardText } from "react-bootstrap-icons";

const NoMessages = () => {
  return (
    <div className="flex justify-center items-center space-x-4 pt-6">
      <CardText size={38} color='gray' />
      <p>No messages</p>
    </div>
  );
};

export default NoMessages;
