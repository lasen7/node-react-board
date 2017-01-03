import React, { Component } from 'react';
import {
  Write,
  MemoList,
  FloatingButton,
} from 'components';

class Ask extends Component {

  render() {
    const {
      onCreateEvent,
      onLikeEvent,
      onEditProfile,
      data,
      token,
      name} = this.props;

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
          onCreateEvent={onCreateEvent}
          onEditProfile={onEditProfile} />
        {memoList}
        <FloatingButton />
      </div>
    );
  }
};

export default Ask;