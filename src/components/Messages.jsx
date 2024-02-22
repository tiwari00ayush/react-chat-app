import React, { useEffect, useState } from "react";
import Message from "./Message";
import { useChat } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Messages = () => {
  const { data } = useChat();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (data.chatID != null) {
      const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
        if (doc.exists()) setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    }
  }, [data.chatID]);
  console.log(messages);
  return (
    <div className="overflow-scroll px-2">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
