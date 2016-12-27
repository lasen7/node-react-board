import React, { Component } from 'react';
import { EventHeader, Ask, Profile } from 'components';
import { Match } from 'react-router';

class Event extends Component {
  render() {
    const {pathname, params} = this.props;

    return (
      <div>
        <EventHeader eventId={params.eventId} />

        <Match exactly pattern={`${pathname}`} component={Ask} />
        <Match pattern={`${pathname}/ask`} component={Ask} />
        <Match pattern={`${pathname}/profile`} component={Profile} />
      </div>
    );
  }
}

export default Event;