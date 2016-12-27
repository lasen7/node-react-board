import React from 'react';
import './index.css';

const Memo = () => {
  return (
    <div className="container Memo">
      <div className="row">        
        <div className="card">
          <div className="card-content">
            <div className="Title">
              Name | Date
              <div className="Right">
                <span className="Count">1</span>
                <a href="#"><i className="material-icons Star">star</i></a>
              </div>
            </div>
            <div>
              been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It ha
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Memo;