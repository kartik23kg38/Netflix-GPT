import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCards = ({ poster_path }) => {
  if (!poster_path) {
    return null;
  }

  return (
    <div className="w-36 md:w-48 mb-8 flex-shrink-0">
      <img 
        className="w-full rounded-2xl object-cover" 
        src={IMG_CDN_URL + poster_path} 
        alt="Movie_card" 
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/200x300?text=Error";
        }}
      />
    </div>
  );
};

export default MovieCards;