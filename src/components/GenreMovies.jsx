import React from "react";
import Row from "./Row";

const GenreMovies = ({
  genresWithMovies,
  popularMovies,
  trendingMovies,
  ratedMovies,
}) => {
  return (
    <>
      <div className="movies-rows-wrapper">
        <div className="movies-rows-content-wrapper">
          <Row
            heading="Trending Movies"
            movies={trendingMovies}
            seeAllLinkPath={"/trending"}
          />
          <Row
            heading="Popular Movies"
            movies={popularMovies}
            seeAllLinkPath={"/popular"}
          />
          <Row
            heading="Top Rated Movies"
            movies={ratedMovies}
            seeAllLinkPath={"/rated"}
          />
          {genresWithMovies.map((genre) => {
            return (
              <Row
                heading={genre.genreName}
                seeAllLinkPath={`/genre/${genre.id}`}
                movies={genre.movies}
                key={genre.id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GenreMovies;
