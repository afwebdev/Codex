import React, { useState, useEffect } from "react";
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
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/styles/withStyles";
import { withRouter } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Topbar from "../components/Topbar";
import CountryDropDown from "../components/CountryDropDown";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import Grow from "@material-ui/core/Grow";
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

function SignUp(props) {
  const [animateIn, setAnimateIn] = useState(true);

  const currentPath = props.location.pathname;

  let history = useHistory();
  //Declaring User Signup state to be passed into Signup call
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    userCountry: ""
  });

  const [valuesError, setValuesError] = useState({
    firstNameErr: "",
    lastNameErr: "",
    emailErr: "",
    passwordErr: "",
    userNameErr: ""
  });

  const [isSubmitted, toggleIsSubmitted] = useState(false);

  //Destructure error state for cleaner conditional rendering in JSX code
  const {
    firstNameErr,
    lastNameErr,
    emailErr,
    passwordErr,
    userNameErr
  } = valuesError;

  const validate = values => {
    let errors = {};

    if (values.firstName.length < 2) {
      errors.firstNameErr = "Please enter a valid First Name i.e John";
    }
    if (values.lastName.length < 2) {
      errors.lastNameErr = "Please enter a valid Last Name i.e Doe";
    }
    if (values.userName.length < 2) {
      errors.userNameErr = "Please enter a valid User Name";
    }
    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(values.email)) {
      errors.emailErr =
        "Please enter a valid Email Address i.e john.doe@codex.com";
    }
    if (values.password.length < 5) {
      errors.passwordErr = "Your password must be at least 5 characters long!";
    }
    console.log(errors);
    return errors;
  };

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

  //Had to create a seperate event handler for country as I could not get the value of the input element
  const handleCountry = () => {
    //On input change (an onEvent change found in Auto-Complete api documentation) I get the value of the country
    let country = document
      .getElementById("country-select-demo")
      .getAttribute("value");
    //Since we only plan to use this for the flag API I will be getting the letters of the country only
    let countryCode = country.split(" ")[country.split(" ").length - 1];
    if (country) {
      setValues({
        ...values,
        userCountry: countryCode
      });
    }
  };

  const handleFormSubmission = event => {
    //Prevent Default
    event.preventDefault();
    console.log(event.target);
    //Set Submission boolean to true to trigger validation
    toggleIsSubmitted(true);
    //Call the error state update function to update the error state object
    //with any errors that we need to show user based on input
    setValuesError(validate(values));
  };

  useEffect(() => {
    if (Object.keys(valuesError).length === 0 && isSubmitted) {
      console.log("Execute api call here");
      const {
        firstName,
        lastName,
        email,
        password,
        userName,
        userCountry
      } = values;
      API.signUp({
        user_firstName: firstName,
        user_lastName: lastName,
        user_email: email,
        user_password: password,
        user_username: userName,
        user_country: userCountry
      })
        .then(history.push("/signin"))
        .catch(err => {
          console.log(err);
        });
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={isSubmitted && firstNameErr ? true : false}
                    helperText={isSubmitted && firstNameErr ? firstNameErr : ""}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={isSubmitted && lastNameErr ? true : false}
                    helperText={isSubmitted && lastNameErr ? lastNameErr : ""}
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={isSubmitted && userNameErr ? true : false}
                    helperText={isSubmitted && userNameErr ? userNameErr : ""}
                    autoComplete="uname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CountryDropDown handleCountry={handleCountry} />
                  {/* <TextField
                  error={isSubmitted && userCountryErr ? true : false}
                  helperText={
                    isSubmitted && userCountryErr ? userCountryErr : ""
                  }
                  variant="outlined"
                  required
                  fullWidth
                  id="userCountry"
                  label="Country"
                  name="userCountry"
                  autoComplete="country"
                  onChange={handleChange}
                /> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={isSubmitted && emailErr ? true : false}
                    helperText={isSubmitted && emailErr ? emailErr : ""}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={isSubmitted && passwordErr ? true : false}
                    helperText={isSubmitted && passwordErr ? passwordErr : ""}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I agree that Codex is far superior than Stack OverFlow."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleFormSubmission}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </Grow>
      <br/>
      <Footer />
    </React.Fragment>
  );
}

export default withRouter(withStyles(styles)(SignUp));
