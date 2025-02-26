import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/slices/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  // fetching trailer videos && updating the store with trailer video data
  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log("json ; ", json);

    const arrayOfTrailers = json.results.filter(
      (movie) => movie.type === "Trailer"
    );
    const trailer = arrayOfTrailers.length
      ? arrayOfTrailers[0]
      : json.results[0];
    // console.log("trailer : ", trailer);
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieTrailer();
  });
};
export default useMovieTrailer;
