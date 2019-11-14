import React, { Component } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter, Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Loading from "../components/common/Loading";
import Topbar from "../components/Topbar";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";

const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    marginTop: "5em",
    padding: theme.spacing(3, 2),
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100vh"
  },
  questionList: {
    color: "red"
  }
});

class question extends Component {
  render() {
    //These props are passed via Component. Default props include history/path/
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    console.log(classes);
    console.log(this.props);

    const handleChange = event => {
      //Got name of radio button selected.
      //DO WORK TO FETCH QUESTIONS TAGGED WITH category
      const category = event.target.value;
      console.log(event.target.value);
    };

    return (
      <>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} md={3}>
              <Container>
                <Paper>
                  <Container>
                    <Box component="h4" textAlign="center">
                      Categories
                    </Box>
                    <RadioGroup
                      name="category"
                      aria-label="category"
                      onChange={handleChange}
                      column
                    >
                      {["JS", "HTML", "CSS", "REACT"].map(value => (
                        <FormControlLabel
                          key={value}
                          value={value.toString()}
                          control={<Radio />}
                          label={value.toString()}
                        />
                      ))}
                    </RadioGroup>
                  </Container>
                </Paper>
              </Container>
            </Grid>
            <Grid item xs={12} sm={9} md={9}>
              <Container>
                <Paper className={classes.questionList}>
                  <Container>
                    <Typography variant="h5" component="h3">
                      This is a sheet of paper.
                    </Typography>
                    <Typography component="p">
                      Paper can be used to build surface or other elements for
                      your application.
                    </Typography>
                  </Container>
                </Paper>
              </Container>
            </Grid>
          </Grid>
        </div>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(question));
