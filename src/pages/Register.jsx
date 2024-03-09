import React, { useState } from "react";
import addAvatar from "../assets/addAvatar.png";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadBar, setUploadBar] = useState(0);
  const navigate = useNavigate();
  const handleChange = (e) => {
    if (e.target.id === "avatar") {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const submitData = async (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    const email = formData["email"];
    const password = formData["password"];
    const avatar = formData["avatar"];
    console.log(URL.createObjectURL(avatar));
    const displayName = formData["displayName"].toLowerCase();
    const q = query(
      collection(db, "users"),
      where("displayName", "==", displayName)
    );

    const querySnapshot = await getDocs(q);
    let isDisplayNameExist = false;

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().displayName === displayName) isDisplayNameExist = true;
    });

    if (isDisplayNameExist) {
      setError({ message: "User name already exists" });
      setLoading(false);
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadBar(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          setError(error);
        },
        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          setLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChat", res.user.uid), {});
            setError(null);
            navigate("/");
          });
        }
      );
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
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
        <h4 className="text-center pb-5">Register</h4>
        <form className="flex flex-col px-10 py-5">
          <input
            type="file"
            id="avatar"
            className="text-center hidden"
            onChange={handleChange}
            required
          />
          <label
            htmlFor="avatar"
            className="flex items-center justify-center gap-2 cursor-pointer mb-3"
          >
            {" "}
            <img
              src={
                formData["avatar"] === undefined
                  ? addAvatar
                  : URL.createObjectURL(formData["avatar"])
              }
              alt="addAvatar"
              className={`${
                formData["avatar"] === undefined
                  ? "w-[40px]"
                  : "w-[100px] h-[100px] block rounded-full object-cover"
              } `}
            />{" "}
            <span
              className={`${
                formData["avatar"] === undefined ? " text-[#8da4f1]" : "hidden"
              } `}
            >
              Add an avatar
            </span>
          </label>
          <input
            type="text"
            placeholder="display name"
            id="displayName"
            className="border-solid border-b-2 pb-3 pl-1 outline-none my-2"
            onChange={handleChange}
            required
          />
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
            // disabled={loading}
          >
            {loading ? "loading..." : "Sign up"}
          </button>
          <p className="text-red-500 text-center">
            {error ? error.message : ""}
          </p>
          <p className="text-center my-2">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-blue-400 underline underline-offset-[5px]"
            >
              Login
            </Link>
          </p>
          <div
            style={{ width: `${uploadBar}%` }}
            className="h-[20px] bg-green-700 rounded-md text-white text-center flex items-center justify-center"
          >
            {uploadBar !== 0 && Math.round(uploadBar)}
            <span
              className={`${uploadBar === 0 ? "hidden" : "block text-white"}`}
            >
              %
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
