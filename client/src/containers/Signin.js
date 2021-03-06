import React, { Component } from 'react';
import { Login } from 'components';

import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as auth from 'actions/auth';

import alert from 'alertifyjs';

class Signin extends Component {

  componentDidMount() {
    this.props.actions.getStatus()
      .then(() => {
        if (this.props.authStatus.isLoggedIn) {
          alert.success('Welcome!');
          browserHistory.push('/events');
        }
      });
  }

  handleLogin = (email, password) => {
    this.props.actions.login({ email, password })
      .then(() => {
        if (this.props.status === 'SUCCESS') {
          alert.success('Welcome!');
          browserHistory.push('/events');
        } else {
          alert.error('Incorrect username or password');
        }
      });
  }

  render() {
    return (
      <div>
        <div className="center">
          <Link to="/"><h3>Home</h3></Link>
          <Login onLogin={this.handleLogin} />
        </div>
      </div>
    );
  }
}

Signin = connect(state => {
  return {
    status: state.auth.login.status,
    authStatus: state.auth.status,
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      login: auth.login,
      getStatus: auth.getStatus,
    }, dispatch)
  }
})(Signin);
export default Signin;