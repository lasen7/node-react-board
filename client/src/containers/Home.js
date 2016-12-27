import React, { Component } from 'react';
import { Search, LoginLink } from 'components';

class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <LoginLink to="/auth" />
      </div>
    );
  }
}

export default Home;