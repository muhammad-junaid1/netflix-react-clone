import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import GenreMovies from "./GenreMovies";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// All async functions for calling different data
import calls from "../apiCalls.js";

const Homepage = () => {
  // All states here
  const [bannerMovie, setBannerMovie] = useState({});
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [genres, setGenres] = useState([]);
  const [genreMoviesList, setGenreMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the requests
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const popularMoviesList = await calls.fetchPopularMovies();

      // Get the single movie from trending movies list
      const movie =
        popularMoviesList.results[
          Math.floor(Math.random() * popularMoviesList.results.length - 1)
        ];
      const trendingMoviesList = await calls.fetchTrendingMovies();
      const ratedMoviesList = await calls.fetchRatedMovies();
      const singleBannerMovie = await calls.fetchSingleBannerMovie(
        `${movie.id}`
      );

      setBannerMovie(singleBannerMovie);

      const [bannerMovieCast, allGenres] = await Promise.all([
        calls.fetchCast(`${movie.id}`),
        calls.fetchGenres(),
      ]);

      // Fetch all movies with all genres and set to the state
      const movies = await Promise.all(
        allGenres.genres.map((genre) => calls.fetchGenreMovies(genre.id))
      );
      let genreData = [];
      allGenres.genres.map((genre, index) => {
        return genreData.push({
          id: genre.id,
          genreName: genre.name,
          movies: movies[index].results.slice(0, 10),
        });
      });

      // Set all the states
      setLoading(false);
      setGenreMoviesList(genreData);
      setPopularMovies(popularMoviesList.results.slice(0, 10));
      setTrendingMovies(trendingMoviesList.results.slice(0, 10));
      setRatedMovies(ratedMoviesList.results.slice(0, 10));
      setCast(bannerMovieCast.cast.slice(0, 8));
      setGenres(allGenres.genres);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <h3>
          <FontAwesomeIcon icon={faSpinner} spin />
        </h3>
      </div>
    );
  }

  return (
    <>
      <Banner
        backDrop={`http://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
        bannerMovie={bannerMovie}
        cast={cast}
      />
      <GenreMovies
        genresWithMovies={genreMoviesList}
        popularMovies={popularMovies}
        trendingMovies={trendingMovies}
        ratedMovies={ratedMovies}
      />
    </>
  );
};

export default Homepage;
