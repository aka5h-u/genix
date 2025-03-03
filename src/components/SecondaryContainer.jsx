import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("Movies from store", movies.topRatedMovies);
  return (
    movies && (
      <div className="bg-black">
        <div className="-mt-50 relative z-20 pl-12">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.topRatedMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming movies"}
            movies={movies.nowPlayingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondaryContainer;
