import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "./Banner";
import MoviesGallery from "./MoviesGallery";
import { Redirect } from "react-router-dom";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// API calls functions
import calls from "../apiCalls.js";

const SingleMovie = () => {
  const movieId = useParams().movieId;
  const [bannerMovie, setBannerMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [redirectPath, setRedirectPath] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Fetch the data
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);
  const fetchData = async () => {
    try {
      setLoading(true);
      const movie = await calls.fetchSingleBannerMovie(movieId);
      if (!(movie.success === false)) {
        setBannerMovie(movie);
        const bannerMovieCast = await calls.fetchCast(`${movie.id}`);
        setCast(bannerMovieCast.cast.slice(0, 8));
      } else {
        setRedirectPath("/");
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
  } else if (redirectPath) {
    return <Redirect to={redirectPath} />;
  } else {
    return (
      <>
        <div className="single-movie-wrapper">
          <Banner
            backDrop={`http://image.tmdb.org/t/p/original${bannerMovie.backdrop_path}`}
            bannerMovie={bannerMovie}
            cast={cast}
          />
          <MoviesGallery
            heading="More Like This"
            call={calls.fetchRecommended}
            param={movieId}
          />
        </div>
      </>
    );
  }
};

export default SingleMovie;
