import React from "react";
import MovieCard from "./MovieCard";
const MovieList = ({ title, movies }) => {
  //  console.log("Movie data :", movies);
  //const { poster_path } = movies[0];
  //console.log("Movie data :", poster_path);
  return (
    <div className="px-6  text-white">
      <h1 className="text-3xl py-4">{title}</h1>
      <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex ">
          {movies?.map((movie) => {
            return (
              <MovieCard
                key={movie?.id}
                id={movie?.id}
                path={movie?.poster_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
