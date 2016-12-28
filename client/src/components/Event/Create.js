import React from 'react';
import './Create.css';

const Create = () => {
  return (
    <div className="row Event">
      <div className="card">
        <div className="card-content">
          <div className="Wrapper">
            <label htmlFor="Event-create"><i className="material-icons">add</i></label>
            <input id="Event-create" type="text" placeholder="Create new event" />
            <a className="waves-effect waves-light btn">Add</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;