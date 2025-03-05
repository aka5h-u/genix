import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovie = useSelector((store) => store.movies.nowPlayingMovie);
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const json = await data.json();
    // console.log("Now playing", json.results);
    dispatch(addNowPlayingMovies(json.results));
  };
  useEffect(() => {
    if (!nowPlayingMovie) getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
