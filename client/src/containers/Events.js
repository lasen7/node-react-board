import React, { Component } from 'react';
import { EventsHeader, EventList } from 'components';

class Events extends Component {
  render() {
    return (
      <div>
        <EventsHeader />
        <EventList />
      </div>
    );
  }
}

export default Events;