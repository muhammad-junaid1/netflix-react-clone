import React from "react";
import MoviesGallery from "./MoviesGallery";

// API calls functions and endpoints
import calls from "../apiCalls.js";
import endpoints from "../apiEndpoints.js";

const PopularMovies = () => {
  return (
    <>
      <MoviesGallery
        call={calls.fetchPopularMovies}
        endPoint={endpoints.popularMovies}
        heading="Popular Movies"
      />
    </>
  );
};

export default PopularMovies;
