import React from "react";
import MoviesGallery from "./MoviesGallery";

// API calls functions and endpoints
import calls from "../apiCalls.js";
import endpoints from "../apiEndpoints.js";

const TrendingMovies = () => {
  return (
    <>
      <MoviesGallery
        call={calls.fetchTrendingMovies}
        heading="Trending Movies"
        endPoint={endpoints.trendingMovies}
      />
    </>
  );
};

export default TrendingMovies;
