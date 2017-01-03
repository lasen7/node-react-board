import React, { Component } from 'react';
import './index.css';

class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: props.name
    };
  }

  handleChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleSave = () => {
    const name = this.state.name;
    this.props.onEditProfile(name);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.name !== this.props.name) {
      this.setState({
        name: nextProps.name
      });
    }
  }

  render() {
    return (
      <div className="container Profile">

        <div className="Profile-avatar">
          <img role="presentation" src="https://dwmr9z5ou2pfk.cloudfront.net/master/8bba6ed53becc627246d68d7277ec66a.svg" />
        </div>

        <div className="row">
          <div className="card">
            <div className="card-content">

              <div className="input-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={this.state.name}
                  onChange={this.handleChange} />
              </div>

              <div className="center">
                <a
                  className="waves-effect waves-light btn"
                  onClick={this.handleSave}>Save</a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Profile;