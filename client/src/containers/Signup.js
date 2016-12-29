import React, { Component } from 'react';
import { Register } from 'components';

import { Link, browserHistory } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as auth from 'actions/auth';

import alert from 'alertifyjs';

class Signup extends Component {

  handleRegister = (name, email, password) => {
    return this.props.actions.register({ name, email, password })
      .then(() => {
        if (this.props.status === 'SUCCESS') {
          alert.success('Success! Please log in.');
          browserHistory.push('/auth/login');
          return true;
        } else {

          /*
            Error code:
              1. Bad Username
              2. Bad email
              3. Bad password
              4. Email exists
          */
          const errorMessage = [
            'Invalid name',
            'Invalid email',
            'Invalid password',
            'Email already exists'
          ];

          alert.error(errorMessage[this.props.errorCode - 1]);
          return this.props.errorCode;
        }
      });
  }

  render() {
    return (
      <div>
        <div className="center">
          <Link to="/"><h3>Home</h3></Link>
          <Register onRegister={this.handleRegister} />
        </div>
      </div>
    );
  }
}

Signup = connect(state => {
  return {
    status: state.auth.register.status,
    errorCode: state.auth.register.error
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      register: auth.register
    }, dispatch)
  }
})(Signup);
export default Signup;