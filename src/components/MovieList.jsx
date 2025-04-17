import React from "react";
import MovieCard from "./MovieCard";
const MovieList = ({ title, movies }) => {
  //  console.log("Movie data :", movies);
  //const { poster_path } = movies[0];
  //console.log("Movie data :", poster_path);
  return (
    <div className="px-4 sm:px-6 text-white mt-2">
      <h1 className="text-xl sm:text-2xl md:text-3xl py-1">{title}</h1>
      <div
        className="flex overflow-x-auto space-x-4 pb-4 snap-x"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies?.map((movie) => (
          <MovieCard key={movie?.id} id={movie?.id} path={movie?.poster_path} />
        ))}
        {/* Hide scrollbar for WebKit browsers */}
        <style jsx>{`
          .flex::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

export default MovieList;
