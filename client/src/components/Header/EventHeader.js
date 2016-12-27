import React from 'react';
import './EventHeader.css';
import { Link } from 'react-router';

const EventHeader = ({eventId}) => {
  return (
    <nav className="default teal" role="navigation">
      <div className="nav-wrapper">
        <a className="brand-logo center">Event Name</a>
        <a href="#" data-activates="mobile-demo" className="button-collapse show-on-large"><i className="material-icons">menu</i></a>
        <ul className="side-nav" id="mobile-demo">
          <div className="side-header teal title">
            <div className="container">
              <div className="wrapper">
                <div className="sub-title">
                  Event Name
              </div>
                <div className="sub-title">
                  7586
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
};

export default EventHeader;