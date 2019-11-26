import React from "react";
// import withStyles from "@material-ui/styles/withStyles";
import { withRouter, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
// import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grow from "@material-ui/core/Grow";
// import Slide from '@material-ui/core/Slide';
import Topbar from "../components/Topbar";
import ScrollyScroll from "../components/ScrollyScroll";
import TestimonialAvatar from "../components/TestimonialAvatar";
import Footer from "../components/Footer";
import Quote from "../components/Quote";
import logo from "../images/pngLogo.png";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const backgroundShape = require("../images/tech-backgrounds-2.jpg");

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat center center fixed`,
    backgroundSize: "cover",
    // height: "100%",
    // width: "100",
    // backgroundPosition: "0 400px",
    paddingBottom: 200
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  container: {
    textAlign: "center",
    // backgroundColor: "transparent",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 4
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

  const cards = [
    {
      name: "Vladimir P.",
      quote:
        "To forgive the terrorists is up to God, but to send them to him is up to me.",
      stars: 4,
      url: "http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png"
    },
    {
      name: "Anonymous",
      quote: "I finessed my way into a dev role thanks to Codex",
      stars: 5,
      url: "https://www.nuclearinst.com/write/MediaUploads/avataaars.png"
    },
    {
      name: "Anonymous",
      quote: "Told me I cannot build my whole app using HTML... Liers",
      stars: 2,
      url: "https://goticradio.files.wordpress.com/2017/11/avataaars.png?w=264"
    }
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Topbar />
      <Grow in={true}>
        <div className={classes.root}>
          <main>
            <div className={classes.headerContent}>
              <Container className={classes.container} maxWidth="sm">
                <img
                  className={classes.logo}
                  src={logo}
                  alt="you-had-one-job"
                ></img>
                <Typography
                  variant="h5"
                  align="center"
                  color="textSecondary"
                  paragraph
                >
                  We strive to cultivate an environment that empower developers
                  and connect them to solutions that enable productivity,
                  growth, and discovery.
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={getStarted}
                      >
                        Getting Started
                      </Button>
                    </Grid>
                    <Grid item>
                      <ScrollyScroll>
                        <Button variant="outlined" color="primary">
                          See Reviews
                        </Button>
                      </ScrollyScroll>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            <Container
              className={classes.cardGrid}
              maxWidth="md"
              id="to-the-reviews"
            >
              <Grid container spacing={4}>
                {cards.map((card, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia>
                        <TestimonialAvatar url={card.url} />
                      </CardMedia>
                      <CardContent className={classes.cardContent}>
                        <Box display="flex" flexDirection="row">
                          <Box p={1} flexGrow={1}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {card.name}
                            </Typography>
                          </Box>
                          <Box p={1}>
                            <Rating
                              name="read-only"
                              value={card.stars}
                              readOnly
                            />
                          </Box>
                        </Box>
                        <Quote quote={card.quote} />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </main>
        </div>
      </Grow>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(Main);
