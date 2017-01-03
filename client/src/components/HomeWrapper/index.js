import React from 'react';
import './index.css';
import { Search, LoginLink } from 'components';

const HomeWrapper = ({isLoggedIn}) => {
  return (
    <div className="HomeWrapper">
      <Search />
      <LoginLink to={isLoggedIn ? '/events' : '/auth/login'} />
    </div>
  );
};

export default HomeWrapper;