import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const VideoTitle = ({ title, overview }) => {
  const id = useSelector((store) => store.movies?.nowPlayingMovies[0]?.id);
  console.log(id);
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden lg:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0 flex items-center">
        <Link to={"/browse/" + id}>
          <button class="cursor-pointer  bg-white text-black text-xl  px-10 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200  *:transition">
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
        <button className="flex items-center gap-2 mx-2  bg-gray-500 text-white  px-10 py-2  text-xl bg-opacity-50 rounded-lg">
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
