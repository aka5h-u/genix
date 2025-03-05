import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const VideoTitle = ({ title, overview }) => {
  const id = useSelector((store) => store.movies?.nowPlayingMovies[0]?.id);
  console.log(id);
  return (
    <div className=" px-20 absolute bg-gradient-to-r from-black w-screen aspect-video pt-[20%]">
      <h1 className="text-5xl font-bold text-white">{title}</h1>
      <p className="py-6 w-1/4 text-lg text-white">{overview}</p>
      <div className="flex gap-4">
        <Link to={"/browse/" + id}>
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
        </Link>
        <button className="cursor-pointer  bg-gray-500 opacity-90 text-white text-xl  px-10 py-2 rounded-md flex items-center gap-2">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
