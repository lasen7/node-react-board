import React from 'react';
import './Event.css';

const Event = () => {
  return (
    <div className="row Event">
      <div className="card">
        <div className="card-content">
          <div className="Title">
            Name | <span className="grey-text">#7586</span>

            <div className="Right">
              <a className='dropdown-button' href='#' data-beloworigin="true" data-activates={`dropdown-`}><i className="material-icons">menu</i></a>
              <ul id={`dropdown-`} className='dropdown-content'>
                <li><a href="#!">Delete</a></li>
              </ul>
            </div>

            <div>
              2016.12.28
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;