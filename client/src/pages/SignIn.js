import React, { useState, useEffect, useContext, Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Topbar from "../components/Topbar";
import API from "../utils/API";
import { LoginContext } from "../components/LoginContext";
import { useHistory } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
import Footer from "../components/Footer";

const backgroundShape = require("../images/Liquid-Cheese.svg");

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.secondary["A100"],
    overflow: "hidden",
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: "cover",
    backgroundPosition: "0 400px",
    marginTop: 10,
    padding: 20,
    paddingBottom: 500
  },
  grid: {
    margin: `0 ${theme.spacing(2)}px`
  },
  smallContainer: {
    width: "60%"
  },
  bigContainer: {
    width: "80%"
  },
  logo: {
    marginBottom: 24,
    display: "flex",
    justifyContent: "center"
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  stepGrid: {
    width: "80%"
  },
  buttonBar: {
    marginTop: 32,
    display: "flex",
    justifyContent: "center"
  },
  button: {
    backgroundColor: theme.palette.primary["A100"]
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  outlinedButtom: {
    textTransform: "uppercase",
    margin: theme.spacing(1)
  },
  stepper: {
    backgroundColor: "transparent"
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  topInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 42
  },
  formControl: {
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Codex
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignIn(props) {
  const [animateIn, setAnimateIn] = useState(true);
  const currentPath = props.location.pathname;

  let history = useHistory();
  const [userStatus, setUserStatus] = useContext(LoginContext);

  const userStatusObject = {};

  const storeUserStatus = user => {
    let { _id, username, user_firstName, user_lastName, user_email, user_country } = user;
    //fix the state to store everything.
    setUserStatus(user => ({
      loggedIn: true,
      user: user
    }));
    // localStorage.setItem("userId", _id)
    localStorage.setItem("user", JSON.stringify(user))
    history.push("/");
    // console.log(userStatus)
  };
  //Declaring User Signin state to be passed into Signin call
  const [values, setValues] = useState({
    userName: "",
    password: ""
  });

  const [valuesError, setValuesError] = useState({
    userNameErr: "",
    passwordErr: ""
  });

  const handleChange = e => {
    //Destructure name and value from event
    const { name, value } = e.target;
    //Use the state update function to update the values object
    //Note that I spread the existing values and overwrite only what changed
    setValues({
      ...values,
      [name]: value
    });
  };

  const { userNameErr, passwordErr } = valuesError;

  const validate = values => {
    let errors = {};

    if (values.userName.length < 2) {
      errors.userNameErr = "Please enter a valid User Name";
    }
    if (values.password.length < 5) {
      errors.passwordErr = "Passwords must be at least 5 characters long.";
    }
    return errors;
  };

  const [isSubmitted, toggleIsSubmitted] = useState(false);
  const [isFailAuthentication, toggleIsFailAuthentication] = useState(false);

  const handleFormSubmission = e => {
    e.preventDefault();
    toggleIsSubmitted(true);
    setValuesError(validate(values));
  };

  useEffect(() => {
    const { userName, password } = values;
    if (Object.keys(valuesError).length === 0 && isSubmitted) {
      console.log("Api would execute");
      API.signIn({
        user_username: userName,
        user_password: password
      })
        .then(resp => {
          // console.log(resp.data.user);
          //STORE THE USER INFO IN GLOBAL STATE
          storeUserStatus(resp.data.user);
        })
        .catch(err => toggleIsFailAuthentication(true));
    }
  }, [valuesError]);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Topbar currentPath={currentPath} />
      <Grow in={animateIn}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {!isFailAuthentication ? (
                <LockOutlinedIcon />
              ) : (
                <ErrorOutlineIcon />
              )}
            </Avatar>
            <Typography component="h1" variant="h5">
              {!isFailAuthentication
                ? "Sign in"
                : "Invalid username or password."}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={
                  (isSubmitted && userNameErr) || isFailAuthentication
                    ? true
                    : false
                }
                helperText={isSubmitted && userNameErr ? userNameErr : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                error={
                  (isSubmitted && passwordErr) || isFailAuthentication
                    ? true
                    : false
                }
                helperText={isSubmitted && passwordErr ? passwordErr : ""}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFormSubmission}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </Grow>
      <br/>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(SignIn));
