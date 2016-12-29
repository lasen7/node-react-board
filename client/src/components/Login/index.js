import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';

const propTypes = {
  onLogin: React.PropTypes.func
};

const defaultProps = {
  onLogin: (id, pw) => { console.error('onLogin function not defined'); }
};

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleLogin = () => {
    const {email, password} = this.state;

    this.props.onLogin(email, password);
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleLogin();
    }
  }

  render() {
    return (
      <div className="container login">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Sign In</span>

              <div className="input-field col s12">
                <input name="email" type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  />
                <label data-error="wrong">Email</label>
              </div>

              <div className="input-field col s12">
                <input name="password" type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                  />
                <label>Password</label>
              </div>

              <div className="row">
                <div className="center">
                  <a className="waves-effect waves-light btn"
                    onClick={this.handleLogin}>Sign In</a>
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

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;