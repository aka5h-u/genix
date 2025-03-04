import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" px-20 absolute bg-gradient-to-r from-black w-screen aspect-video pt-[20%]">
      <h1 className="text-5xl font-bold text-white">{title}</h1>
      <p className="py-6 w-1/4 text-lg text-white">{overview}</p>
      <div className="flex gap-4">
        <button class=" cursor-pointer  bg-white text-black text-xl  px-10 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200  *:transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
        <button className="cursor-pointer  bg-gray-500 opacity-90 text-white text-xl  px-10 py-2 rounded-md flex items-center gap-2">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
