import React from 'react';

const Loader = ({ title, isLoading, disabled, type }) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={isLoading ? 'loading' : ''}
    >
      {isLoading ? <span>{title}</span> : title}
    </button>
  );
};

export default Loader;
