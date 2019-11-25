import React from 'react';

export default function ScrollyScroll(props) {
  const { children } = props;

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector('#to-the-reviews');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
      <div onClick={handleClick}>
        {children}
      </div>
  );
}