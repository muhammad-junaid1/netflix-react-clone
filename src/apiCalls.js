// Package to manage environment variables
import "dotenv";

// All urls required to perform API requests
import endpoints from "./apiEndpoints.js";

// Get the API key from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

const fetchPopularMovies = async () => {
  try {
    const response = await fetch(
      `${endpoints.popularMovies}?api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchTrendingMovies = async () => {
  try {
    const response = await fetch(
      `${endpoints.trendingMovies}?api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchRatedMovies = async () => {
  try {
    const response = await fetch(`${endpoints.ratedMovies}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchSingleBannerMovie = async (movieId) => {
  try {
    const response = await fetch(
      `${endpoints.singleMovie}/${movieId}?api_key=${apiKey}&append_to_response=videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchRecommended = async (movieId) => {
  try {
    const response = await fetch(
      `${endpoints.recommendedMovies}/${movieId}/recommendations?api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchCast = async (movieId) => {
  try {
    const response = await fetch(
      `${endpoints.movieCast}/${movieId}/credits?api_key=${apiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGenres = async () => {
  try {
    const response = await fetch(`${endpoints.genres}?api_key=${apiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchGenreMovies = async (genreId) => {
  try {
    const response = await fetch(
      `${endpoints.genreMovies}?api_key=${apiKey}&with_genres=${genreId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const fetchSearchMovie = async (query) => {
  try {
    const response = await fetch(
      `${endpoints.searchMovie}?api_key=${apiKey}&query=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

const apiCalls = {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchRatedMovies,
  fetchSingleBannerMovie,
  fetchCast,
  fetchGenres,
  fetchGenreMovies,
  fetchRecommended,
  fetchSearchMovie
};

export default apiCalls;
