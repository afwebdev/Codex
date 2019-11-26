import React, { useContext, useState, useEffect } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
// import Container from "@material-ui/core/Container";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Box from "@material-ui/core/Box";
import API from "../utils/API";
// import ToolTip from "@material-ui/core/Tooltip";
import {
  Questionlist,
  Answerlist,
  Replylist
} from "../components/QuestionAnswerList";
import { LoginContext } from "./../components/LoginContext";
// import Footer from "../components/Footer";
import { Reply } from "../components/Reply";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
const backgroundShape = require("../images/Liquid-Cheese.svg");

const useStyles = makeStyles(theme => ({
  grid: {
    alignItems: "center",
    marginTop: "15px"
  },
  answerBox: {
    width: "500px",
    marginTop: "10px",
    background: "white"
  },
  replies: {
    opacity: 0.5
  },
  submitButton: {
    marginTop: "5px"
  },
  root: {
    color: "green",
    paddingTop: "5px",
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    //backgroundPosition: "0 400px",
    paddingBottom: 200
    //height: "100vh"
  },
  question: {
    textAlign: "center",
    marginTop: "2px",
    margin: "auto"
  },
  paper: {
    padding: theme.spacing(5),
    padding: "1em"
  },
  topGrid: {
    marginTop: "2em"
  }
}));

