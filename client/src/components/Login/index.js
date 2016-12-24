import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';

class Login extends Component {
  render() {
    return (
      <div className="container login">
        <div className="row">
          <div className="card">
            <div className="card-content"> 
              <span className="card-title">Sign In</span>

              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label data-error="wrong">Email</label>
              </div>

              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label>Password</label>
              </div>

              <div className="row">
                <div className="center">
                  <a className="waves-effect waves-light btn">Sign In</a>
                </div>
              </div>

              <div className="center"> 
                <Link to="/auth/register">Don't have an ID? Create one now.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;