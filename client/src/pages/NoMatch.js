import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: 'auto',
    maxWidth: 750,
    textAlign: 'center'
  },
}));

export default function NoMatch() { 
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        404 Page Not Found
      </Typography>
      <Typography component="p">
        🙄
      </Typography>
    </Paper>
  );
}
