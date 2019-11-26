import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MoneyIcon from "@material-ui/icons/Money";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import logo from "../images/LogoMakr_5Jc4Ki.png";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "grey",
    borderWidth: 1
  },
  // paper: {
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary
  // },
  logo: {
    marginTop: 1,
    height: 75
  },
  link: {
    textDecoration: "none",
    color: "grey"
  },
  p: {
 color: 'lightgrey',
 fontSize: 10,
  // position: 'absolute',
  paddingTop: 40,
  marginLeft: 10

  }
});
const useStyles = makeStyles(theme => ({}));

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          {/* <Grid item xs>
            <List>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/" }}>
                  <HomeIcon fontSize="small" />
                  Home
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/dashboard" }}>
                  <DashboardIcon fontSize="small" />
                  Dashboard
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/wizard" }}>
                  <MoneyIcon fontSize="small" />
                  Wizard
                </Link>
              </ListItem>
            </List>
          </Grid> */}
          <Grid item xs={10}>
            <Link className={classes.link} to={{ pathname: "/" }}>
              <img className={classes.logo} src={logo}></img>
            </Link>
            <p className={classes.p}> Site design / Logo © 2019 Codex; <br /> Made and Owned by 'This-Is-Our-Group</p>
          </Grid>
          <Grid item xs>
            <List style={{paddingTop: 25}}>
              <ListItem >
                <Link className={classes.link} to={{ pathname: "/Questions" }}>
                  <QuestionAnswerIcon fontSize="small" style={{textAlign: 'right'}}/>
                  Questions
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/signup" }}>
                  <LockOpenIcon fontSize="small" />
                  Signup
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/help" }}>
                  <ContactSupportIcon fontSize="small" />
                  Help
                </Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
