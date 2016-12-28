import React from 'react';
import './index.css';
import { Event, Create } from 'components';

const EventList = () => {

  return (
    <div className="container EventList">
      <Event />
      <Event />
      <Event />
      <Create />
    </div>
  );
};

export default EventList;