import React, { Component } from 'react';
import { Memo } from 'components';
import './index.css';

class MemoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
    return update;
  }

  render() {
    let data = this.props.data;

    // sorting
    data = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // map data to components
    const memoList = data.map(
      (memo, index) => (
        <Memo
          data={memo}
          key={memo._id}
          index={index}
          onLikeEvent={this.props.onLikeEvent}
          token={this.props.token}
          />
      ));

    return (
      <div className="container MemoList">
        {memoList}
      </div>
    );
  }
};

export default MemoList;