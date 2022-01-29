import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import Avatar from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Nav = ({ genres }) => {
  const [dropDown, setDropdown] = useState(false);
  const dropDownClicked = () => {
    setDropdown(!dropDown);
  };

  if (dropDown) {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".genres-dropdown")) {
        setDropdown(false);
      }
    });
  }
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-content-left">
          <Link to="/" className="logo">
            <img src={Logo} alt="" />
          </Link>

          <div className="genres-dropdown">
            <button type="button" onClick={dropDownClicked}>
              Genres{" "}
              {dropDown ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
            </button>
            {dropDown && (
              <div className="dropdown">
                {genres.map((genre) => {
                  return genre.name === "Science Fiction" ? (
                    <Link
                      onClick={() => setDropdown(false)}
                      to={`/genre/${genre.id}`}
                    >
                      Sci-Fi
                    </Link>
                  ) : (
                    <Link
                      onClick={() => setDropdown(false)}
                      to={`/genre/${genre.id}`}
                    >
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="navbar-content-right">
          <FontAwesomeIcon icon={faSearch} />
          <form autoComplete="off" action="/search">
            <input type="text" placeholder="Search" name="term" />
          </form>
          <img src={Avatar} alt="" />
          <p>Junaid</p>
        </div>
      </div>
    </div>
  );
};

export default Nav;
