import React, { Component } from 'react';
import './index.css';

class Memo extends Component {

  render() {
    const {data, index} = this.props;

    return (
      <div className="Memo">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <div className="Title">
                {data.writer || 'Anonymous'} | {data.date}
                <div className="Right">
                  <span className="Count">1</span>
                  <a href="#"><i className="material-icons Star">star</i></a>
                </div>
              </div>
              <div>
                {data.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Memo;