import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCards = ({poster_path}) => {
  return (
    <div className="w-48 h-52 flex-shrink-0">
      <img className="w-full h-full object-cover rounded-lg" src={IMG_CDN_URL + poster_path} alt="Movie_card" />
    </div>
  );
};

export default MovieCards;
