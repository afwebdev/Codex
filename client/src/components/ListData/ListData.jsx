import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import ListSubheader from "@material-ui/core/ListSubheader";
import API from "../../utils/API";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { LoginContext } from "../LoginContext";
import QuestionLink from "../QuestionLink.jsx";

const styles = theme => ({});

const useStyles = makeStyles(theme => ({
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

  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
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

// //retrieve and store user info
// const storage = localStorage.getItem("user");
// console.log(storage);
// const user = JSON.parse(storage);
// console.log(user);

//List Item Link Component
const ListItemLink = props => {
  return (
    <Link {...props}>
      <ListItem button {...props} />
    </Link>
  );
};

//ListData Component.
const ListData = props => {
  const [userStatus, setUserStatus] = useContext(LoginContext);
  console.log(props);
  const classes = useStyles();
  //Hooks for question/answer to be displayed
  const [questions, setQuestions] = React.useState({ userQuestions: [] });
  const [answers, setAnswers] = React.useState({ userAnswers: [] });
  const user = props.user;
  //Dashboard useEfect
  useEffect(() => {
    // console.log(userStatus);
    API.getQuestionByUser(user).then(res => {
      console.log("getQuestionByUser");
      console.log(user); //id says 5ddadcb494b9698f856a74e4
      console.log(res.data); //res

      setQuestions(prev => ({
        userQuestions: res.data
      }));
      console.log(questions);
    });

    API.getAnswersByUser(user).then(res => {
      console.log("GETANSWERBYUSER");
      console.log(res);
      setAnswers(prev => ({
        userAnswers: res.data
      }));
    });
  }, []);
  const [open, setOpen] = React.useState({ question: false, answer: false });

  const handleClick = e => {
    e.persist();
    if (e.target.innerText === "My Asked Questions") {
      setOpen({ question: !open.question });
    }
    if (e.target.innerText === "My Answered Questions") {
      setOpen({ answer: !open.answer });
    }
    console.log(e);
  };

  //ListData Component JSX
  return (
    <List
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          My Q&A
        </ListSubheader>
      }
      className={classes.listQA}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <HelpOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="My Asked Questions" />
        {open.question ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.question} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {questions.userQuestions.map(question => {
            return (
              <ListItemLink to={`/answer/${question._id}`}>
                <ListItemText primary={question.question_title} />
              </ListItemLink>
            );
          })}
        </List>
      </Collapse>

      <ListItem id="answers" button onClick={handleClick}>
        <ListItemIcon>
          <QuestionAnswerIcon />
        </ListItemIcon>
        <ListItemText primary="My Answered Questions" />
        {open.answer ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open.answer} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {answers.userAnswers.map(question => {
            return (
              <ListItemLink to={`/answer/${question._id}`}>
                <ListItemText primary={question.question_title} />
              </ListItemLink>
            );
          })}
        </List>
      </Collapse>
    </List>
  );
};

export default withStyles(styles)(ListData);
