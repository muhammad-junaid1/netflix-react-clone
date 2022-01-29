import React, { useState, useEffect } from "react";
import MoviesGallery from "./MoviesGallery";

// Hook to get the genre id from the url
import { useParams, Redirect } from "react-router-dom";

// API calls functions and endpoints
import calls from "../apiCalls.js";
import endpoints from "../apiEndpoints.js";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GenrePage = () => {
  const params = useParams();
  const [genreName, setGenreName] = useState("");
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const allGenres = await calls.fetchGenres();
      const matchedGenre = allGenres.genres.find((genre) => {
        return genre.id === Number(params.genreId);
      });
      if (matchedGenre) {
        setGenreName(matchedGenre.name);
        setRedirectUrl(null);
      } else {
        setRedirectUrl("/");
      }
      setLoading(false);
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
  } else if (redirectUrl) {
    return <Redirect to={redirectUrl} />;
  } else {
    return (
      <>
        <MoviesGallery
          call={calls.fetchGenreMovies}
          endPoint={endpoints.genreMovies}
          heading={`Category: ${genreName}`}
          param={params.genreId}
        />
      </>
    );
  }
};

export default GenrePage;
