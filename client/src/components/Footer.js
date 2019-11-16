import React, { Component } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Link, withRouter } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";

//const logo = require("../../public/image/LogoMakr_5Jc4Ki.png");

const styles = theme => ({
  root: {
    width: 500
  }, 
  bottomnavigation: {
      position: "relative",
      backgroundColor: "red"
  }

  
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <BottomNavigation className={classes.bottomnavigation}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    );
  }
}

export default withRouter(withStyles(styles)(Footer));
