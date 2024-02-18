import React, { useState } from "react";
import addAvatar from "../assets/addAvatar.png";
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitData = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="w-full h-screen bg-[#a7bcfb] flex justify-center items-center p-2">
      <div
        onSubmit={submitData}
        className="w-full h-max bg-white rounded-lg shadow-lg max-w-[600px] px-4 py-3"
      >
        <h1 className="text-[#615d80] text-center text-2xl font-bold py-2">
          INSTANT
        </h1>
        <h4 className="text-center pb-5">Register</h4>
        <form className="flex flex-col px-10 py-5">
          <input
            type="text"
            placeholder="display name"
            id="displayName"
            className="border-solid border-b-2 pb-3 pl-1 outline-none my-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="email"
            id="email"
            className="border-solid border-b-2 pb-3 pl-1 outline-none my-2"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="password"
            id="password"
            className="border-solid border-b-2 pb-3 pl-1 outline-none my-2"
            onChange={handleChange}
          />
          <input type="file" id="avatar" className="text-center hidden" />
          <label
            htmlFor="avatar"
            className="flex items-center justify-start gap-2 cursor-pointer my-2"
          >
            {" "}
            <img src={addAvatar} alt="addAvatar" className="w-[40px]" />{" "}
            <span className="text-[#8da4f1]">Add an avatar</span>
          </label>
          <button
            className="w-full py-2 bg-purple-400 text-white mt-5 mb-2"
            type="submit"
          >
            Sign up
          </button>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-400 underline underline-offset-[5px]"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
