import React, { useEffect, Component, useContext } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loading from "../components/common/Loading";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import API from "../utils/API";
import { LoginContext } from "../components/LoginContext";
import currentLoginStatus from "../utils/currentLoginStatus";
import Topbar from "../components/Topbar";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    minHeight: "50em"
  },
  profilePanel: {
    minHeight: "10em"
  },
  topGrid: {
    margin: "3em"
  },
  avatarImg: {
    // margin: "auto"
  }
});

// const value = useContext(LoginContext);
// console.log(value.email);

// console.log(userStatus.loggedIn);
// setUserStatus(prevState => ({
//   ...prevState,
//   loggedIn: true
// }));
// console.log(userStatus.loggedIn);

const Dashboard = props => {
  const { classes } = props;
  const currentPath = props.location.pathname;
  //Obtaining state.
  // const [userStatus, setUserStatus] = useContext(LoginContext);
  // console.log(userStatus);

  return (
    <ReactCSSTransitionGroup>
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          {/* v Top Parent Grid */}
          <Grid className={classes.topGrid} container spacing={1}>
            {/* Sidebar Profile */}
            <Paper className={classes.paper}>
              <Container>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={12}></Grid>
                </Grid>
              </Container>
            </Paper>

            {/* v Top Most Grid End */}
          </Grid>
        </div>
      </React.Fragment>
    </ReactCSSTransitionGroup>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
