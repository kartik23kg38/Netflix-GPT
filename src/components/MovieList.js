import React from "react";
import MovieCards from "./MovieCards";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;
  
  return (
    <div className="px-20 mt-4 mb-8 relative z-0"> {/* Added z-index and margin */}
      <h1 className="text-white p-4 font-bold text-2xl">{title}</h1>
      <div className="flex gap-3 overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth pb-4"> {/* Added padding bottom */}
        {movies?.map((movie) => (
          <MovieCards key={movie.id} poster_path={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;