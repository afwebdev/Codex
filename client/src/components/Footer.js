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
    backgroundColor: "grey"
  },
  root: {
    flexGrow: 1,
    backgroundColor: "grey"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  logo: {
    height: 50
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
            <Paper className={classes.paper}>
              <a>
                <img className={classes.logo}src={logo}></img>
              </a>
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>
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
                                    // search: props.location.search
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
            </Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
        </Grid>
      </div>

      // <footer className="footer" style={{backgroundColor: "grey"}}>
      //   <div className="container footerBox">

      //   <a href="/"><img src={ logo } style={{ height: 50 }}></img></a>

      //   </div>
      // </footer>

      //   <BottomNavigation className={classes.bottomnavigation}>
      //     <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
      //     <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
      //     <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      //   </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
