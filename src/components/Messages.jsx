import React from "react";
import Message from "./Message";

const Messages = () => {
  return (
    <div className="overflow-scroll px-2">
      <Message isOwner={true} />
      <Message />
      <Message isOwner={true} />
      <Message />
      <Message isOwner={true} />
      <Message />
      <Message isOwner={true} />
      <Message />
      <Message isOwner={true} />
      <Message />
    </div>
  );
};

export default Messages;
