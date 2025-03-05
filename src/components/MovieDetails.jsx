import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { API_OPTIONS } from "../utils/constants";
import { useState } from "react";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [videoKey, setvideoKey] = useState();
  //   console.log(movieId);
  //   useMovieTrailer(movieId);
  //   const movieTrailer = useSelector((store) => store.movies.trailerVideo);
  //   console.log(movieTrailer?.key);

  const fetchMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS
    );
    const json = await data.json();
    console.log("Movie trailer json", json);
    const filteredData = json.results.filter(
      (video) => video.type === "Trailer"
    );
    const trailer = filteredData.length ? filteredData[0] : json.results[0];
    setvideoKey(trailer?.key);
    console.log(trailer);
  };
  useEffect(() => {
    fetchMovieTrailer();
  }, []);
  return (
    <div>
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&modestbranding=1&rel=0&showinfo=0&controls=1&disablekb=1&fs=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieDetails;
