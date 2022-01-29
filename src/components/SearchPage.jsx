import React from "react";
import { useLocation } from "react-router-dom";
import MoviesGallery from "./MoviesGallery";

// API calls functions and endpoints
import calls from "../apiCalls.js";
import endpoints from "../apiEndpoints.js";

const SearchPage = () => {
  const params = useLocation().search;
  const term = new URLSearchParams(params).get("term");

  return (
    <>
      <MoviesGallery
        heading=""
        call={calls.fetchSearchMovie}
        endPoint={endpoints.searchMovie}
        param={term}
        isSearchPage={true}
      />
    </>
  );
};

export default SearchPage;
