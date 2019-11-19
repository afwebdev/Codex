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

const backgroundShape = require("../images/Liquid-Cheese.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  profilePanel: {
    minHeight: "10em"
  },
  topGrid: {
    margin: "3em"
  },
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  nameBox: {
    marginTop: "1em"
  },
  avatar: {
    height: 100,
    width: 100
  }
});

//  const value = useContext(LoginContext);
//  console.log(value.email);

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
  const [userStatus, setUserStatus] = useContext(LoginContext);
  // console.log(userStatus);

  const { email, firstName, lastName } = userStatus;

  useEffect(() => {});

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root} style={{ marginBottom: 50 }}>
        {/* v Top Parent Grid */}
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          {/* Sidebar Profile */}

          <Grid
            spacing={4}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <Grid item xs={12} md={4}>
              <Paper justify="center" className={classes.paper}>
                <Grid container justify="center">
                  <Avatar className={classes.avatar}>
                    {(() =>
                      `${userStatus.user_firstName[0]}${userStatus.user_lastName[0]}`.toUpperCase())()}
                  </Avatar>
                </Grid>
                <Box className={classes.nameBox}>
                  Hello,
                  {`${userStatus.user_firstName}`.charAt(0).toUpperCase()}
                </Box>
              </Paper>
            </Grid>
          </Grid>

          {/* v Top Most Grid End */}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
