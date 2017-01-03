import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  const style = {
    'marginTop': '100px'
  };

  return (
    <div style={style} className="container">
      <div className="card">
        <div className="card-content center">
          <h2>Follwing Page is not found</h2>
          <Link to="/">Return to home</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;