const Answer = props => {
  const classes = useStyles();
  const currentPath = props.location.pathname;

  const [userStatus, setUserStatus] = useContext(LoginContext);
  const questionID = props.match.params.id;
  const [answerState, setAnswerState] = useState({
    commentsToRender: 3,
    question: { title: "", description: "", code: "", dex: 0, category: "" },
    answers: [],
    reply: false,
    showReply: false
  });

  // Handles change of Answer box/Text edititor and updates state accordingly
  const handleInputchangeCode = newValue => {
    console.log(newValue);
    setAnswerState(prevState => ({
      ...prevState,
      question: { ...prevState.question, code: newValue }
    }));
  };

  // Once you click reply, this function will run
  const reply = event => {
    console.log("REPLY IS CLICKED STILL");
    const replyId = event.target.id;
    if (answerState.reply === replyId) {
      setAnswerState(prevState => ({
        ...prevState,
        reply: false
      }));
    } else {
      setAnswerState(prevState => ({
        ...prevState,
        reply: replyId
      }));
    }
  };

  // Once you click show more replies, this function will run
  const showmorereply = event => {
    const replyId = event.target.id;
    if (answerState.showReply === replyId) {
      setAnswerState(prevState => ({
        ...prevState,
        showReply: false
      }));
    } else {
      setAnswerState(prevState => ({
        ...prevState,
        showReply: replyId,
        commentsToRender: 3
      }));
    }
  };

  // Once you click show more comments, this will show two more comments.
  const showComments = () => {
    setAnswerState(prevState => ({
      ...prevState,
      commentsToRender: answerState.commentsToRender + 2
    }));
  };

  // SUBMIT REPLY
  // API call to post a reply to an answer
  const submitReply = event => {
    const answer_id = event.target.id;
    console.log(answer_id);
    const reply = document.getElementById(answer_id + 1).value;
    console.log(reply);
    const comment = {
      answer_id,
      comment: reply,
      rejection_reason: null,
      user_id: userStatus.userId
    };
    API.postReply(comment)
      .then(res => {
        setAnswerState(prevState => ({
          ...prevState,
          reply: false
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(res => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(res.data.answer_id[0].comment_id);

          setAnswerState(prevState => ({
            ...prevState,
            question: {
              ...prevState.question,
              description: res.data.question_description
            },
            answers: res.data.answer_id
          }));

          console.log(res.data);
        });
        console.log("Posted the reply");
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Just accessing the id passed in order to query once component mounts
    // sets state to the question and answers for that question
    console.log(questionID);
    API.getQuestionAnswers(questionID).then(res => {
      // console.log(res);
      console.log("THIS IS ON COMPONENT MOUNT");
      // console.log(res.data.answer_id[0].comment_id);
      setAnswerState(prevState => ({
        ...prevState,
        question: {
          title: res.data.question_title,
          description: res.data.question_description,
          code: res.data.question_code,
          dex: 0,
          category: res.data.category
        },
        answers: res.data.answer_id,
        commentsToRender: 3
      }));

      console.log(res.data);
    });
  }, []);

  //SUBMIT ANSWER
  // On click of the answer button, submit an answer. This is only for text box
  // This will update answer collection, as well as question collection
  const submitAnswer = () => {
    const answer = document.getElementById("outlined-basic").value;
    console.log(userStatus.userId);
    const answerObj = {
      question_id: questionID,
      answer,
      user_id: userStatus.userId
    };
    console.log(answerObj);
    API.postAnswer(answerObj)
      .then(res => {
        setAnswerState(prevState => ({
          ...prevState,
          answers: res.data.answer_id
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(res => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(res.data.answer_id[0].comment_id);
          setAnswerState({
            questions: res.data.question_description,
            answers: res.data.answer_id,
            commentsToRender: 3
          });
          console.log(res.data);
        });
        console.log("Posted the reply");
      })
      .catch(err => {
        console.log(err);
      });
  };

  //ACE EDITOR
  // This for the the Ace editor. Takes the code and submits it as an answer
  const submitAnswerCode = () => {
    const answer = answerState.codeText;
    console.log(userStatus.userId);
    const answerObj = {
      question_id: questionID,
      answer,
      user_id: userStatus.userId
    };
    console.log(answerObj);
    API.postAnswer(answerObj)
      .then(res => {
        setAnswerState(prevState => ({
          ...prevState,
          answers: res.data.answer_id
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(res => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(res.data.answer_id[0].comment_id);
          setAnswerState({
            questions: res.data.question_description,
            answers: res.data.answer_id
          });
          console.log(res.data);
        });
        console.log("Posted the reply");
      })
      .catch(err => {
        console.log(err);
      });
  };

  let replyHTML;
  let showReplyHTML;
  let buttonId;

  // RENDER THE JSX
  return (
    <>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        {/* Beginning of Answer Page Grid */}
        <Grid direction="column" justify="center" className={classes.topGrid}>
          {/* Beginnning Of Top Section */}
          <Grid item xs={12} md={6} style={{ margin: "0 auto" }}>
            <Paper style={{ textAlign: "center" }} className={classes.paper}>
              <Typography variant="h4">{answerState.question.title}</Typography>
            </Paper>
          </Grid>
          {/* End of question */}
          <Grid item xs={12} sm={12} md={12} className={classes.grid}>
            <div
              style={{
                padding: "1em",
                overflowX: "auto",
                maxHeight: "500px",
                maxWidth: "500px",
                backgroundColor: "#efefef"
              }}
            >
              {answerState.answers.map(answer => {
                console.log(answer);
                buttonId = answer._id;
                // setting the ID of the reply box
                // This is for the conditional rendering of the reply box.
                if (answerState.reply === answer._id) {
                  replyHTML = <Reply id={buttonId} submitReply={submitReply} />;
                } else {
                  replyHTML = <></>;
                }
                // Setting up additional replies
                if (answerState.showReply === answer._id) {
                  showReplyHTML = (
                    <>
                      {/* This is for collapsing the replies */}
                      <ExpansionPanel>
                        <ExpansionPanelDetails>
                          <Typography>
                            {answer.comment_id
                              .slice(0, answerState.commentsToRender)
                              .map(comment => {
                                console.log(comment);
                                return <Replylist>{comment.comment}</Replylist>;
                              })}
                          </Typography>
                          <h5 onClick={showComments}>show more</h5>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </>
                  );
                } else {
                  showReplyHTML = <></>;
                }
                return (
                  <>
                    <Answerlist
                      id={answer._id}
                      key={answer._id}
                      reply={reply}
                      showmorereply={showmorereply}
                    >
                      {answer.answer}
                    </Answerlist>
                    {showReplyHTML}
                    {replyHTML}
                  </>
                );
              })}
            </div>

            <TextField
              className={classes.answerBox}
              id="outlined-basic"
              label="Submit an Answer Here"
              variant="outlined"
            />
            <Button
              className={classes.submitButton}
              onClick={submitAnswer}
              variant="contained"
              color="primary"
            >
              Submit Answer
            </Button>
          </Grid>
          {/* Ending of Reply Box */}

          {/* Begining of the code editor */}
          <Grid item xs={12} sm={12} md={3} className={classes.grid}>
            <AceEditor
              onChange={handleInputchangeCode}
              value={answerState.codeText}
              mode="javascript"
            />
            <Button
              className={classes.submitButton}
              onClick={submitAnswerCode}
              variant="contained"
              color="primary"
            >
              Submit Code
            </Button>
          </Grid>
          {/* End of code editor */}
          {/* </Grid> */}
        </Grid>
        {/* End of TOP LEVEL GRID (Parent of all) */}
      </div>
      <Footer />
    </>
  );
};

export default withRouter(withStyles(useStyles)(Answer));