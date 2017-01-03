import React, { Component } from 'react';
import { EventsHeader, EventList, Spinner } from 'components';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as auth from 'actions/auth';
import * as events from 'actions/events';

import alert from 'alertifyjs';

class Events extends Component {

  constructor(props) {
    super(props);

    this.state = {
      initialLoading: false
    }
  }

  componentDidMount() {
    this.props.actions.getStatus()
      .then(() => {
        if (!this.props.status.isLoggedIn) {
          alert.success('Please login!');
          browserHistory.push('/auth/login');
        } else {
          this.props.actions.listEvents()
            .then(() => {
              this.setState({
                initialLoading: true
              });
            });
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

  handleRemoveEvents = (index, eventId) => {
    this.props.actions.removeEvents(index, { eventId })
      .then(() => {
        alert.success('Event deleted!');
      });
  }

  handleCreateEvents = (eventName, eventId) => {
    return this.props.actions.createEvents({ eventName, eventId })
      .then(() => {
        if (this.props.createStatus.status === 'SUCCESS') {
          alert.success('The new event has been created!');
          this.props.actions.listEvents();
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
    const eventList = (
      <EventList
        onCreateEvents={this.handleCreateEvents}
        onRemoveEvents={this.handleRemoveEvents}
        data={this.props.listStatus.data}
        />
    );

    const spinner = (<Spinner />);

    return (
      <div>
        <EventsHeader
          name={this.props.status.name}
          onLogout={this.handleLogout}
          />
        {(this.props.listStatus.status === 'WAITING' && !this.state.initialLoading)
          ? spinner : eventList}
      </div>
    );
  }
}

Events = connect(state => {
  return {
    status: state.auth.status,
    createStatus: state.events.create,
    listStatus: state.events.list,
    removeStatus: state.events.remove
  }
}, dispatch => {
  return {
    actions: bindActionCreators({
      getStatus: auth.getStatus,
      logout: auth.logout,
      createEvents: events.createEvents,
      listEvents: events.listEvents,
      removeEvents: events.removeEvents
    }, dispatch)
  }
})(Events);
export default Events;