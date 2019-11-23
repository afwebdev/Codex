import React, { Component, useContext, useState, useEffect } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
// import Button from "@material-ui/core/Button";
// import Avatar from "@material-ui/core/Avatar";
import Topbar from "../components/Topbar";
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
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
const backgroundShape = require("../images/Liquid-Cheese.svg");

const useStyles = makeStyles(theme => ({
  root: {
    color: "red",
    paddingTop: "50px",
    flexGrow: 1,
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    //backgroundPosition: "0 400px",
    paddingBottom: 200,
    height: "100vh"
  },
  question: {
    textAlign: "center",
    marginTop: "10px"
  },
  paper: {
    padding: theme.spacing(10),
    margin: "auto",
    maxWidth: 500
  }
}));

const Answer = props => {
  const classes = useStyles();
  const currentPath = props.location.pathname;
  const [answerstate, setanswerstate] = useState({
    questions: [],
    answers: [],
    reply: false
  });

  // Once you click reply, this function will run
  const reply = event => {
    console.log("REPLY IS CLICKED STILL");
    const replyId = event.target.id;
    setanswerstate(prevState => ({
      ...prevState,
      reply: replyId
    }));
  };

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
        setanswerstate(prevState => ({
          ...prevState,
          reply: false
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(res => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(res.data.answer_id[0].comment_id);
          setanswerstate({
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

  const [userStatus, setUserStatus] = useContext(LoginContext);
  const questionID = props.match.params.id;
  useEffect(() => {
    // Just accessing the id passed in order to query once component mounts
    // sets state to the question and answers for that question
    console.log(questionID);
    API.getQuestionAnswers(questionID).then(res => {
      console.log("THIS IS ON COMPONENT MOUNT");
      console.log(res.data.answer_id[0].comment_id);
      setanswerstate({
        questions: res.data.question_description,
        answers: res.data.answer_id
      });
      console.log(res.data);
    });
  }, []);

  // On click of the answer button, submit an answer.
  // This will update answer collection, as well as question collection
  const submitAnswer = () => {
    const answer = document.getElementById("answertext").value;
    console.log(userStatus.userId);
    const answerObj = {
      question_id: questionID,
      answer,
      user_id: userStatus.userId
    };
    console.log(answerObj);
    API.postAnswer(answerObj)
      .then(res => {
        setanswerstate(prevState => ({
          ...prevState,
          answers: res.data.answer_id
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(res => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(res.data.answer_id[0].comment_id);
          setanswerstate({
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
  let buttonId;

  return (
    <>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <Questionlist
            questionStyle={classes.question}
            question={answerstate.questions}
          />
        </Paper>
        <li>
          <div
            style={{
              overflow: "scroll",
              maxHeight: "500px",
              maxWidth: "500px"
            }}
          >
            {answerstate.answers.map(answer => {
              console.log(answer);
              buttonId = answer._id;
              // setting the ID of the reply box
              // This is for the conditional rendering of the reply box.
              if (answerstate.reply === answer._id) {
                replyHTML = <Reply id={buttonId} submitReply={submitReply} />;
              } else {
                replyHTML = <></>;
              }
              return (
                <>
                  <Answerlist id={answer._id} key={answer._id} reply={reply}>
                    {answer.answer}
                  </Answerlist>
                  {/* This is for collapsing the replies */}
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classes.heading}>
                        See All Replies
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        {answer.comment_id.map(comment => {
                          console.log(comment);
                          return <Replylist>{comment.comment}</Replylist>;
                        })}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  {replyHTML}
                </>
              );
            })}
          </div>
        </li>
        <AceEditor mode="javascript" />
        <textarea id="answertext" rows="4" cols="50"></textarea>
        <button onClick={submitAnswer}>Answer</button>
      </div>
    </>
  );
};

export default withRouter(withStyles(useStyles)(Answer));
