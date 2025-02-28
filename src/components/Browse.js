import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies.js";
import SecondaryContainer from "./SecondaryContainer.js";
import MainContainer from "./MainContainer.js";

const Browse = () => {
  useNowPlayingMovies();

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
