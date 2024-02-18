import React, { useState } from "react";
import sampleProfile from "../assets/profile.jpeg";
const Search = () => {
  const [search, setSearch] = useState("");
  const accept = (e) => {
    e.preventDefault();
    if (search !== "") {
      console.log(search);
      setSearch("");
    }
  };

  return (
    <div>
      <form onSubmit={accept}>
        <input
          type="text"
          placeholder="Find a user"
          value={search}
          className="bg-transparent w-full border-solid border-b-[0.5px] border-gray-300 py-[10px] px-3 outline-none text-white"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>
      <div className="bg-gray-300">
        <div className="flex items-center gap-2 py-2 px-2 border-solid border-b-2 border-black cursor-pointer hover:bg-gray-400">
          {/* photo of the user */}
          <img
            src={sampleProfile}
            alt="profile"
            className="h-[50px] w-[50px] rounded-full object-cover mx-1"
          />
          {/* {name of the user} */}
          <p>Dev Bhadana</p>
        </div>
      </div>
    </div>
  );
};

export default Search;
