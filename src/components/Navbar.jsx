import React from "react";
import sampleProfile from "../assets/profile.jpeg";
import { IoIosLogOut } from "react-icons/io";
const Navbar = () => {
  return (
    <div className="flex h-[80px] py-5 px-3 justify-between items-center bg-[#2e2d50] text-white">
      <div className="flex gap-2 items-center">
        <img
          src={sampleProfile}
          alt="Profile"
          className="h-[30px] w-[30px] rounded-full object-cover mx-1"
        />
        <p className="text-[0.8rem] sm:text-[1rem]">Ayush Tiwari</p>
      </div>
      <button className="py-[2px] px-3 bg-[#5e5c87] hover:bg-red-500 ease-in-out transition-all sm:block hidden">
        logout
      </button>
      {/* <div className="h-[20px] w-[20px] rounded-full bg-white block sm:hidden"></div> */}
      <IoIosLogOut
        style={{ width: "20px" }}
        className="block sm:hidden cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
