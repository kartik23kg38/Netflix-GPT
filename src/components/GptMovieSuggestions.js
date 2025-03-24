import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const { gptRawMovies, gptTMDBMoviesAdded } = useSelector(
    (store) => store.gpt
  );

  // Defensive check to ensure both variables are valid arrays
  if (!Array.isArray(gptRawMovies) || !Array.isArray(gptTMDBMoviesAdded)) {
    return null;
  }

  // Check if any movies exist
  const hasAnyMovies = gptTMDBMoviesAdded.some(
    (movieArray) => Array.isArray(movieArray) && movieArray.length > 0
  );

  // if (!hasAnyMovies) {
  //   return (
  //     <div className="p-10 m-3 bg-black text-white text-center">
  //       <h2 className="text-2xl font-bold mb-4">
  //         No movies found matching your search
  //       </h2>
  //       <p>Try a different search term or category</p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full px-5"> {/* Outer container with padding */}
      <div className="w-full bg-black bg-opacity-80"> {/* Inner container with background */}
        {/* Movie results container */}
        <div className="w-full mt-8 px-3">
          {hasAnyMovies ? (
            gptRawMovies.map((movie, idx) =>
              gptTMDBMoviesAdded[idx]?.length ? (
                <MovieList key={idx} title={movie} movies={gptTMDBMoviesAdded[idx]} />
              ) : null
            )
          ) : (
            <div className="p-10 m-3 bg-black text-white text-center">
              <h2 className="text-2xl font-bold mb-4">
                No movies found matching your search
              </h2>
              <p>Try a different search term or category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
