import React, { useState, useEffect } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";

// Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Api Key
const apiKey = process.env.REACT_APP_API_KEY;

const MoviesGallery = ({ heading, call, param, endPoint, isSearchPage }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [galleryHeading, setGalleryHeading] = useState(heading);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let pageNo = new URLSearchParams(location.search).get("page") || 1;

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, pageNo]);

  const fetchData = async () => {
    try {
      setLoading(true);
      let movies;
      if (param) {
        movies = await call(param);
      } else {
        movies = await call();
      }
      if (isSearchPage) {
        if (movies.results.length === 0) {
          setGalleryHeading("Not found!");
        } else {
          setGalleryHeading(`Search results for "${param}"`);
        }
      }
      if (movies.total_pages !== 0 || movies.results.length !== 0) {
        if (pageNo > movies.total_pages) {
          setRedirect(true);
        }
      }
      if (endPoint) {
        setTotalPages(movies.total_pages);
      }

      let response;
      if (endPoint) {
        if (param) {
          if (isSearchPage) {
            response = await fetch(
              `${endPoint}?api_key=${apiKey}&query=${param}&page=${pageNo}`
            );
          } else {
            response = await fetch(
              `${endPoint}?api_key=${apiKey}&with_genres=${param}&page=${pageNo}`
            );
          }
        } else {
          response = await fetch(
            `${endPoint}?api_key=${apiKey}&page=${pageNo}`
          );
        }
        const moviesWithPage = await response.json();
        setAllMovies(moviesWithPage.results);
      } else {
        setAllMovies(movies.results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Redirect to="/" />;
  } else if (loading) {
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
      <div className="movies-wrapper">
        <div className="movies-content">
          <div className="movies-content-header">
            <h1>{galleryHeading}</h1>
            {allMovies.length > 0 && totalPages !== 1 && (
              <span style={{ fontSize: "14px" }}>
                Page {pageNo} out of {totalPages}
              </span>
            )}
          </div>
          <div className="movies-images">
            {allMovies.map((movie) => {
              return (
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`http://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    title={movie.title}
                  />
                </Link>
              );
            })}
          </div>
          <div className="pages-links">
            {pageNo > 1 && [
              !isSearchPage ? (
                <Link to={`${location.pathname}?page=1`}>First</Link>
              ) : (
                <Link to={`${location.pathname}?term=${param}&page=1`}>
                  First
                </Link>
              ),
            ]}
            {pageNo > 1 && [
              !isSearchPage ? (
                <Link to={`${location.pathname}?page=${Number(pageNo) - 1}`}>
                  Previous
                </Link>
              ) : (
                <Link
                  to={`${location.pathname}?term=${param}&page=${
                    Number(pageNo) - 1
                  }`}
                >
                  Previous
                </Link>
              ),
            ]}
            {pageNo < totalPages && [
              !isSearchPage ? (
                <Link to={`${location.pathname}?page=${Number(pageNo) + 1}`}>
                  Next
                </Link>
              ) : (
                <Link
                  to={`${location.pathname}?term=${param}&page=${
                    Number(pageNo) + 1
                  }`}
                >
                  Next
                </Link>
              ),
            ]}
            {pageNo > 1 &&
              pageNo < totalPages && [
                !isSearchPage ? (
                  <Link to={`${location.pathname}?page=${totalPages}`}>
                    Last
                  </Link>
                ) : (
                  <Link
                    to={`${location.pathname}?term=${param}&page=${totalPages}`}
                  >
                    Last
                  </Link>
                ),
              ]}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesGallery;
