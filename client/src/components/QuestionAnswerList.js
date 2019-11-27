import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Comment, Card } from "semantic-ui-react";

const ReactMarkdown = require("react-markdown");

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
  console.log(props.answers);
  const answerArr = props.answers;
  if (answerArr !== []) {
    return (
      <>
        {answerArr.map(answer => {
          console.log(answer);
          return (
            <Card style={{ padding: "10px", width: "100%" }}>
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                  <Comment.Content>
                    <Comment.Author id={props.id} as="a">
                      Matt
                      <Comment.Metadata>{answer.createdAt}</Comment.Metadata>
                    </Comment.Author>
                    <Comment.Text id={props.id}>{answer.answer}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action id={props.id} onClick={props.reply}>
                        View Answer
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            </Card>
          );
        })}
      </>
    );
  } else {
    return <p>No Comments Yet!</p>;
  }
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
