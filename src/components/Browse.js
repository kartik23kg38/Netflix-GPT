import Header from "./Header";
import SecondaryContainer from "./SecondaryContainer.js";
import MainContainer from "./MainContainer.js";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies.js";
import usePopularMovies from "../customHooks/usePopularMovies.js";
import useTopRatedMovies from "../customHooks/useTopRatedMovies.js";
import useUpcomingMovies from "../customHooks/useUpcomingMovies.js";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div className="overflow-x-hidden min-h-screen">
      <Header />
      <MainContainer />
      <SecondaryContainer />
      <div className="relative h-screen flex items-center justify-center max-w-full text-center">
        <h1 className="text-black text-opacity-70 font-bold text-4xl">
          All the webseries, episodes, and shows...
        </h1>
      </div>
    </div>
  );
};

export default Browse;
