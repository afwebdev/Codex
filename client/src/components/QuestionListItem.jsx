import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import ToolTip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/styles/withStyles";
import { Typography } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

const styles = theme => ({
  avatar: {
    padding: "1em",
    backgroundColor: theme.palette.secondary.main,
    fontSize: "14px",
    fontWeight: "bold"
  },
  questionList: {
    minHeight: "10em"
  }
});

const questionItem = props => {
  const { classes, questions } = props;
  console.log(props);
  return (
    <>
      {questions.questionList.map(questions => {
        console.log(questions);
        const {
          _id,
          question_title,
          question_description,
          category,
          dex
        } = questions;
        // const { user_email, user_firstName } = questions.user_id;
        console.log(
          _id,
          question_title,
          question_description,
          category,
          dex
          // user_email,
          // user_firstName
        );
        return (
          <Paper key={questions._id} className={classes.questionList}>
            <Container style={{ marginTop: "2em", padding: "1em" }}>
              <Grid container spacing={1}>
                <Grid item xs={2} sm={2} md={2}>
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="space-around"
                    flexDirection="column"
                    minHeight="175px"
                  >
                    <ToolTip placement="right" title={`${category}`}>
                      <Avatar className={classes.avatar} variant="rounded">
                        {category}
                      </Avatar>
                    </ToolTip>
                    <ToolTip placement="right" title={`${dex} Dex`}>
                      <Avatar className={classes.avatar} variant="rounded">
                        {dex}
                      </Avatar>
                    </ToolTip>
                  </Box>
                </Grid>
                <Grid item xs={10} sm={10} md={10}>
                  <Box component="h3">{question_title}</Box>
                  <Typography variant="body1">
                    {question_description}
                  </Typography>
                  <div>
                    <Link to={`/answer/${_id}`}>Answer this question </Link>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Paper>
        );
      })}
    </>
  );
};
export default withStyles(styles)(questionItem);
