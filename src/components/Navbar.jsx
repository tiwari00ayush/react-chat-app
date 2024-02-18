import React from "react";
import sampleProfile from "../assets/profile.jpeg";
const Navbar = () => {
  return (
    <div className="flex py-5 px-3 justify-between items-center bg-[#2e2d50] text-white">
      <div className="flex gap-2 items-center">
        <img
          src={sampleProfile}
          alt="Profile"
          className="h-[30px] w-[30px] rounded-full object-cover mx-1"
        />
        <p>Ayush Tiwari</p>
      </div>
      <button className="py-[2px] px-3 bg-[#5e5c87]">logout</button>
    </div>
  );
};

export default Navbar;
