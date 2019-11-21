import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Menu from "./Menu";
import API from "../utils/API";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as MaterialLink } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";

import HomeIcon from "@material-ui/icons/Home";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MoneyIcon from "@material-ui/icons/Money";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";

import logo from "../images/LogoMakr_5Jc4Ki.png";

const styles = theme => ({
  root: {
    width: 500
  },
  bottomnavigation: {
    position: "relative",
    backgroundColor: "red"
  },
  footer: {
    backgroundColor: "black"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "white",
    borderStyle: 'solid',
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
    height: 50
  },
  link: {
    textDecoration: "none",
    color: "grey"
  }
});
const useStyles = makeStyles(theme => ({}));

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs>
            {/* <Paper className={classes.paper}> */}
            <Link className={classes.link} to={{ pathname: "/" }}>
              <img className={classes.logo} src={logo}></img>
            </Link>
            {/* </Paper> */}
          </Grid>
          <Grid item xs={5}>
            {/* <Paper className={classes.paper}> */}
            <List>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/" }}>
                  <HomeIcon />
                  Home
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/dashboard" }}>
                  <DashboardIcon />
                  Dashboard
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/wizard" }}>
                  <MoneyIcon />
                  Wizard
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/Questions" }}>
                  <QuestionAnswerIcon />
                  Questions
                </Link>
              </ListItem>
            </List>
            {/* </Paper> */}
          </Grid>
          <Grid item xs>
            <List>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/signup" }}>
                  <LockOpenIcon />
                  Signup
                </Link>
              </ListItem>
              <ListItem>
                <Link className={classes.link} to={{ pathname: "/help" }}>
                  <ContactSupportIcon />
                  Help
                </Link>
              </ListItem>
            </List>
            {/* <Paper className={classes.paper}>xs</Paper> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
