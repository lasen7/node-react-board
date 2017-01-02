import React from 'react';
import { Write, MemoList, FloatingButton, Spinner } from 'components';

const Ask = ({onCreateEvent, onLikeEvent, fetching, data, token}) => {

  // const spinner = (<Spinner />);
  const memoList = (
    <MemoList
      data={data}
      onLikeEvent={onLikeEvent}
      token={token}
      />);

  return (
    <div>
      <Write onCreateEvent={onCreateEvent} />
      {memoList}
      <FloatingButton />
    </div>
  );
};

//{fetching ? spinner : memoList}

export default Ask;