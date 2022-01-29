import React, { useState, useEffect } from "react";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const Banner = ({ backDrop, bannerMovie, cast }) => {
  const [popup, setPopup] = useState(false);
  const [trailer, setTrailer] = useState({});
  const handleClick = () => {
    setPopup(true);
  };
  if (popup) {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".watch-button")) {
        setPopup(false);
      }
    });
  }
  useEffect(() => {
    const trailerKey =
      bannerMovie.videos.results.length > 0
        ? bannerMovie.videos.results.find(
            (trailer) => trailer.site === "YouTube"
          )
        : "";
    if (trailerKey) {
      setTrailer(trailerKey.key);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className="banner-wrapper"
        style={{
          backgroundImage: backDrop && `url(${backDrop})`,
        }}
      >
        <div className="banner-content-wrapper">
          <div className="banner-content">
            {bannerMovie.title && bannerMovie.original_title && (
              <h1>
                {bannerMovie.title.length > bannerMovie.original_title
                  ? bannerMovie.original_title
                  : bannerMovie.title}
              </h1>
            )}

            <div className="movie-information">
              {bannerMovie.release_date !== "" && (
                <>
                  <span>{String(bannerMovie.release_date).slice(0, 4)}</span>
                  <span>|</span>
                </>
              )}
              <span>
                <FontAwesomeIcon
                  icon={faStar}
                  style={{ color: "yellow", paddingRight: "3px" }}
                />
                {bannerMovie.vote_average}
              </span>

              {bannerMovie.spoken_languages.length > 0 && (
                <>
                  <span>|</span>
                  <span>
                    {bannerMovie.spoken_languages.length > 1
                      ? [
                          bannerMovie.spoken_languages
                            .slice(0, 5)
                            .map(
                              (lang, i) =>
                                `${i > 0 ? ", " : ""}${lang.english_name}`
                            ),
                        ]
                      : bannerMovie.spoken_languages[0].english_name}
                  </span>
                </>
              )}
            </div>
            {bannerMovie.overview && (
              <p>
                {bannerMovie.overview.length > 250
                  ? `${bannerMovie.overview.substr(0, 250)}...`
                  : bannerMovie.overview}
              </p>
            )}

            {bannerMovie.genres.length > 0 && (
              <>
                <span style={{ color: "#a3a3a3" }}>Genres: </span>
                {bannerMovie.genres.map((genre, i) => (
                  <>
                    {i > 0 ? ", " : ""}
                    <Link
                      to={`/genre/${genre.id}`}
                      className="genre"
                      key={genre.id}
                    >
                      {genre.name}
                    </Link>
                  </>
                ))}
              </>
            )}
            <div className="buttons">
              {trailer ? (
                <button
                  className="watch-button"
                  type="button"
                  onClick={handleClick}
                >
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ fontSize: "14px", marginRight: "5px" }}
                  />
                  Watch Trailer
                </button>
              ) : (
                <button className="watch-button" type="button" disabled>
                  <FontAwesomeIcon
                    icon={faPlay}
                    style={{ fontSize: "14px", marginRight: "5px" }}
                  />
                  Watch Trailer
                </button>
              )}
            </div>
            <div className="cast">
              {cast.length > 0 && (
                <>
                  <span style={{ color: "#a3a3a3" }}>Cast: </span>
                  <span>
                    {cast.map((person, i) => {
                      return (
                        <>
                          {i > 0 ? ", " : ""}
                          {person.original_name}
                        </>
                      );
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {popup && (
          <div className="trailer-popup">
            <div className="trailer-popup-video">
              <iframe
                width="1150"
                height="550"
                src={`https://www.youtube.com/embed/${trailer}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <FontAwesomeIcon icon={faTimes} className="popup-cross-icon" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Banner;
