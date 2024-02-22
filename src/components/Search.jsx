import React, { useEffect, useState } from "react";
import sampleProfile from "../assets/profile.jpeg";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDoc,
  updateDoc,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);
    if (search !== "") {
      const userRef = collection(db, "users");
      const q = query(
        userRef,
        where("displayName", "==", search.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      try {
        const newUserArray = [];
        querySnapshot.forEach((doc) => {
          newUserArray.push(doc.data());
          console.log(doc.data());
        });
        setUsers(newUserArray);
        if (newUserArray.length === 0) setError({ message: "User not found" });
        setSearch("");
      } catch (error) {
        setError(error);
      }
    }
  };
  const handleSelect = async (e, user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log(combinedId);

    const res = await getDoc(doc(db, "chats", combinedId));
    if (!res.exists()) {
      console.log("The convo do not exist");
      // then create a convo between then jo ki message array hoga

      await setDoc(doc(db, "chats", combinedId), { messages: [] });
      await updateDoc(doc(db, "userChat", currentUser.uid), {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
        [combinedId + ".lastMessage"]: "",
      });
      await updateDoc(doc(db, "userChat", user.uid), {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
        [combinedId + ".lastMessage"]: "",
      });
    } else {
      console.log("exists");
    }
    setUsers([]);
    setSearch("");
  };
  return (
    <div>
      <form onSubmit={handleSearch}>
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
      {error && (
        <span className="bg-red-400 text-white text-center py-2 block">
          {error.message}
        </span>
      )}
      {users &&
        users.map((user, index) => (
          <div
            className="bg-gray-300"
            key={index}
            onClick={(e) => {
              handleSelect(e, user);
            }}
          >
            <div className="flex items-center gap-2 py-2 px-2 border-solid border-b-2 border-black cursor-pointer hover:bg-gray-400">
              {/* photo of the user */}
              <img
                src={user.photoURL}
                alt="profile"
                className="h-[50px] w-[50px] rounded-full object-cover mx-1"
              />
              {/* {name of the user} */}
              <p>{user.displayName}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
