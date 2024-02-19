import React from "react";

const Message = ({ isOwner = false }) => {
  return (
    <>
      <div
        className={`flex py-2 items-start gap-4 ${
          isOwner ? "flex-row-reverse items-end" : ""
        }`}
      >
        <div className="flex flex-col items-center">
          <img
            className="h-[40px] w-[40px] rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh5VIsV4Dhyk7DM8JY_r67NVq-sQxzlv2oXMwRmhwwaQ&s"
            alt="user image"
          />
          <p className="text-sm text-gray-500 text-center">Just now</p>
        </div>
        <div
          className={`flex flex-col ${
            isOwner ? "items-end" : "items-start"
          } gap-2`}
        >
          <p className="p-2 text-black bg-white rounded-r-md rounded-b-md">
            did you send the document? it's really important to me
          </p>
          <img
            src="https://media.istockphoto.com/id/1470130937/photo/young-plants-growing-in-a-crack-on-a-concrete-footpath-conquering-adversity-concept.webp?b=1&s=170667a&w=0&k=20&c=IRaA17rmaWOJkmjU_KD29jZo4E6ZtG0niRpIXQN17fc="
            alt="photo message"
            className="w-[50%]"
          />
        </div>
      </div>
    </>
  );
};

export default Message;
