import React, { Component } from 'react';
import { EventsHeader, EventList } from 'components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as auth from 'actions/auth';
import * as events from 'actions/events';

import alert from 'alertifyjs';

class Events extends Component {

  componentDidMount() {
    this.props.actions.getStatus()
      .then(() => {
        if (!this.props.status.isLoggedIn) {
          alert.success('Please login!');
          browserHistory.push('/auth/login');
        } else {
          this.props.actions.listEvents();
        }
      });
  }

  handleLogout = () => {
    this.props.actions.logout()
      .then(() => {
        alert.success('Good Bye!');
        browserHistory.push('/');
      });
  }

  handleCreateEvents = (eventName, eventId) => {
    return this.props.actions.createEvents({ eventName, eventId })
      .then(() => {
        if (this.props.createStatus.status === 'SUCCESS') {
          // TODO: fetch events
          alert.success('ok');
          return -1;
        } else {
          /*
            Error code:
              1. Invalid event name
              2. Invalid event id
              3. Event id already exists
          */
          const errorMessage = [
            'Invalid event name',
            'Invalid event id',
            'Event id already exists'
          ];

          alert.error(errorMessage[this.props.createStatus.error - 1]);
          return this.props.createStatus.error;
        }
      });
  }

  render() {
    return (
      <div>
        <EventsHeader
          name={this.props.status.name}
          onLogout={this.handleLogout}
          />
        <EventList
          onCreateEvents={this.handleCreateEvents}
          data={this.props.listStatus.data}
          />
      </div>
    );
  }
}

Events = connect(state => {
  return {
    status: state.auth.status,
    createStatus: state.events.create,
    listStatus: state.events.list,
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      getStatus: auth.getStatus,
      logout: auth.logout,
      createEvents: events.createEvents,
      listEvents: events.listEvents,
    }, dispatch)
  }
})(Events);
export default Events;