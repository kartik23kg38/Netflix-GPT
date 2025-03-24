import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies);
  
  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      // console.log("Fetched Movies:", json.results);
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    (!nowPlayingMovies && getNowPlayingMovies());
  }, [dispatch]);  // ✅ Added dispatch in dependencies

  return null;
};

export default useNowPlayingMovies
