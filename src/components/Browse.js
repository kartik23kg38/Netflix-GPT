import Header from "./Header";
import SecondaryContainer from "./SecondaryContainer.js";
import MainContainer from "./MainContainer.js";
import usePopularMovies from "../customHooks/usePopularMovies.js";
import useTopRatedMovies from "../customHooks/useTopRatedMovies.js";
import useUpcomingMovies from "../customHooks/useUpcomingMovies.js";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies.js";
import { useSelector } from "react-redux";
import GptMovieSuggestions from "./GptMovieSuggestions.js";
import GptSearchBar from "./GptSearchBar.js";
import { BG_IMG } from "../utils/constants.js"; 

const Browse = () => {

  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  // console.log("showGptSearch:", showGptSearch); // ✅ Check if the state updates on button click

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="overflow-x-hidden min-h-screen">
      <Header />
      
      {showGptSearch ? (
        <div className="relative w-full">
          {/* Background Image */}
          <img
            className="fixed inset-0 w-full h-full object-cover -z-10 sm:h-[50vh] md:h-[60vh] lg:h-full"
            src={BG_IMG}
            alt="bg-img"
          />
          
          {/* Overlay for Better Visibility */}
          <div className="absolute inset-0 bg-black/50 -z-10"></div>
          
          {/* Search Bar - Always Visible at Top */}
          <div className="relative z-10 pt-6 pb-4">
            <GptSearchBar />
          </div>
          
          {/* Movie Suggestions Below Search Bar */}
          <div className="relative z-10 pb-8">
            <GptMovieSuggestions />
          </div>
        </div>
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
