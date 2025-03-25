import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMG } from "../utils/constants";
import { DiVim } from "react-icons/di";

const GptSearchPage = () => {
  return (
    <div className="">
      <div className="relative w-full min-h-screen flex flex-col">
        <img
          className="absolute inset-0 w-full h-full object-cover -z-10"
          src={BG_IMG}
          alt="bg-img"
        />

        {/* Overlay for Better Visibility */}
        <div className="absolute inset-0 bg-black/50 -z-10"></div>

        {/* Search Bar & Suggestions */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-4 sm:p-8">
          {/* Search Bar - Larger on Desktop */}
          <div className=" w-full max-w-md sm:max-w-lg lg:max-w-xl">
            <GptSearchBar />
          </div>

          {/* Movie Suggestions - Full Width on Mobile, Centered on Desktop */}
          <div className="w-full max-w-3xl mt-6 space-y-4">
            <GptMovieSuggestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GptSearchPage;
