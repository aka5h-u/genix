import React from "react";
import { MOVIE_THUMBNAIL_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const MovieCard = ({ path, id }) => {
  if (!path) return;
  if (!id) return;
  return (
    <Link to={"/browse/" + id}>
      <div className="w-48 pr-6 cursor-pointer transition-transform duration-200 hover:scale-110">
        <img
          alt="movie-card"
          className="rounded-lg"
          src={MOVIE_THUMBNAIL_URL + path}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
