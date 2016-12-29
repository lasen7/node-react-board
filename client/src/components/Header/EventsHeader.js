/*global $*/

import React, { Component } from 'react';
import './EventsHeader.css';

const propTypes = {
  onLogout: React.PropTypes.func,
  name: React.PropTypes.string,
  onCreateEvents: React.PropTypes.func,
};

const defaultProps = {
  name: '',
  onLogout: (id, pw) => { console.error('onLogout function not defined'); },
  onCreateEvents: (id, pw) => { console.error('onCreateEvents function not defined'); },
};

class EventsHeader extends Component {

  componentDidMount() {
    $(".dropdown-button").dropdown();
  }

  handleLogout = () => {
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <ul id="dropdown1" className="dropdown-content">
          <li><a onClick={this.handleLogout}>Logout</a></li>
        </ul>
        <nav className="teal">
          <div className="nav-wrapper">
            <div>
              <span className="Header-logo">My events</span>
              <ul className="right">
                <li><a href="#"><i className="material-icons">search</i></a></li>
                <li><a className="dropdown-button" href="#!" data-beloworigin="true" data-activates="dropdown1">{this.props.name}<i className="material-icons right">arrow_drop_down</i></a></li>
              </ul>
            </div>

            <div className="hidden">
              <form>
                <div className="input-field">
                  <input id="search" type="search" required />
                  <label><i className="material-icons">search</i></label>
                  <i className="material-icons">close</i>
                </div>
              </form>
            </div>

          </div>

        </nav>
      </div>
    );
  }
};

EventsHeader.propTypes = propTypes;
EventsHeader.defaultProps = defaultProps;

export default EventsHeader;