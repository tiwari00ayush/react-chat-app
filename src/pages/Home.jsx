import React from "react";
import { Chat, SideBar } from "../components";
const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#a7bcfb] p-2">
      <div className="w-[80%] h-[90%] rounded-2xl border-solid shadow-2xl bg-white  grid grid-cols-[1fr_2fr] overflow-hidden">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
