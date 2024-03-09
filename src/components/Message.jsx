import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const Message = ({ message }) => {
  const [isOwner, setIsOwner] = useState(true);
  const { currentUser } = useAuth();
  const { data } = useChat();
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);
  useEffect(() => {
    if (message.senderID === currentUser.uid) {
      setIsOwner(true);
    } else if (message.senderID === data.user.uid) {
      setIsOwner(false);
    }
  }, []);
  return (
    <>
      <div
        ref={ref}
        className={`flex py-2 items-start gap-4 ${
          isOwner ? "flex-row-reverse items-end" : ""
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            className="h-[40px] w-[40px] rounded-full object-cover"
            src={`${isOwner ? currentUser.photoURL : data.user.photoURL}`}
            alt="user image"
          />
          <p className="text-sm text-gray-500 text-center">just now</p>
        </div>
        <div
          className={`flex flex-col ${
            isOwner ? "items-end" : "items-start"
          } gap-2`}
        >
          <p
            className={`p-2 text-black bg-white rounded-r-md rounded-b-md ${
              message.message === "" ? "hidden" : ""
            }`}
          >
            {message.message}
          </p>
          <img
            src={`${message.img ? message.img : ""}`}
            alt="photo message"
            className={`${message.img ? "w-[50%]" : "hidden"}`}
          />
        </div>
      </div>
    </>
  );
};

export default Message;
