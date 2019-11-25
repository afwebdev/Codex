import React, { useContext } from "react";
import { LoginContext } from "../LoginContext";
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import API from "../../utils/API";

import InputAdornment from "@material-ui/core/InputAdornment";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-github";

import { TextArea } from "semantic-ui-react";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

import languages from "../../utils/LanguageList";

const useStyles = makeStyles(theme => ({
  grid: {
    width: 1200,
    marginTop: 40,
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 20px)"
    }
  },
  button: {
    // margin: theme.spacing(1),
    marginTop: "2em"
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey["100"],
    overflow: "hidden",
    paddingBottom: 200
  },
  appBar: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main
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
  const [userStatus, setUserStatus] = useContext(LoginContext);
  console.log(userStatus);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [questionData, setQuestionData] = React.useState({
    question_title: "",
    question_description: "",
    category: "Javascript",
    question_code: `console.log("Hello World!")`, //use of backticks here is important.
    dex: 0
  });

  const submitHandler = e => {
    console.log(userStatus);
    e.preventDefault();
    API.postQuestion({ ...questionData, user_id: userStatus.user._id });
  };

  const onChangeHandler = e => {
    let { name, value } = e.target;
    console.log("Name: " + name + " " + "Value: " + value);
    setQuestionData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const codeChangeHandler = code => {
    console.log(code);
    setQuestionData(prevState => ({
      ...prevState,
      question_code: code
    }));
  };

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
          <form>
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: ""
                }}
              >
                {/* Title */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={questionData.question_title}
                  className={classes.textFieldInput}
                  autoFocus={true}
                  name="question_title"
                  fullWidth={true}
                  placeholder="..."
                  label="Title"
                  margin="normal"
                  onChange={onChangeHandler}
                ></TextField>
                {/* Description */}
                <TextField
                  InputLabelProps={{ shrink: true }}
                  margin="normal"
                  value={questionData.question_description}
                  className={classes.textFieldInput}
                  margin="normal"
                  name="question_description"
                  fullWidth={true}
                  placeholder="..."
                  label="Description"
                  onChange={onChangeHandler}
                ></TextField>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between"
                }}
              >
                <Input
                  style={{ width: "10em" }}
                  className={classes.textFieldInput}
                  type="number"
                  name="dex"
                  value={questionData.dex}
                  onChange={onChangeHandler}
                  inputProps={{
                    "aria-label": "Bounty"
                  }}
                  endAdornment={
                    <InputAdornment position="end">Dex</InputAdornment>
                  }
                />
                <FormControl className={classes.textFieldInput}>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    name="category"
                    onChange={onChangeHandler}
                    style={{ width: "20em" }}
                    className={classes.textFieldInput}
                    labelId="category-label"
                    id="demo-simple-select"
                    value={questionData.category}
                  >
                    {languages.map(language => {
                      return (
                        <MenuItem value={language.short}>
                          {language.lang}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={submitHandler}
                  // onClick={handleClickOpen}
                >
                  Submit
                </Button>
              </div>
            </Grid>

            <Grid style={{ marginTop: "2em" }} item xs={12}>
              <h4>Code</h4>
              <AceEditor
                placeholder='console.log("Hello World!")'
                mode="javascript"
                theme="github"
                name="codeInput"
                // onLoad={this.onLoad}
                onChange={codeChangeHandler}
                fontSize={14}
                showPrintMargin={false}
                width={"100%"}
                height={"400px"}
                showGutter={true}
                highlightActiveLine={true}
                value={questionData.question_code}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </Grid>
          </form>
        </Grid>
      </Container>
    </Dialog>
  );
}
