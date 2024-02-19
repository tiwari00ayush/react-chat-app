import React from "react";
import { FaVideo } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { IoPersonAdd } from "react-icons/io5";
import Messages from "./Messages";
import Input from "./Input";
const Chat = () => {
  return (
    <div className="bg-[#dddcf4] grid grid-rows-[80px_1fr_70px] overflow-scroll">
      <div className="flex h-[80px] py-5 px-3 justify-between items-center text-white bg-[#5e5b8b]">
        <p>Dax Verma</p>
        <div className="flex items-center gap-4">
          <FaVideo
            style={{ color: "white", fontSize: "1.2rem", cursor: "pointer" }}
          />
          <IoPersonAdd
            style={{ color: "white", fontSize: "1.2rem", cursor: "pointer" }}
          />
          <BsThreeDots
            style={{ color: "white", fontSize: "1.2rem", cursor: "pointer" }}
          />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
