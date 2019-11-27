import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import ToolTip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default function AddQuestionButton(props) {
  const classes = useStyles();
  const { handleClickOpen } = props;

  return (
    <ToolTip placement="bottom" title="Ask a Question!">
      <Fab
        aria-label="Add"
        onClick={handleClickOpen}
        className={classes.fab}
        color="primary"
      >
        <AddIcon />
      </Fab>
    </ToolTip>
  );
}
