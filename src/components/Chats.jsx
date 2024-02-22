import React, { useContext, useEffect, useState } from "react";
import sampleProfile from "../assets/profile.jpeg";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";

const Chats = () => {
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);
  const { dispatch } = useChat();
  useEffect(() => {
    const getchats = () => {
      const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (doc) => {
        setChats(Object.entries(doc.data()));
        return () => {
          unsub();
        };
      });
    };
    currentUser.uid && getchats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <>
      {chats.length !== 0 &&
        chats
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat, index) => (
            <div
              className="bg-[#3d3c5f]"
              key={index}
              onClick={() => {
                handleSelect(chat[1].userInfo);
              }}
            >
              <div className="flex items-center gap-2 py-2 px-2  cursor-pointer hover:bg-[#2f2d52]">
                {/* photo of the user */}
                <img
                  src={chat[1].userInfo.photoURL}
                  alt="profile"
                  className="h-[50px] w-[50px] rounded-full object-cover mx-1"
                />
                {/* {name of the user} */}
                <div>
                  <p className="text-white font-bold">
                    {chat[1].userInfo.displayName}
                  </p>
                  <p className="text-[0.8rem] text-gray-300">
                    {chat[1].lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default Chats;
