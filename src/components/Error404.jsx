import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <>
      <div className="error-404-wrapper">
        <h1>404</h1>
        <h3>Sorry we can't find that page 😥</h3>
        <br />
        <Link to="/">Return to home</Link>
      </div>
    </>
  );
};

export default Error404;
