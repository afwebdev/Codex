import React, { useEffect, Component, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
// import Loading from "../components/common/Loading";
// import Box from "@material-ui/core/Box";
// import Container from "@material-ui/core/Container";
import API from "../utils/API";
// import { LoginContext } from "../components/LoginContext";
// import currentLoginStatus from "../utils/currentLoginStatus";
import Topbar from "../components/Topbar";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
// import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import Footer from "../components/Footer";
import ListData from "../components/ListData/ListData";

const backgroundShape = require("../images/Liquid-Cheese.svg");

//retrieve and store user info
const storage = localStorage.getItem("user");
const user = JSON.parse(storage);

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  }
});

const useStyles = makeStyles(theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },

  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },

  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    height: 65
  },

  nameBox: {
    marginTop: "1em"
  },
  avatar: {
    height: 100,
    width: 100
  },
  content: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center"
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paperProfile: {
    textAlign: "center",
    padding: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  listQA: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

//MAIN Component.
function Dashboard(props) {
  const classes = useStyles();
  const currentPath = props.location.pathname;

  //Dashboard Return Component.
  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        {/* Top Level Grid */}
        <Grid container justify="center">
          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            {/* Profile Grid Item Start */}
            <Grid item xs={12} md={4}>
              <Paper className={classes.paperProfile}>
                <div className={classes.box}>
                  <Avatar className={classes.avatar}>
                    {(() =>
                      `${user.user_firstName[0]}${user.user_lastName[0]}`.toUpperCase())()}
                  </Avatar>
                  <Typography variant="body2" gutterBottom>
                    Hello,
                    <br />
                    {`${user.user_firstName}`.charAt(0).toUpperCase() +
                      `${user.user_firstName}`.slice(
                        1,
                        user.user_firstName.length
                      )}
                  </Typography>
                  <Typography variant="body2">Dex: 00</Typography>
                </div>
                <div
                  style={{
                    marginTop: "5em",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionButtom}
                  >
                    My Questions
                  </Button>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionButtom}
                  >
                    My Answers
                  </Button>
                </div>
              </Paper>
            </Grid>
            {/* Parent Profile Item End */}

            <Grid container item xs={12}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <div>
                    <div className={classes.content}>
                      <ListData user={user} />
                    </div>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/*Top Level Grid End*/}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(Dashboard));
