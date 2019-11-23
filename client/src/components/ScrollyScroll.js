import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';

// const useStyles = makeStyles(theme => ({
//   root: {
//     position: 'fixed',
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
// }));

export default function ScrollyScroll(props) {
  const { children, window } = props;
//   const classes = useStyles();

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