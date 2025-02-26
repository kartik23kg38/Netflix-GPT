import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen  h-screen bg-gradient-to-r from-black  text-white p-8 absolute">
      <h1 className="ml-4 mt-28 font-extrabold text-6xl">{title}</h1>
      <p className="mx-4 mt-2 w-1/3 p-4 rounded-lg">
        {overview}
      </p>
      <div className="flex items-center gap-2 ml-10 mt-6">
        <button className="flex items-center justify-center gap-2 text-black px-6 py-2 w-36 rounded-sm bg-white hover:bg-white/70 transition duration-200  shadow-md ">
          <FaPlay className="text-black" />
          Play
        </button>
        <button className="text-black px-6 py-2 w-44 rounded-sm bg-white/30 hover:bg-white/50  transition duration-200 shadow-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
