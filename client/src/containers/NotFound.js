import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div>
      <h2>Follwing Page is not found</h2>
      <Link to="/">Return to home</Link>
    </div>
  );
};

export default NotFound;