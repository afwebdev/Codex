import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Topbar from "../components/Topbar";
import Ufo from "../images/ufo.png";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    margin: "auto",
    maxWidth: 750,
    textAlign: "center"
  }
}));

export default function NoMatch() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Topbar />
      <div className={classes.root} style={{ marginTop: "5vh" }}>
        <Typography variant="h5" component="h3">
          404 Page Not Found
          <img src={Ufo}></img>
          <Link to={{ pathname: "/" }}>
            <button
              style={{
                // border: "dashed",
                backgroundColor: "inherit",
                cursor: "pointer",
                padding: "14px 28px"
              }}
            >
              Take Me To Safety
            </button>
          </Link>
        </Typography>
      </div>
      <Footer />
    </React.Fragment>
  );
}
