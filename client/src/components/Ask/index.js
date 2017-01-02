import React, { Component } from 'react';
import { Write, MemoList, FloatingButton, Spinner } from 'components';

class Ask extends Component {

  render() {
    const {onCreateEvent, onLikeEvent, fetching, data, token, name} = this.props;

    const memoList = (
      <MemoList
        data={data}
        onLikeEvent={onLikeEvent}
        token={token}
        />);

    return (
      <div>
        <Write 
          name={name}
          onCreateEvent={onCreateEvent} />
        {memoList}
        <FloatingButton />
      </div>
    );
  }
};

//{fetching ? spinner : memoList}

export default Ask;