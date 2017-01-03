import React, { Component } from 'react';
import './index.css';

class Memo extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    let current = {
      ...this.props,
      index: 0
    };

    let next = {
      ...nextProps,
      index: 0
    };

    let update = JSON.stringify(current) !== JSON.stringify(next);
    return update;
  }

  handleLikeEvent = () => {
    const {data, index, token} = this.props;
    let isLike = (data.like.indexOf(token) > -1) ? false : true;
    this.props.onLikeEvent(this.props.data._id, isLike, index);
  }

  render() {
    const {data, token} = this.props;
    let likeStyle = (data.like.indexOf(token) > -1) ? { color: '#ff9980' } : {};

    return (
      <div className="Memo">
        <div className="row">
          <div className="card">
            <div className="card-content">
              <div className="Title">
                {data.writer || 'Anonymous'} | {data.date}
                <div className="Right">
                  <span className="Count">{data.like.length}</span>
                  <i
                    className="material-icons Star icon-button"
                    style={likeStyle}
                    onClick={this.handleLikeEvent}
                    >star</i>
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