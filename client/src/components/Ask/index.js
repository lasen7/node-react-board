import React from 'react';
import { Write, MemoList, FloatingButton, Spinner } from 'components';

const Ask = ({onCreateEvent, fetching, data}) => {

  // const spinner = (<Spinner />);
  const memoList = (<MemoList data={data} />);

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