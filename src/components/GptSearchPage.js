import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_IMG } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Background Image - Full-Screen Cover */}
      <img
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src={BG_IMG}
        alt="bg-img"
      />

      {/* Overlay for Better Visibility */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Search Bar & Suggestions */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearchPage;
