import React from "react";
import { IoMdSearch } from "react-icons/io";
import languagaeConstraints from "./languagaeConstraints";
import { useSelector } from "react-redux";

const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  return (
    <div className="flex items-center justify-center h-screen -mt-28">
      <div className="flex items-center bg-black px-6 py-2 m-2 gap-4 border border-red-600 rounded-lg overflow-hidden shadow-2xl">
        <input
          type="text"
          placeholder={languagaeConstraints[langKey].gptPlaceholder}
          className="px-4 py-3 w-96 outline-none rounded-lg placeholder-gray-600 bg-white text-black"
        />
        <button
          className="flex items-center gap-2 px-6 py-3 text-white text-lg rounded-lg transition-all duration-300 
          bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 
          hover:from-red-600 hover:via-orange-600 hover:to-yellow-600"
        >
          <IoMdSearch className="text-white text-2xl" /> {languagaeConstraints[langKey].search}
        </button>
      </div>
    </div>
  );
};

export default GptSearchBar
