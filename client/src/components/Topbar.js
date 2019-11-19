import React, { useState, useEffect, useContext, Component } from "react";

import withStyles from "@material-ui/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Link as MaterialLink } from "@material-ui/core";
import SignUpIn from "./SignUpIn";
import Menu from "./Menu";
import { LoginContext } from "../components/LoginContext";
import currentLoginStatus from "../utils/currentLoginStatus";
import API from "../utils/API";

const logo = require("../images/logo.svg");

const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    display: "inline-block",
    marginLeft: 10,
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
});

const Topbar = props => {

  //Global Context
  const [userStatus, setUserStatus] = useContext(LoginContext);
  console.log(userStatus);
  const { classes } = props;
  const currentPath = props.location.pathname;

  const [state, setState] = useState({
    value: 0,
    menuDrawer: false
  });

  useEffect(() => {
    // console.log(userStatus)
    currentLoginStatus
      .checkStatus()
      .then(res => {
        //User is logged in, re-store global state vars
        setUserStatus(res.data);
      })
      .catch(err => {
        //User is not logged in.
        console.error(err);
      });
  }, []);

  const handleChange = (event, value) => {
    setState({ value });
  };

  const mobileMenuOpen = event => {
    setState({ menuDrawer: true });
  };

  const mobileMenuClose = event => {
    setState({ menuDrawer: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const current = () => {
    if (props.currentPath === "/home") {
      return 0;
    }
    if (props.currentPath === "/dashboard") {
      return 1;
    }
    if (props.currentPath === "/signup") {
      return 2;
    }
    if (props.currentPath === "/signin") {
      return 3;
    }
    if (props.currentPath === "/wizard") {
      return 4;
    }
    if (props.currentPath === "/Questions") {
      return 5;
    }
  };

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={10} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <img width={20} src={logo} alt="" />
                  <span className={classes.tagline}>Codex</span>
                </Link>
              </Typography>
            </div>
            {!props.noTabs && (
              <React.Fragment>
                <div className={classes.productLogo}></div>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={mobileMenuOpen}
                    className={classes.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer
                    anchor="right"
                    open={state.menuDrawer}
                    onClose={mobileMenuClose}
                    onOpen={mobileMenuOpen}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, index) => {
                        let action = null;
                        if (item.label === "logout") {
                          action = () => {
                            API.signOut();
                          };
                        }
                        return (
                          <ListItem
                            component={item.external ? MaterialLink : Link}
                            href={item.external ? item.pathname : null}
                            to={
                              item.external
                                ? null
                                : {
                                    pathname: item.pathname,
                                    search: props.location.search
                                  }
                            }
                            button
                            key={item.label}
                          >
                            <ListItemText primary={item.label} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current() || state.value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {Menu.map((item, index) => {
                      let action = null;
                      if (item.label === "logout") {
                        action = () => {
                          API.signOut();
                        };
                      }

                      return (
                        <Tab
                          onClick={action}
                          key={index}
                          component={item.external ? MaterialLink : Link}
                          href={item.external ? item.pathname : null}
                          to={
                            item.external
                              ? null
                              : {
                                  pathname: item.pathname,
                                  search: props.location.search
                                }
                          }
                          classes={{ root: classes.tabItem }}
                          label={item.label}
                        />
                      );
                    })}
                  </Tabs>
                </div>
              </React.Fragment>
            )}
            <SignUpIn style={{marginRight: "50px"}} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(withStyles(styles)(Topbar));
