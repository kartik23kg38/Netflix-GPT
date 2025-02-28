import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Early return with a fallback UI
  if (!movies || movies.length === 0) {
    return <div className="text-white text-center p-4">Loading movies...</div>;
  }

  const mainMovie = movies[0];
  if (!mainMovie) return null;
  // console.log("mainMovie : ", mainMovie);
  const { original_title, overview, id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
