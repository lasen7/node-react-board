import React, { Component } from 'react';
import './index.css';
import { Event, Create } from 'components';

const propTypes = {
  onCreateEvents: React.PropTypes.func,
  onRemoveEvents: React.PropTypes.func,
  data: React.PropTypes.array,
};

const defaultProps = {
  onCreateEvents: (id, pw) => { console.error('onCreateEvents function not defined'); },
  onRemoveEvents: (id, pw) => { console.error('onRemoveEvents function not defined'); },
  data: [],
};

class EventList extends Component {

  render() {
    // map data to components
    const eventList = this.props.data.map(
      (event, index) => (
        <Event
          data={event}
          key={event.eventId}
          index={index}
          onRemoveEvents={this.props.onRemoveEvents}
          />
      )
    );

    return (
      <div className="container EventList">
        {eventList}
        <Create
          onCreateEvents={this.props.onCreateEvents}
          />
      </div>
    );
  }
};

EventList.propTypes = propTypes;
EventList.defaultProps = defaultProps;

export default EventList;