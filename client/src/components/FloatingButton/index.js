/* global $ */

import React from 'react';

const FloatingButton = () => {

  const handleClick = () => {
    $('#modal1').modal('open');
  }

  return (
    <div className="fixed-action-btn">
      <a
        onClick={handleClick}
        className="btn-floating btn-large btn-large waves-effect waves-light teal">
        <i className="material-icons">mode_edit</i>
      </a>
    </div>
  );
};

export default FloatingButton;