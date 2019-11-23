import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const useStyles = makeStyles(theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    paddingBottom: 200
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  textFieldInput: {
    marginTop: "2em"
  }
}));

export default function NewQuestion(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullScreen
      open={props.open}
      onClose={props.handleClickClose}
      // TransitionComponent={props.Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClickClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Question
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Top Parent Div */}
      <Container>
        <Grid spacing={2}>
          <Grid item xs={12}>
            <h1>New Question</h1>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: ""
              }}
            >
              <TextField
                className={classes.textFieldInput}
                autoFocus={true}
                name="questionTitle"
                fullWidth={true}
                placeholder="..."
                label="Title"
              ></TextField>
              <TextField
                className={classes.textFieldInput}
                margin="normal"
                name="questionDescription"
                fullWidth={true}
                placeholder="..."
                label="Description"
              ></TextField>
            </div>
          </Grid>
          <Grid item xs={12}>
            <AceEditor
              placeholder="Placeholder Text"
              mode="javascript"
              theme="monokai"
              name="blah2"
              // onLoad={this.onLoad}
              // onChange={this.onChange}
              fontSize={14}
              showPrintMargin={false}
              width={"100%"}
              height={"400px"}
              showGutter={true}
              highlightActiveLine={true}
              value={`console.log("Hello World")`}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}
