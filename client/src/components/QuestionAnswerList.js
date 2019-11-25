import React from "react";
import "semantic-ui-css/semantic.min.css";
import {
  Button,
  Comment,
  Form,
  Header,
  Segment,
  CommentGroup,
  Card,
  Container
} from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import { mergeClasses } from "@material-ui/styles";

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     paddingTop: "50px"
//   },
//   paper: {
//     padding: theme.spacing(10),
//     margin: "auto",
//     maxWidth: 500
//   },
//   question: {
//     textAlign: "center",
//     marginTop: "10px",
//   }
// }));

const Questionlist = props => {
  console.log(props);
  return (
    <>
      <div className={props.questionStyle}>
                <h1>{props.question}</h1>
      </div>
    </>
  );
};

const Answerlist = props => {
  return (
    <>
      <Card style={{ padding: "10px", margin: "10px" }}>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">
                Matt
                <Comment.Metadata>Today at 5:42PM</Comment.Metadata>
              </Comment.Author>
              <Comment.Text id={props.id}>{props.children}</Comment.Text>
              <Comment.Actions>
                <Comment.Action id={props.id} onClick={props.reply}>
                  Reply
                </Comment.Action>
                <Comment.Action id={props.id} onClick={props.showmorereply}>
                  See All Replies
                </Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Card>
    </>
  );
};

const Replylist = props => {
  return (
    <Comment.Group style={{ margin: "40px" }}>
      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
        <Comment.Content>
          <Comment.Author>Jenny Hess</Comment.Author>
          <Comment.Text>{props.children}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
};

export { Questionlist, Answerlist, Replylist };
