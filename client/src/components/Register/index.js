import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';

class Register extends Component {
  render() {
    return (
      <div className="container register">
        <div className="row">
          <div className="card">
            <div className="card-content"> 
              <span className="card-title">Sign Up</span>

              <div className="input-field col s12">
                <input id="username" type="text" />
                <label data-error="wrong">Name</label>
              </div>

              <div className="input-field col s12">
                <input id="email" type="email" className="validate" />
                <label data-error="wrong">Email</label>
              </div>

              <div className="input-field col s12">
                <input id="password" type="password" className="validate" />
                <label>Password</label>
              </div>

              <div className="row">
                <div className="center"> <a className="waves-effect waves-light btn">Sign up</a> </div>
              </div>

              <div className="center">
                 <Link to="/auth/login">Already have an account?</Link> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;