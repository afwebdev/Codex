import React, { Component, useContext } from "react";
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

import Topbar from "../components/Topbar";

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

const Dashboard = props => {
  const { classes } = props;
  const currentPath = props.location.pathname;
  const [userStatus, setUserStatus] = useContext(LoginContext);
  // console.log(userStatus.loggedIn);
  // setUserStatus(prevState => ({
  //   ...prevState,
  //   loggedIn: true
  // }));
  // console.log(userStatus.loggedIn);
  console.log(userStatus);

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        {/* v Top Parent Grid */}
        <Grid className={classes.topGrid} container spacing={1}>
          {/* Sidebar Profile */}
          <Paper className={classes.paper}>
            <Container>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar className={classes.avatarImg}>AF</Avatar>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1">
                        Standard license
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Full resolution 1920x1080 • JPEG
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" style={{ cursor: "pointer" }}>
                        Remove
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">$19.00</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Paper>

          {/* v Top Most Grid End */}
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withRouter(withStyles(styles)(Dashboard));
