import React from "react";
// import withStyles from "@material-ui/styles/withStyles";
import { withRouter, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
// import Slide from '@material-ui/core/Slide';
import Topbar from "../components/Topbar";
// import ScrollyScroll from "../components/ScrollyScroll";
// import TestimonialAvatar from "../components/TestimonialAvatar";
import Footer from "../components/Footer";
// import Quote from "../components/Quote";
// import logo from "../images/pngLogo.png";
// import Box from "@material-ui/core/Box";
// import Rating from "@material-ui/lab/Rating";
import PayPalButton from "../components/PayPal";

const backgroundShape = require("../images/Liquid-Cheese.svg");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat center center fixed`,
    backgroundSize: "cover",
    // height: "100%",
    // width: "100%",
    // backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  container: {
    textAlign: "center",
    backgroundColor: "transparent"
  },
  headerContent: {
    height: "78vh",
    marginTop: "15vh",
    backgroundColor: "transparent",
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
}));

function Main(props) {
  let history = useHistory();

  // const [animateIn, setAnimateIn] = useState(false);

  const classes = useStyles();

  const getStarted = () => {
    if (localStorage.getItem("loggedIn") === "false") {
      return history.push("/signup");
    }
    return history.push("/dashboard");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar />
      <Grow in={true}>
        <div className={classes.root}>
          <main>
            <div className={classes.headerContent}>
              <Container className={classes.container} maxWidth="md">
                <PayPalButton></PayPalButton>
              </Container>
            </div>
            <Container
              className={classes.cardGrid}
              maxWidth="md"
              id="to-the-reviews"
            ></Container>
          </main>
          <div></div>
        </div>
      </Grow>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(Main);
