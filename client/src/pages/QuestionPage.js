import React, { Component} from "react";
import {BrowserRouter as Router,Link,Route} from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Topbar from "../components/Topbar";
import Container from "@material-ui/core/Container";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import API from "../utils/API";
import ToolTip from "@material-ui/core/Tooltip";
import QuestionItems from "../components/QuestionListItem";
const backgroundShape = require("../images/shape.svg");

const styles = theme => ({
  root: {
    marginTop: "2em",
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
    // color: "red"
  },
  avatar: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  button: {
    margin: theme.spacing(1)
  }
});

class question extends Component {
  state = {
    questionList: []
  };

  //Set the initial view,
  componentDidMount() {
    API.getQuestions(null).then(res => {
      this.setState({
        questionList: res.data
      });
    });
  }

  render() {
    //These props are passed via PageRoutes(?). Default props include
    //window history/path/location/etc
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;
    console.log(this.props);

    //Change handler of radio buttons.
    const handleChange = event => {
      const category = event.target.value;
      //Got name of radio button selected.
      //DO WORK TO FETCH QUESTIONS TAGGED WITH category
      console.log(category);
      //Starting here, category is successfully pulled from radio button, above consolelog confirms..
      //Make a call to the API to get question, passing JSON of: example: {category: "JS"}
      API.getQuestions(category).then(res => {
        console.log("Question Page-> res", res.data);
        this.setState({
          questionList: res.data
        });
      });
    };

    return (
      <>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          {/*v Top most grid */}
          <Container>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={3}>
                <Grid container direction="column" spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <Paper>
                      <Container>
                        <Box component="h4" textAlign="center">
                          Categories
                        </Box>
                        <RadioGroup
                          name="category"
                          aria-label="category"
                          onChange={handleChange}
                          column="true"
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
                  </Grid>
                  <Grid item xs={6} sm={6} md={12}>
                    <Paper>
                      <Container>
                        {" "}
                        <Box component="h4" textAlign="center">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                          >
                            New Question
                          </Button>
                        </Box>
                      </Container>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={8} md={8}>
                <Container>
                  <QuestionItems questions={this.state.questionList} />
                </Container>
              </Grid>
            </Grid>
          </Container>
          {/* ^Top most grid */}
        </div>
      </>
    );
  }
}

export default withRouter(withStyles(styles)(question));
