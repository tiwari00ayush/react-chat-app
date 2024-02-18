import React from "react";
import sampleProfile from "../assets/profile.jpeg";

const Chats = () => {
  return (
    <>
      <div className="bg-[#3d3c5f]">
        <div className="flex items-center gap-2 py-2 px-2  cursor-pointer hover:bg-[#2f2d52]">
          {/* photo of the user */}
          <img
            src={sampleProfile}
            alt="profile"
            className="h-[50px] w-[50px] rounded-full object-cover mx-1"
          />
          {/* {name of the user} */}
          <div>
            <p className="text-white">Dax verma</p>
            <p className="text-[0.8rem] text-gray-300">latest message</p>
          </div>
        </div>
      </div>
      <div className="bg-[#3d3c5f]">
        <div className="flex items-center gap-2 py-2 px-2  cursor-pointer hover:bg-[#2f2d52]">
          {/* photo of the user */}
          <img
            src={sampleProfile}
            alt="profile"
            className="h-[50px] w-[50px] rounded-full object-cover mx-1"
          />
          {/* {name of the user} */}
          <div>
            <p className="text-white">Dax verma</p>
            <p className="text-[0.8rem] text-gray-300">latest message</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats;
