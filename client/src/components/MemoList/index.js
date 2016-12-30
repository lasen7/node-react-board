import React, { Component } from 'react';
import { Memo } from 'components';
import './index.css';

//const MemoList = ({data}) => {
class MemoList extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    let update = JSON.stringify(this.props) !== JSON.stringify(nextProps);
    return update;
  }

  render() {
    // sorting
    let {data} = this.props;
    data = data.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    // map data to components
    const memotList = data.map(
      (memo, index) => (
        <Memo
          data={memo}
          index={index}
          key={memo._id}
          />
      ));

    return (
      <div className="container MemoList">
        {memotList}
      </div>
    );
  }
};

export default MemoList;