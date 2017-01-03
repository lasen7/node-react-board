/*global $*/

import React, { Component } from 'react';
import './Event.css';

import { browserHistory } from 'react-router';

const propTypes = {
  data: React.PropTypes.object,
  onRemoveEvents: React.PropTypes.func,
  index: React.PropTypes.number,
};

const defaultProps = {
  data: {},
  onRemoveEvents: (id, pw) => { console.error('onRemoveEvents function not defined'); },
  index: -1
};

//const Event = ({data}) => {
class Event extends Component {

  componentDidMount() {
    $(".dropdown-button").dropdown();
  }

  handleOpen = () => {
    const {eventId} = this.props.data;
    browserHistory.push(`/event/${eventId}/ask`);
  }

  handleRemove = () => {
    const {eventId} = this.props.data;
    const {index} = this.props;

    this.props.onRemoveEvents(index, eventId);
  }

  render() {
    const {eventName, eventId, date} = this.props.data;

    return (
      <div className="row Event">
        <div className="card">
          <div className="card-content">
            <div className="Title">
              {eventName} | <span className="grey-text">#{eventId}</span>

              <div className="Right">
                <a className='dropdown-button' href='#' data-beloworigin="true" data-activates={`dropdown-${eventId}`}><i className="material-icons">menu</i></a>
                <ul id={`dropdown-${eventId}`} className='dropdown-content'>
                  <li><a onClick={this.handleOpen}>Open</a></li>
                  <li><a onClick={this.handleRemove}>Delete</a></li>
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