import React from 'react';
import { Link } from 'react-router';
import './LoginLink.css';

const LoginLink = ({to}) => {
  return (
    <div>
      <div className="footer">
        <div className="row">
          <Link className="bottom" to={to}>Login as admin</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginLink;