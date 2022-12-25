import React from 'react';
import './Button.css';

const UIButton = ({ onClick = () => {} }) => {
  return (
    <button onClick={onClick} className="ui-button">
      New Collaborators
    </button>
  );
};

export default UIButton;
