import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/slices/moviesSlice";
import { useEffect, useRef } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const lastFetchedMovieId = useRef(null); // ✅ Store the last fetched movieId
  const trailerVideo = useSelector(store => store.movies.trailerVideo);
  

  useEffect(() => {
    if (!movieId || lastFetchedMovieId.current === movieId) return; 
    // ✅ Prevent duplicate fetches for the same movie

    lastFetchedMovieId.current = movieId; // ✅ Update the ref so it doesn't fetch again

    const getMovieTrailer = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();

        const arrayOfTrailers = json.results.filter(
          movie => movie.type === "Trailer"
        );
        const trailer = arrayOfTrailers.length
          ? arrayOfTrailers[0]
          : json.results[0];

        dispatch(addTrailerVideo(trailer));
      } catch (error) {
        console.error("Error fetching movie trailer:", error);
      }
    };

    !trailerVideo && getMovieTrailer();
  }, [movieId, dispatch]); // ✅ Runs only when `movieId` changes
};

export default useMovieTrailer;
