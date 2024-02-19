import React from "react";
import gallery from "../assets/addAvatar.png";
import { MdAttachFile } from "react-icons/md";

const Input = () => {
  return (
    <div className="bg-white p-2 flex justify-between">
      <textarea
        type="text"
        placeholder="Type something ..."
        className="border-none  px-2 h-full w-full py-3 outline-none"
      />
      <div className="flex gap-4 items-center">
        <MdAttachFile
          style={{ color: "#839bf0", fontSize: "3rem", cursor: "pointer" }}
        />
        <input type="file" id="gallery" className="hidden" itemType="png" />
        <label htmlFor="gallery">
          <img
            src={gallery}
            alt="gallery"
            className="w-[50px] cursor-pointer"
          />
        </label>
        <button className="py-1 px-2 bg-[#839bf0] cursor-pointer text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
