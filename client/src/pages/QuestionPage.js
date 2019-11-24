import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import withStyles from "@material-ui/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";
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
import Footer from "../components/Footer";
import NewQuestion from "../components/Modal/NewQuestion";
import Slide from "@material-ui/core/Slide";
import Skeleton from "@material-ui/lab/Skeleton";

const backgroundShape = require("../images/Liquid-Cheese.svg");

const styles = theme => ({
  avatar: {
    fontSize: "14px",
    fontWeight: "bold"
  },
  button: {
    margin: theme.spacing(1)
  }
});

const useStyles = makeStyles(theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  root: {
    marginTop: "2em",
    padding: theme.spacing(3, 2),
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100%"
  },

  rangeLabel: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2)
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  actionButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1),
    width: 152
  },
  blockCenter: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  block: {
    padding: theme.spacing(2)
  },

  inlining: {
    display: "inline-block",
    marginRight: 10
  },
  buttonBar: {
    display: "flex"
  },
  alignRight: {
    display: "flex",
    justifyContent: "flex-end"
  },
  noBorder: {
    borderBottomStyle: "hidden"
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    height: 65
  },

  nameBox: {
    marginTop: "1em"
  },
  avatar: {
    height: 100,
    width: 100
  },
  content: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center"
  },
  paperProfile: {
    textAlign: "center",
    padding: theme.spacing(3),
    color: theme.palette.text.secondary
  },
  listQA: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
}));

function Question(props) {
  const classes = useStyles();
  const currentPath = props.location.pathname;

  const [newQuestionDialog, setNewQuestionDialog] = useState(false);

  const [questionList, setQuestionList] = useState({ questionList: [] });

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });

  //On Component Mount, build out an answer array in state.
  useEffect(() => {
    API.getQuestions(null).then(res => {
      setQuestionList(() => ({
        questionList: res.data
      }));
    });
  }, []);

  //Set the initial view,

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
      setQuestionList(() => ({
        questionList: res.data
      }));
    });
  };

  const handleClickOpen = () => {
    setNewQuestionDialog(true);
  };

  const handleClickClose = () => {
    setNewQuestionDialog(false);
  };

  return (
    <>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        <NewQuestion
          open={newQuestionDialog}
          handleClickOpen={handleClickOpen}
          handleClickClose={handleClickClose}
          Transition={Transition}
        />
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
                  <Container>
                    <Box component="h4" textAlign="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={handleClickOpen}
                      >
                        New Question
                      </Button>
                    </Box>
                  </Container>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={8} md={8}>
              <Container>
                {questionList.questionList != "" ? (
                  <QuestionItems questions={questionList} />
                ) : (
                  <React.Fragment>
                    <Skeleton
                      height={200}
                      variant="rect"
                      style={{ marginTop: "1em" }}
                      width="100%"
                    />
                  </React.Fragment>
                )}
                {/* <QuestionItems questions={questionList} /> */}
              </Container>
            </Grid>
          </Grid>
        </Container>
        {/* ^Top most grid */}
      </div>
      <Footer />
    </>
  );
}

export default withRouter(withStyles(styles)(Question));
