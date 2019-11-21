import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Topbar from '../components/Topbar';
import Ufo from '../images/ufo.png';
import Footer from '../components/Footer';

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
    <React.Fragment>
      <Topbar />
      <Paper className={classes.root} style={{marginTop: "5vh"}}>
        <Typography variant="h5" component="h3">
          404 Page Not Found
          <img src={Ufo}></img>
        </Typography>
        <Typography component="p">
          
        </Typography>
      </Paper>
      <Footer />
    </React.Fragment>
  );
}
