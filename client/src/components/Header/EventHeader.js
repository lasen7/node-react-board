/* global $ */

import React, { Component } from 'react';
import './EventHeader.css';
import { Link } from 'react-router';

class EventHeader extends Component {

  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    const {eventName, eventId} = this.props;

    return (
      <nav className="default teal" role="navigation">
        <div className="nav-wrapper">
          <a className="brand-logo center">{eventName}</a>
          <a href="#" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
          <ul className="side-nav" id="mobile-demo">
            <div className="side-header teal title">
              <div className="container">
                <div className="wrapper">
                  <div className="sub-title">
                    {eventName}
                  </div>
                  <div className="sub-title">
                    #{eventId}
                  </div>
                </div>
              </div>
            </div>
            <li><Link to={`/event/${eventId}/ask`}><i className="material-icons">chat</i>Live</Link></li>
            <li><Link to={`/event/${eventId}/profile`}><i className="material-icons">perm_identity</i>My profile</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default EventHeader;