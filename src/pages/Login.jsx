import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        formData["email"],
        formData["password"]
      );
      if (res) setLoading(false);
      console.log(res.user);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error);
    }
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
            required
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            className="border-solid border-b-2 pb-3 pl-1 outline-none my-2"
            onChange={handleChange}
            required
          />
          <button
            className="w-full py-2 bg-purple-400 text-white mt-5 mb-2"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : "Sign in"}
          </button>
          <p className="text-red-500 text-center">
            {error ? error.message : ""}
          </p>
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
