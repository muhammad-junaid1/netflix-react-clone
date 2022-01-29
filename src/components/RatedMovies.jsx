import React from "react";
import MoviesGallery from "./MoviesGallery";

// API calls functions and endpoints
import calls from "../apiCalls.js";
import endpoints from "../apiEndpoints.js";

const RatedMovies = () => {
  return (
    <>
      <MoviesGallery
        call={calls.fetchRatedMovies}
        endPoint={endpoints.ratedMovies}
        heading="Rated Movies"
      />
    </>
  );
};

export default RatedMovies;
