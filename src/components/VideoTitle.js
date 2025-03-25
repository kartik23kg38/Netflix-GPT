import React from "react";
import { FaPlay } from "react-icons/fa";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-slate-900 text-white p-8 absolute">
      {/* Title - Smaller size for mobile */}
      <h1 className="ml-5 md:ml-10 mt-20 md:mt-28 font-extrabold text-3xl md:text-4xl">
        {title}
      </h1>

      {/* Overview - Hidden for mobile (already done) */}
      <p className="hidden md:inline-block ml-10 mt-2 w-1/3 p-1 rounded-lg">
        {overview}
      </p>

      {/* Buttons - Added more margin for spacing in mobile view */}
      <div className="flex items-center gap-2 ml-5 md:ml-10 mt-6 md:mt-3">
        <button className="flex items-center justify-center gap-2 text-black px-4 py-1 w-28 md:px-6 md:py-2 md:w-36 rounded-full bg-white hover:bg-white/70 transition duration-200 shadow-md">
          <FaPlay className="text-black w-3" />
          Play
        </button>
        <button className="text-black px-4 py-1 w-32 md:px-6 md:py-2 md:w-44 rounded-full bg-white/30 hover:bg-white/50 transition duration-200 shadow-md">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
