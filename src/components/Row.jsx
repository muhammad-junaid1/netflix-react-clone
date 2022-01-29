import React from "react";
import { Link } from "react-router-dom";

const Row = ({ heading, movies, seeAllLinkPath }) => {
  return (
    <>
      <div className="movies-row">
        <div className="movies-row-header">
          <h1>{heading}</h1>
          <span>
            <Link to={seeAllLinkPath}>See all</Link>
          </span>
        </div>
        <div className="movies-row-images">
          {movies.map((movie) => {
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
      </div>
    </>
  );
};

export default Row;
