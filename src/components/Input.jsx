import React, { useState } from "react";
import gallery from "../assets/addAvatar.png";
import { MdAttachFile } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const { currentUser } = useAuth();
  const { data } = useChat();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    setLoading(true);
    if (image) {
      console.log(image);
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
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
          console.log(error);
          setLoading(false);
        },
        () => {
          setLoading(false);
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log(downloadURL);
            await updateDoc(doc(db, "chats", data.chatID), {
              messages: arrayUnion({
                id: uuid(),
                senderID: currentUser.uid,
                message: text,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
          setImage(null);
          setText("");
          setLoading(false);
        }
      );
      console.log(text);
    } else {
      console.log(text);
      console.log(data.chatID);
      try {
        await updateDoc(doc(db, "chats", data.chatID), {
          messages: arrayUnion({
            id: uuid(),
            senderID: currentUser.uid,
            message: text,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [data.chatID + ".date"]: serverTimestamp(),
          [data.chatID + ".lastMessage"]: text,
        });
        await updateDoc(doc(db, "userChat", data.user.uid), {
          [data.chatID + ".date"]: serverTimestamp(),
          [data.chatID + ".lastMessage"]: text,
        });
        setLoading(false);
        setText("");
      } catch (error) {
        setLoading(false);
      }
    }
  };
  return (
    <div className="bg-white p-2 flex justify-between">
      <textarea
        type="text"
        placeholder="Type something ..."
        className="border-none  px-2 h-full w-full py-3 outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-4 items-center">
        <MdAttachFile
          style={{ color: "#839bf0", fontSize: "3rem", cursor: "pointer" }}
        />
        <input
          type="file"
          id="gallery"
          className="hidden"
          itemType="png"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="gallery">
          <img
            src={gallery}
            alt="gallery"
            className="w-[50px] cursor-pointer"
          />
        </label>
        <button
          onClick={handleSend}
          className={`py-1 px-2  cursor-pointer text-white ${
            loading ? "bg-red-500" : "bg-[#839bf0]"
          }`}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
