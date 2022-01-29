const baseUrl = "https://api.themoviedb.org/3";

const endpoints = {
  trendingMovies: `${baseUrl}/trending/movie/day`,
  popularMovies: `${baseUrl}/movie/popular`,
  ratedMovies: `${baseUrl}/movie/top_rated`,
  singleMovie: `${baseUrl}/movie`,
  movieCast: `${baseUrl}/movie`,
  genres: `${baseUrl}/genre/movie/list`,
  genreMovies: `${baseUrl}/discover/movie`,
  recommendedMovies: `${baseUrl}/movie`,
  searchMovie: `${baseUrl}/search/movie`
};

export default endpoints;
