import React from "react";
import { MOVIE_THUMBNAIL_URL } from "../utils/constants";
import { Link } from "react-router-dom";
const MovieCard = ({ path, id }) => {
  if (!path) return;
  if (!id) return;
  return (
    <Link to={"/browse/" + id}>
      <div className="w-32 sm:w-40 md:w-48 cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105 shrink-0">
        <img
          alt="movie-card"
          className="w-full h-48 sm:h-56 md:h-64 rounded-lg object-cover"
          src={
            MOVIE_THUMBNAIL_URL + path || "https://via.placeholder.com/200x300"
          }
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/200x300";
          }}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
