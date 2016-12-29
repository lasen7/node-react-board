import React from 'react';
import './index.css';
import { Search, LoginLink } from 'components';

const HomeWrapper = () => {
  return (
    <div className="HomeWrapper">
      <Search />
      <LoginLink to="/auth/login" />
    </div>
  );
};

export default HomeWrapper;