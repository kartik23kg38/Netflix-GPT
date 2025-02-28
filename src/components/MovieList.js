import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;
  // console.log("Movies List:", movies); // Debugging
  return (
    <div className="">
      <div className="px-20">
        <h1 className="text-white p-4 font-bold text-2xl">{title}</h1>
        <div className="flex gap-3 overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
          {movies?.map((movie) => (
            <MovieCards key={movie.id} poster_path={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
