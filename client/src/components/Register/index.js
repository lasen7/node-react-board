import React, { Component } from 'react';
import { Link } from 'react-router';
import './index.css';

const propTypes = {
  onRegister: React.PropTypes.func
};

const defaultProps = {
  onRegister: (id, pw) => { console.error('onRegister function not defined'); }
};

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleRegister = () => {
    const {name, email, password} = this.state;

    this.props.onRegister(name, email, password)
      .then(result => {
        if (result === 1) {
          this.nameInput.focus();
        } else if (result === 2) {
          this.emailInput.focus();
        } else if (result === 3) {
          this.passwordInput.focus();
        }
      });
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleRegister();
    }
  }

  render() {
    return (
      <div className="container register">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Sign Up</span>

              <div className="input-field col s12">
                <input name="name" type="text"
                  onChange={this.handleChange}
                  value={this.state.name}
                  ref={(input) => { this.nameInput = input } } />
                <label data-error="wrong">Name</label>
              </div>

              <div className="input-field col s12">
                <input name="email" type="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                  ref={(input) => { this.emailInput = input } } />
                <label data-error="wrong">Email</label>
              </div>

              <div className="input-field col s12">
                <input name="password" type="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                  ref={(input) => { this.passwordInput = input } }
                  onKeyPress={this.handleKeyPress} />
                <label>Password</label>
              </div>

              <div className="row">
                <div className="center">
                  <a className="waves-effect waves-light btn"
                    onClick={this.handleRegister}>Sign up</a>
                </div>
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

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;