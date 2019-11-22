import React, { useState } from "react";
// import withStyles from "@material-ui/styles/withStyles";
import { withRouter, useHistory } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";
import Grow from '@material-ui/core/Grow';
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import logo from "../images/pngLogo.png";
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

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
    marginRight: theme.spacing(2),
  },
  container: {
    textAlign: "center",
    backgroundColor: "transparent"
  },
  headerContent: {
    height: "78vh",
    marginTop: "15vh",
    backgroundColor: "transparent",
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));  

function Main(props) {
  let history = useHistory();

  const [animateIn, setAnimateIn] = useState(true);
  
  const classes = useStyles();

  const getStarted = () => {
    if (localStorage.getItem("loggedIn") === "false") {
      return history.push("/signup")
    }
    return history.push("/dashboard")
  }

  const cards = [1, 2, 3]

  return (   

    <React.Fragment>
      <CssBaseline />
      <Topbar />
      <Grow in={animateIn}>
        <div className={classes.root}>
          <main>
          <div className={classes.headerContent}>
            <Container className={classes.container} maxWidth="sm">
                <img className={classes.logo} src={logo}></img>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We strive to cultivate an environment that empower developers and connect 
              them to solutions that enable productivity, growth, and discovery.
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={getStarted}>
                      Get Started
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary">
                      See Reviews
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Box display="flex" flexDirection="row">
                        <Typography gutterBottom variant="h5" component="h2">
                          Heading
                        </Typography>
                        <Rating name="size-small" value={2.5} precision={0.5} />
                      </Box>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
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
