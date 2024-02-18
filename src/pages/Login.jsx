import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
        <h4 className="text-center pb-5">Login</h4>
        <form className="flex flex-col px-10 py-5">
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
          <button
            className="w-full py-2 bg-purple-400 text-white mt-5 mb-2"
            type="submit"
          >
            Sign in
          </button>
          <p className="text-center my-2">
            You don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-blue-400 underline underline-offset-[5px]"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
