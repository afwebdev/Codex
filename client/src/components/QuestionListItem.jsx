import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import ToolTip from "@material-ui/core/Tooltip";
import withStyles from "@material-ui/styles/withStyles";
import { Typography } from "@material-ui/core";
import ListDivider from "./ListDivider";
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import Fab from '@material-ui/core/Fab';


// import { blue } from "@material-ui/core/colors";

const styles = theme => ({
  avatar: {
    padding: "1em",
    backgroundColor: theme.palette.secondary.main,
    fontSize: "14px",
    fontWeight: "bold"
  },
  questionGrid: {
    justifyContent: "space-between",
    flexDirection: "column",
    display: "flex"
  },
  questionList: {
    minHeight: "10em",
    marginBottom: "1.5em"
  },
  questionInfo: {
    paddingTop: "16px",
    paddingLeft: "8px",
    paddingRight: "8px"
  },
  questionDescription: {
    padding: "0px 8px"
  },
  answerBox: {
    justifyContent: "flex-end",
    display: "flex",
    padding: "1.5em"
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
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
          dex,
          createdAt
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
            <Container style={{ padding: "1em" }}>
              <Grid container spacing={1}>
                <Grid item xs={2} sm={4} md={4}>
                  <ListDivider category={category} dex={dex} createdAt={createdAt} />
                </Grid>
                {/* <Grid item xs={2} sm={2} md={2}>
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
                </Grid> */}
                <Grid className={classes.questionGrid} item xs={10} sm={4} md={8}>
                  <Box>
                    <Box className={classes.questionInfo} component="h2">{question_title}</Box>
                    <Typography className={classes.questionDescription} >
                      {question_description}
                    </Typography>
                  </Box>
                  <Box className={classes.answerBox}>
                    <Link to={`/answer/${_id}`}>
                      <Fab variant="extended">
                        <QuestionAnswerTwoToneIcon className={classes.extendedIcon} />
                        Answer
                      </Fab>
                    </Link>
                  </Box>
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
