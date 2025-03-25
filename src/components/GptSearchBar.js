import React, { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import languagaeConstraints from "./languagaeConstraints";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMoviesResults } from "../utils/slices/gptSlice";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const handleGptSearchBarClick = async () => {
    const query = searchText.current.value.trim(); // Get user input
    if (!query) return alert("Please enter a query!"); // Prevent empty search

    // const gptQuery =
    //   "Provide a list of movies related to the query: " + searchText.current.value + " .Give me only 5-10 movies like a comma separated example given ahead - Movie1, Movie2, Movie3, Movie1, Movie4, Movie5, Movie6, Movie7,...";
    const gptQuery = `
    Provide a list of movies related to the query: "${searchText.current.value}".
    Respond **only** with movie names in this comma-separated format:
    Movie1, Movie2, Movie3, Movie4, Movie5, Movie6, Movie7, Movie8, Movie9
    DO **NOT** include introductions, descriptions, or extra text. Provide atleast 8-10 movie names, iff possible.
  `;
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // ✅ Use Gemini model
      const result = await model.generateContent(gptQuery);
      const rawMovies = result.response.text(); // ✅ Extract text from response

      // printing movies
      // console.log("Raw Movies:", rawMovies); // ✅ Log response text

      // ✅ Validate response format (should be comma-separated list of movie names)
      if (!rawMovies.includes(",")) {
        setResponse(
          "Invalid response format! Please provide comma-separated movie names."
        );
        return;
      }

      // ✅ Validate response length (should be between 8 and 10 movie names)
      const movieCount = rawMovies.split(",").length;
      if (movieCount < 8 || movieCount > 10) {
        setResponse("Response should contain between 8 and 10 movie names.");
        return;
      }

      // ✅ Validate movie names (should not contain any special characters or numbers)
      const regex = /^[a-zA-Z0-9\s:,.!&'-]+$/;
      const isValidMovieName = rawMovies
        .split(",")
        .every((movie) => regex.test(movie));
      // ✅ Convert comma-separated response into an array
      let moviesArray = rawMovies.split(",").map((movie) => movie.trim()); // Trim spaces from each movie name

      // console.log("Converted Movie Array:", moviesArray); // ✅ Log real JS array
      setResponse(moviesArray); // ✅ Store array in state

      const promisesArray = moviesArray.map((movie) => searchMovieTMDB(movie));
      // [Promise, Promise, Promise, Promise, Promise]

      const tmdbResults = await Promise.all(promisesArray);
      const filteredResults = tmdbResults.filter(
        (resultArray) => resultArray && resultArray.length > 0
      );
      // console.log("tmdbResults : ", tmdbResults);

      dispatch(
        addGptMoviesResults({
          rawMovies: moviesArray.filter(
            (_, idx) => tmdbResults[idx] && tmdbResults[idx].length > 0
          ),
          tmdbMovies: filteredResults,
        })
      );
    } catch (error) {
      console.error("Error fetching response:", error);
      setResponse("Something went wrong. Try again!");
    }
  };


  return (
    <div className="w-full flex justify-center py-8 ">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex items-center bg-black px-4 py-2 my-4 gap-2 
                   border border-red-600 overflow-hidden 
                   shadow-2xl w-full max-w-md 
                   mx-4 md:mx-0 md:py-3 md:gap-2 md:rounded-lg"
      >
        <input
          ref={searchText}
          type="text"
          placeholder={languagaeConstraints[langKey].gptPlaceholder}
          className="px-4 py-2 w-full outline-none rounded-full
                     placeholder-gray-600 bg-white text-black text-sm
                     md:px-4 md:py-3 md:w-96 md:rounded-md md:text-base"
        />
        <button
          type="submit"
          onClick={handleGptSearchBarClick}
          className="p-3 rounded-full bg-gradient-to-r from-red-500 
                     via-orange-500 to-yellow-500 text-white flex items-center gap-2
                     hover:from-red-600 hover:via-orange-600 
                     hover:to-yellow-600 
                     md:px-6 md:py-3 md:rounded-lg md:text-lg"
        >
          <IoMdSearch className="text-white text-xl md:text-2xl" />
        </button>
      </form>
    </div>
  );
  
  

};

export default GptSearchBar;
