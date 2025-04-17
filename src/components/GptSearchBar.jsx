import React from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const currentLang = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const searchTmdbMovie = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    //console.log(json);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query" +
      searchText.current.value +
      ". Only give names of 5 movies, comma separated like the example result given ahead, Example result: Gadar, Purge, Hereditary, Pathan, Jawan";
    //console.log(searchText.current.value);
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });
    if (!gptResults.choices) {
      //todo : Write error handling}
    }
    const gptMovieList = gptResults?.choices[0]?.message?.content.split(",");

    console.log(gptMovieList);
    const promiseList = gptMovieList.map((movie) => searchTmdbMovie(movie));
    const tmdbResults = await Promise.all(promiseList);
    console.log(tmdbResults.results);
    dispatch(
      addGptMovieResult({ movieName: gptMovieList, movieResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className=" w-full md:w-1/2 bg-black grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[currentLang].gptSearchPlaceholder}
          className=" p-4 m-4 bg-white col-span-9"
        />
        <button
          className="py-2 px-4 rounded-lg bg-red-700 text-white col-span-3 m-4 cursor-pointer"
          onClick={handleGptSearchClick}
        >
          {lang[currentLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
