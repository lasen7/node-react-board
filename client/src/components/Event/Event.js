/*global $*/

import React, { Component } from 'react';
import './Event.css';

const propTypes = {
  data: React.PropTypes.object
};

const defaultProps = {
  data: {}
};

//const Event = ({data}) => {
class Event extends Component {

  componentDidMount() {
    $(".dropdown-button").dropdown();
  }

  render() {
    const {eventName, eventId, date, index} = this.props.data;

    return (
      <div className="row Event">
        <div className="card">
          <div className="card-content">
            <div className="Title">
              {eventName} | <span className="grey-text">#{eventId}</span>

              <div className="Right">
                <a className='dropdown-button' href='#' data-beloworigin="true" data-activates={`dropdown-${eventId}`}><i className="material-icons">menu</i></a>
                <ul id={`dropdown-${eventId}`} className='dropdown-content'>
                  <li><a href="#!">Delete</a></li>
                </ul>
              </div>

              <div>
                {date}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

Event.propTypes = propTypes;
Event.defaultProps = defaultProps;

export default Event;