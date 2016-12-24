import React, { Component } from 'react';
import { Match } from 'react-router';
import { Login, Register } from 'components';

class Auth extends Component {
  render() {
    const {pathname} = this.props;

    return (
      <div>
        <Match exactly pattern={pathname} component={Login} />
        <Match pattern={`${pathname}/login`} component={Login} />
        <Match exactly pattern={`${pathname}/register`} component={Register} />
      </div>
    );
  }
}

export default Auth;