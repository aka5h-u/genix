import React from "react";
import { MOVIE_THUMBNAIL_URL } from "../utils/constants";

const MovieCard = ({ path }) => {
  if (!path) return;
  return (
    <div className="w-48 pr-6 cursor-pointer ">
      <img
        alt="movie-card"
        className="rounded-lg"
        src={MOVIE_THUMBNAIL_URL + path}
      />
    </div>
  );
};

export default MovieCard;
