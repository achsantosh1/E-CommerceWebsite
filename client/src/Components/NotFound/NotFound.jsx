import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Oops! The page you're looking for doesn't exist.</h2>
      <p>
        <Link to="/">Go back to the homepage</Link>
      </p>
    </div>
  );
};

export default NotFound;
