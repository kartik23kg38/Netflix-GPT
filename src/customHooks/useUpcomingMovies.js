import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../utils/slices/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(store => store.movies.upcomingMovies);

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );

      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  }, [dispatch]); // ✅ Added dispatch in dependencies

  return null;
};

export default useUpcomingMovies
