import React from 'react';

function Cross() {
  return (
    <svg width="100%" height="100%">
      <line
        x1="0%" y1="0%"
        x2="100%" y2="100%"
      />
      <line
        x1="0%" y1="100%"
        x2="100%" y2="0%"
      />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="100%" height="100%">
      <line
        x1="0%" y1="25%"
        x2="50%" y2="75%"
      />
      <line
        x1="100%" y1="25%"
        x2="50%" y2="75%"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg width="100%" height="100%">
      <line
        x1="25%" y1="50%"
        x2="50%" y2="75%"
      />
      <line
        x1="100%" y1="0%"
        x2="50%" y2="75%"
      />
    </svg>
  );
}

export { Cross, Arrow, Check };
