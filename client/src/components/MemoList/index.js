import React from 'react';
import { Memo } from 'components';
import './index.css';

const MemoList = () => {
  return (
    <div className="container MemoList">
      <Memo />
      <Memo />
      <Memo />
      <Memo />
      <Memo />
    </div>
  );
};

export default MemoList;