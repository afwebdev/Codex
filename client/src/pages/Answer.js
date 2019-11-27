import React, { useContext, useState, useEffect } from "react";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Collapse from "@material-ui/core/Collapse";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import MDE from "../components/MDE/mde";
import SendIcon from "@material-ui/icons/Send";

import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomdarkreason from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark-reasonable";
import Container from "@material-ui/core/Container";
import API from "../utils/API";
import {
  Questionlist,
  Answerlist,
  Replylist
} from "../components/QuestionAnswerList";
import { LoginContext } from "./../components/LoginContext";
import { Reply } from "../components/Reply";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import { display } from "@material-ui/system";
import ReplyBox from "../components/ReplyBox";
const backgroundShape = require("../images/Liquid-Cheese.svg");

const useStyles = makeStyles(theme => ({
  grid: {
    // alignItems: "center",
    marginTop: "15px"
  },
  answerBox: {
    width: "500px",
    marginTop: "10px",
    background: "white"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  replies: {
    opacity: 0.5
  },
  submitButton: {
    marginTop: "5px"
  },
  root: {
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
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  topGrid: {
    marginTop: "2em"
  }
}));

const Answer = props => {
  const classes = useStyles();
  const currentPath = props.location.pathname;
  const questionID = props.match.params.id;
  const currentUserId = JSON.parse(localStorage.getItem("user"))._id;
  let devID = "";

  const [userStatus, setUserStatus] = useContext(LoginContext);
  //States for reply box toggle.
  const [openReply, setOpenReply] = React.useState(false);

  const [newAnswer, setNewAnswer] = React.useState("");

  const [answerState, setAnswerState] = useState({
    commentsToRender: 3,
    question: { title: "", description: "", code: "", dex: 0, category: "" },
    answers: [],
    reply: false,
    showReply: false,
    open: false,
    isAnswerApproved: false,
    hasAccess: false,
  });

  const handleExpandClick = () => {
    setOpenReply(!openReply);
  };

  const codeChangeHandler = e => {
    console.log(e);
    setNewAnswer(e);
  };

  
  // method gets run when user pressed approve/reject on answer page
  const decesionPoint = () => {
    console.log("Decesion is being made");
    if (answerState.currentUserId === answerState.userQuestionId) {
      setAnswerState(prevState => ({
        ...prevState,
        open: true
      }));
    } else {
      setAnswerState(prevState => ({
        ...prevState,
        hasAccess: true
      }));
      
    }
  };

  // Final Answer, when user is prompted are you sure?
  const finalAnswer = () => {
    devID = answerState.answers[0].user_id
    const question = {
       id: questionID,
       dex: answerState.question.dex,
       devID: devID,
       userID: answerState.userQuestionId
     }
     API.flipAnswerFlag(question).then(res =>{
      API.addDex(question).then(res=>{
        API.subtractDex(question).then(res=>{
          console.log('DONE WITH THE ADDING DEX GGGG')
          setAnswerState(prevState => ({
            ...prevState,
            isAnswerApproved: true,
            open:false
          }));
        })
      })
    })
  }

  // Used in the modal. This will open/close the modal
  const handleClose = () => {
    setAnswerState(prevState => ({
      ...prevState,
      open: false
    }));
  };

  // Used in the no access modal. This will open/close the modal
  const noAccess = () => {
    setAnswerState(prevState => ({
      ...prevState,
      hasAccess: false
    }));
  };

  useEffect(() => {
    // Just accessing the id passed in order to query once component mounts
    // sets state to the question and answers for that question
    console.log(questionID);
    API.getQuestionAnswers(questionID).then(res => {
      const isAnswerApproved = res.data.is_answer_approved;
      console.log(res);
      console.log("THIS IS ON COMPONENT MOUNT");
      console.log(res);
      // console.log(res.data.answer_id[0].comment_id);
      setAnswerState(prevState => ({
        ...prevState,
        question: {
          title: res.data.question_title,
          description: res.data.question_description,
          code: res.data.question_code,
          //dex: 0,
          dex: res.data.dex,
          category: res.data.category
        },
        answers: res.data.answer_id,
        commentsToRender: 3,
        isAnswerApproved,
        userQuestionId: res.data.user_id.id,
        currentUserId
      }));

      console.log(res.data);
    });
  }, [openReply]);

  //SUBMIT ANSWER
  // On click of the answer button, submit an answer. This is only for text box
  // This will update answer collection, as well as question collection
  const submitAnswer = () => {
    // console.log(userStatus);
    const answerObj = {
      question_id: questionID,
      answer: newAnswer,
      user_id: userStatus.user._id
    };
    // console.log(answerObj);
    API.postAnswer(answerObj)
      .then(postRes => {
        console.log(postRes);
        setAnswerState(prevState => ({
          ...prevState,
          answers: postRes.data.answer_id
        }));
        // This will allow you to get the refreshed comments, while updating state as well.
        API.getQuestionAnswers(questionID).then(questionRes => {
          console.log("THIS IS ON COMPONENT MOUNT");
          console.log(questionRes.data.answer_id[0].comment_id);

          setAnswerState(prevState => ({
            ...prevState,
            question: {
              ...prevState.question,
              description: questionRes.data.question_description
            },
            answers: questionRes.data.answer_id,
            commentsToRender: 3
          }));
          console.log(questionRes.data);
        });
        console.log("Posted the reply");
      })
      .catch(err => {
        console.log(err);
      });
  };

  let notSecuredModal;

  // RENDER THE MAIN COMPONENT JSX.
  //EVVERYTHING IS IN HERE.
  if(answerState.hasAccess){
    notSecuredModal = (
    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={answerState.hasAccess}
    onClose={noAccess}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500
    }}
  >
    <Fade in={answerState.hasAccess}>
      <div className={classes.paper}>
        <h2 id="transition-modal-title">FORBIDDEN</h2>
        <p id="transition-modal-description">
          You do not have access to submit a decesion for this question
        </p>
      </div>
    </Fade>
  </Modal>
    )
  }
  else{
    notSecuredModal = <></>
  }
  return (
    <>
      <CssBaseline />
      <Topbar currentPath={currentPath} />
      <div className={classes.root}>
        {/* Beginning of Answer Page Grid */}
        {/* <Paper> */}
        <Grid container direction="column" className={classes.topGrid}>
          {/* Beginnning Of Top Section */}
          <Grid item xs={12} md={6} style={{ margin: "0 auto" }}>
            <Paper
              style={{
                textAlign: "center"
              }}
              className={classes.paper}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column"
                }}
              >
                <Typography variant="h5">
                  {answerState.question.title}
                </Typography>
              </div>
            </Paper>
          </Grid>
          {/* End of Top Title/desc Section */}

          {/* Start of question info section */}
          <Grid style={{ margin: "0 auto" }} item xs={12} sm={10}>
            <Grid justify="center" container direction="column">
              <Paper style={{ marginTop: "2em", width: "100%" }}>
                <Container
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2em",
                    justifyContent: "center"
                  }}
                >
                  <Grid item xs={12}>
                    <Typography
                      variant="p"
                      style={{ margin: "0 auto", fontSize: "16px" }}
                    >
                      {answerState.question.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <div style={{ width: "auto" }}>
                      <SyntaxHighlighter
                        language="javascript"
                        style={atomdarkreason}
                      >
                        {answerState.question.code}
                      </SyntaxHighlighter>
                    </div>
                  </Grid>
                </Container>
              </Paper>
            </Grid>
          </Grid>

          {/* User answers section */}
          <Grid
            direction="column"
            container
            spacing={2}
            className={classes.grid}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1em",
                overflowX: "auto",
                // maxHeight: "500px",
                minWidth: "100%",
                backgroundColor: "#fff"
              }}
            >
              <Grid item xs={12} sm={12}>
                <IconButton
                  onClick={handleExpandClick}
                  aria-expanded={openReply}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                  New Answer
                </IconButton>
                <Collapse in={openReply} timeout="auto" unmountOnExit>
                  {/* STUFF HERE EDITOR */}
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      onClick={submitAnswer}
                      color="primary"
                      variant="contained"
                      style={{ margin: "2em" }}
                      disabled= {answerState.isAnswerApproved}
                    >
                      <SendIcon />
                      Submit
                    </Button>
                  </div>
                  <MDE change={codeChangeHandler} value={newAnswer} />
                </Collapse>
              </Grid>
              <Grid item xs={12} sm={12}>
                <>
                  <Answerlist answers={answerState.answers} />
                </>
              </Grid>
            </div>
          </Grid>
        </Grid>
          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={answerState.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={answerState.open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">ARE YOU SURE?</h2>
              <p id="transition-modal-description">
                Are you sure you want to submit a decesion? A moderator will
                review.
                <Button
                  className={classes.submitButton}
                  onClick={finalAnswer}
                  variant="contained"
                  //id={devID}
                  color="primary"
                  text="LOOOL"
                >
                  Yes
                </Button>
                <Button
                  className={classes.submitButton}
                  onClick={handleClose}
                  variant="contained"
                  color="primary"
                >
                  No
                </Button>
              </p>
            </div>
          </Fade>
        </Modal>
        {notSecuredModal}
        <Button
          className={classes.submitButton}
          onClick={decesionPoint}
          variant="contained"
          color="primary"
          disabled= {answerState.isAnswerApproved}
        >
          Approve
        </Button>
        <Button
          className={classes.submitButton}
          onClick={decesionPoint}
          variant="contained"
          color="primary"
          disabled= {answerState.isAnswerApproved}
        >
          Reject
        </Button>
        {/* End of TOP LEVEL GRID (Parent of all) */}
      </div>
      <Footer />
    </>
  );
};

export default withRouter(withStyles(useStyles)(Answer));
