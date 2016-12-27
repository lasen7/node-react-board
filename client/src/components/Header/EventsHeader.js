import React from 'react';
import './EventsHeader.css';

const EventsHeader = () => {
  return (
    <div>
      <ul id="dropdown1" className="dropdown-content">
        <li><a href="#!">Logout</a></li>
      </ul>
      <nav className="teal">
        <div className="nav-wrapper">
          <div>
            <span className="Header-logo">My events</span>
            <ul className="right">
              <li><a href="#"><i className="material-icons">search</i></a></li>
              <li><a className="dropdown-button" href="#!" data-beloworigin="true" data-activates="dropdown1">Username<i className="material-icons right">arrow_drop_down</i></a></li>
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
};

export default EventsHeader;